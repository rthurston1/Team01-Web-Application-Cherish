/* For Remote Storage Operations */
import config from "../../config/config.js";
import { debugLog } from "../../config/debug.js";
import { Sequelize, DataTypes, Op } from "sequelize";
import bcrypt from "bcrypt";
import { successResponse, failedResponse } from "../middleware/middleware.js";
import {
  getToday,
  convertDateToISO,
  convertISOToDate,
  isISO,
  isMMDDYY,
} from "../../../front-end/src/utils/dateUtils.js";

/* Sequelize code goes here */
const sequelize = new Sequelize({
  dialect: "sqlite",
  logging: false, // toggle to see sql queries
  storage: config.debug ? "database_test.sqlite" : "database.sqlite",
});

const User = sequelize.define("users", {
  username: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Day = sequelize.define(
  "days",
  {
    date_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{4}-\d{2}-\d{2}$/, // Ensures YYYY-MM-DD format
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    journal: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["date_id", "username"],
      },
    ],
  }
);

const Emotion = sequelize.define(
  "emotions",
  {
    date_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{4}-\d{2}-\d{2}$/, // Ensures YYYY-MM-DD format
      },
    },
    index_id: {
      // Position in the Emotion array for that day
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    emotion_id: {
      // Name of the emotion, e.g., Happy, Sad
      type: DataTypes.STRING,
      allowNull: false,
    },
    magnitude: {
      // Rating of the emotion (1 to 10)
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
    description: {
      // Optional description of the emotion
      type: DataTypes.STRING,
      allowNull: true,
    },
    timestamp: {
      // Timestamp when the emotion was logged
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["date_id", "index_id"], // Ensure unique emotion index for each day
      },
    ],
  }
);

User.hasMany(Day, { foreignKey: "username", onDelete: "CASCADE" });
Day.belongsTo(User, { foreignKey: "username" });

Day.hasMany(Emotion, { foreignKey: "date_id", onDelete: "CASCADE" });
Emotion.belongsTo(Day, { foreignKey: "date_id" });

class _SQLiteDayModel {
  constructor() {}

  // Initializes database
  async init(fresh = false) {
    await sequelize.authenticate();
    debugLog("Database authenticated");

    await sequelize.sync({ force: fresh });
    debugLog("All models synchronized");

    if (fresh) {
      await this.clearAllData();
    }

    // Create Test User
    await this.createUser({
      username: "testUser",
      password: "testPassword",
    });

    // Create Test Day
    await this.saveDay("testUser", {
      date_id: getToday(), // getToday() defaults to YYYY-MM-DD
      rating: 5,
      journal: "Test Journal Entry",
    });

    await this.saveUser("testUser");

    // Debug:
    await this.getDay("testUser", getToday()); // getToday() defaults to YYYY-MM-DD
    await this.getUserData("testUser");

    // Create Test Emotions
    // TODO
  }

  // Checks if a user entry exists in the database (Author: @rthurston1)
  async userExists(username) {
    return await User.findOne({ where: { username } });
  }

  // Checks if day entry exists in the database (Author: @rthurston1)
  async dayExists(username, date_id) {
    return await Day.findOne({
      where: {
        date_id: date_id,
        username: username,
      },
    });
  }

  // Checks if emotion entry exists in the database (Author: @rthurston1)
  async emotionExists(date_id, index_id) {
    return await Emotion.findOne({
      where: {
        index_id: index_id,
        date_id: date_id,
      },
    });
  }

  // Adds a new user into the database (Author: @rthurston1)
  async createUser(user) {
    try {
      // First check if user already exists
      if (await this.userExists(user.username)) {
        debugLog("User already exists", "INFO");
        return failedResponse("User already exists");
      }

      // Adds user to database
      const newUser = await User.create(user);
      debugLog("User created successfully");

      return successResponse(newUser);
    } catch (error) {
      debugLog(`Error creating user: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Attempts to login user (returns false if failed) (Author: @rthurston1)
  async loginUser(username, password) {
    try {
      const user = await this.userExists(username);
      if (!user) {
        debugLog("User does not exist", "INFO");
        return failedResponse("User does not exist");
      }

      // Validates password
      if (!(await bcrypt.compare(password, user.password))) {
        debugLog("Invalid password", "ERROR");
        return failedResponse("Invalid password");
      }

      debugLog("Logged in user successfully", "SUCCESS");
      return successResponse(user);
    } catch (error) {
      debugLog(`Error logging in user: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Gets a user from the database without data (Author: @nikozbk)
  async getUser(username) {
    try {
      const user = await User.findByPk(username);
      if (!user) {
        debugLog("User not found", "INFO");
        return failedResponse("User not found");
      }
      debugLog("Fetched user successfully", "SUCCESS");
      return successResponse(user);
    } catch (error) {
      debugLog(`Error getting user: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Gets a user and returns all of their data (Author: @rthurston1)
  async getUserData(username) {
    try {
      const user = await User.findOne({
        where: { username }, // Matches username
        include: [
          {
            model: Day, // Includes User's day entries
            include: [
              {
                model: Emotion, // Includes each Day's emotion entries
              },
            ],
          },
        ],
      });

      if (!user) {
        debugLog("User not found", "INFO");
        return failedResponse("User not found");
      }

      debugLog("Fetched user data successfully", "SUCCESS");
      return successResponse(user);
    } catch (error) {
      debugLog(`Error getting user: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Gets all users (Author: @nikozbk)
  async getAllUsers() {
    try {
      const users = await User.findAll();
      if (!users.length || users.length === 0) {
        debugLog("No users found", "INFO");
        return failedResponse("No users found");
      }

      debugLog("Fetched all users successfully", "SUCCESS");
      return successResponse(users);
    } catch (error) {
      debugLog(`Error getting all users: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Saves a user's data (Author: @nikozbk)
  async saveUser(username) {
    try {
      const savedUser = await this.userExists(username);
      if (!savedUser) {
        debugLog("User not found", "INFO");
        return failedResponse("User not found");
      }

      await savedUser.save();
      debugLog("Saved user data successfully", "SUCCESS");

      return successResponse(savedUser);
    } catch (error) {
      debugLog(`Error saving user data: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Deletes a user (Author: @rthurston1)
  async deleteUser(username) {
    try {
      const deletedUser = await this.userExists(username);
      if (!deletedUser) {
        debugLog("User not found", "INFO");
        return failedResponse("User not found");
      }

      await deletedUser.destroy();
      debugLog("Deleted user successfully", "SUCCESS");

      return successResponse(deletedUser);
    } catch (error) {
      debugLog(`Failed to delete user: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Creates/Updates a day
  async saveDay(username, day) {
    try {
      if (!isISO(day.date_id)) {
        if (!isMMDDYY(day.date_id)) {
          return failedResponse("Invalid date format");
        }
        day.date_id = convertDateToISO(day.date_id);
      }

      const storedDay = await this.dayExists(username, day.date_id);
      if (storedDay) {
        // Day exists: UPDATE
        await storedDay.update(day);
        debugLog("Updated day successfully", "SUCCESS");
        return successResponse(storedDay);
      } else {
        // Day does NOT exist: CREATE
        const newDay = await Day.create({ ...day, username });
        debugLog("Created day successfully", "SUCCESS");
        return successResponse(newDay);
      }
    } catch (error) {
      debugLog(`Error creating day: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Gets a day based on it's id
  async getDay(username, date_id) {
    try {
      if (!isISO(date_id)) {
        if (!isMMDDYY(date_id)) {
          return failedResponse("Invalid date format");
        }
        date_id = convertDateToISO(date_id);
      }

      const day = await Day.findOne({
        where: {
          date_id: date_id,
          username: username,
        },
        include: [
          {
            model: Emotion,
          },
        ],
      });

      if (!day) {
        debugLog("Day does not exist", "INFO");
        return failedResponse("Day does not exist");
      }

      debugLog("Fetched day successfully", "SUCCESS");
      return successResponse(day);
    } catch (error) {
      debugLog(`Error getting day: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Deletes a day entry from the database
  // Returns the deleted day object
  // Author: @rthurston1
  async deleteDay(username, date_id) {
    try {
      if (!isISO(date_id)) {
        if (!isMMDDYY(date_id)) {
          return failedResponse("Invalid date format");
        }
        date_id = convertDateToISO(date_id);
      }
      // Checks if data does NOT exists
      const deletedDay = await this.dayExists(username, date_id);

      if (!deletedDay) {
        debugLog("Day does not exist", "INFO");
        return failedResponse("Day does not exist");
      }

      await deletedDay.destroy();
      debugLog("Day deleted successfully", "SUCCESS");
      return successResponse(deletedDay);
    } catch (error) {
      debugLog(`Error deleting day: ${error}`);
      return failedResponse(error);
    }
  }

  // Creates/Updates all emotions for a day
  // Overwrites all emotions for a specific day
  // Author: @rthurston1
  async saveEmotions(username, date_id, emotions) {
    console.log(`made it to saveEmotions`);
    try {
      // Check if the day entry exists
      const dayExists = await this.dayExists(username, date_id);
      if (!dayExists) {
        debugLog("Day does not exist", "INFO");
        return failedResponse("Day does not exist");
      }

      debugLog(`Processing emotions ${JSON.stringify(emotions)}`, "EMOTION");

      // Validate and convert timestamp format
      emotions.forEach((emotion) => {
        if (!emotion.timestamp.includes("T")) {
          emotion.timestamp = `${date_id}T${emotion.timestamp}:00.000Z`;
        }
        if (isNaN(Date.parse(emotion.timestamp))) {
          throw new Error(`Invalid timestamp: ${emotion.timestamp}`);
        }
      });

      // Begin a transaction as there are multiple operations done on the database
      const transaction = await sequelize.transaction();

      try {
        // Delete all existing emotions for that day
        await Emotion.destroy({
          where: { date_id },
          transaction, // Ensure this happens within the same transaction
        });

        // Create new emotions
        const newEmotions = await Emotion.bulkCreate(
          emotions.map((emotion) => ({
            ...emotion,
            date_id,
          })),
          {
            transaction, // Ensure this happens within the same transaction
          }
        );

        // Commit the transaction
        await transaction.commit();

        debugLog("Emotions updated successfully");
        return successResponse(newEmotions);
      } catch (error) {
        // If anything fails, roll back the transaction
        await transaction.rollback();
        debugLog(`Error saving emotions: ${error}`, "ERROR");
        return failedResponse(error);
      }
    } catch (error) {
      debugLog(`Error processing emotions: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Clears all data from the database
  async clearAllData() {
    try {
      // Truncate all tables (clear all data)
      await User.truncate({ cascade: true }); // Clear all records in User table
      await Day.truncate({ cascade: true }); // Clear all records in Day table
      await Emotion.truncate({ cascade: true }); // Clear all records in Emotion table

      debugLog("All data has been cleared", "SUCCESS");
      return successResponse();
    } catch (error) {
      debugLog(`Error while clearing data: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // QUERY METHODS

  // Gets a range of days between a start and end date
  // Author: @rthurston1
  async filterDaysByDateRange(username, startDate, endDate) {
    try {
      const days = await Day.findAll({
        where: {
          username: username,
          date_id: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      if (!days.length) {
        debugLog("No days found for the specified date range", "INFO");
        return failedResponse("No days found");
      }

      debugLog("Fetched days by date range successfully", "SUCCESS");
      return successResponse(formattedDays);
    } catch (error) {
      debugLog(`Error filtering days by date range: ${error}`, "ERROR");
      return failedResponse(error);
    }
  }

  // Function to get all the days in a given year
  // Author: @rthurston1
  async getDaysOfYear(username, year) {
    return await this.filterDaysByDateRange(
      username,
      `${year}-01-01`,
      `${year}-12-31`
    );
  }

  // Function to get all the days in a given month
  // Author: @rthurston1
  async getDaysOfMonth(username, month, year) {
    // Check if the year is a leap year
    const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);

    // Determine the last day of the month
    let lastDay = 31; // Default to 31 days
    if (month === "02") {
      lastDay = isLeapYear ? 29 : 28; // February has 29 or 28 days based on leap year
    } else if (["04", "06", "09", "11"].includes(month)) {
      lastDay = 30; // April, June, September, and November have 30 days
    }
    return await this.filterDaysByDateRange(
      username,
      `${year}-${month}-01`,
      `${year}-${month}-${lastDay}`
    );
  }
}
const SQLiteDayModel = new _SQLiteDayModel();
export default SQLiteDayModel;
