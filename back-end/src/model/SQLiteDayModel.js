/* For Remote Storage Operations */
import config from "../../config/config.js";
import { debugLog } from "../../config/debug.js";
import { Sequelize, DataTypes, Op } from "sequelize";
import bcrypt from "bcrypt";
import { successResponse, failedResponse } from "../middleware/middleware.js";

/* Sequelize code goes here */
const sequelize = new Sequelize({
  dialect: "sqlite",
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

const Day = sequelize.define("days", {
  date_id: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^\d{2}-\d{2}-\d{4}$/, // Ensures MM-DD-YYYY format
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
}, {
  indexes: [ 
    {
      unique: true,
      fields: ["date_id", "username"],
    },
  ],
});

const Emotion = sequelize.define("emotions", {
  index_id: { // Position in the Emotion array for that day
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  emotion_id: { // Name of the emotion, e.g., Happy, Sad
    type: DataTypes.STRING,
    allowNull: false,
  },
  magnitude: { // Rating of the emotion (1 to 10)
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  },
  description: { // Optional description of the emotion
    type: DataTypes.STRING,
    allowNull: true,
  },
  timestamp: { // Timestamp when the emotion was logged
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  indexes: [
    {
      unique: true,
      fields: ["date_id", "index_id"], // Ensure unique emotion index for each day
    },
  ],
});

User.hasMany(Day, { foreignKey: "username", onDelete: "CASCADE" });
Day.belongsTo(User, { foreignKey: "username" });

Day.hasMany(Emotion, { foreignKey: "date_id", onDelete: "CASCADE" });
Emotion.belongsTo(Day, { foreignKey: "date_id" });


// Helper function to convert MM-DD-YYYY to YYYY-MM-DD
const formatDateToISO = (date) => {
  const [month, day, year] = date.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}

class _SQLiteDayModel {
  constructor() {}

  // Initializes database
  async init(fresh = false) {
    await sequelize.authenticate();
    debugLog("Database authenticated");

    await sequelize.sync({force: fresh});
    debugLog("All models synchronized");

    if (fresh) {
      await this.clearAllData();
    }
  }

  // Checks if a user entry exists in the database
  async userExists(username) {
    return await User.findOne({where: {username}});
  }

  // Checks if day entry exists in the database
  async dayExists(username, date_id) {
    return await Day.findOne({
      where: {
        date_id: date_id,
        username: username,
      }
    });
  }

  // Checks if emotion entry exists in the database
  async emotionExists(date_id, index_id) {
    return await Emotion.findOne({
      where: {
        index_id: index_id,
        date_id: date_id,
      }
    });
  }

  // Adds a new user into the database
  async createUser(user) {
    try {
      // First check if user already exists
      if (await this.userExists(user.username)) {
        debugLog("User already exists");
        return failedResponse("User already exists");
      }

      // Adds user to database
      const newUser = await User.create(user);
      debugLog("User created successfully");

      return successResponse(newUser);
    } catch (error) {
      debugLog(`Error creating user: ${error}`);
      return failedResponse(error);
    }
  }

  // Attempts to login user (returns false if failed)
  async loginUser(username, password) {
    try {
      const user = await this.userExists(username);
      if (!user) {
        debugLog("User does not exist");
        return failedResponse("User does not exist");
      }

      // Validates password
      if (!await bcrypt.compare(password, user.password)) {
        debugLog("Invalid password");
        return failedResponse("Invalid password");
      }

      debugLog("Logged in user successfully");
      return successResponse(user);

    } catch (error) {
      debugLog(`Error logging in user: ${error}`);
      return failedResponse(error);
    }
  }

  // Gets a user and returns all of their data
  async getUser(username) {
    try {
      const user = await User.findOne({
        where: {username}, // Matches username
        include: [
          {
            model: Day, // Includes User's day entries
            include: [
              {
                model: Emotion, // Includes each Day's emotion entries
              }
            ]
          }
        ]
      });

      if (!user) {
        debugLog("User not found");
        return failedResponse("User not found");
      }

      debugLog("Fetched user data successfully");
      return successResponse(user);

    } catch (error) {
      debugLog(`Error getting user: ${error}`);
      return failedResponse(error);
    }

  }

  // Deletes a user
  async deleteUser(username) {
    try {
      const deletedUser = await this.userExists(username);
      if (!deletedUser) {
        debugLog("User not found");
        return failedResponse("User not found");
      }

      await deletedUser.destroy();
      debugLog("Deleted user successfully");

      return successResponse(deletedUser);
    } catch (error) {
      debugLog(`Failed to delete user: ${error}`);
      return failedResponse(error);
    }
  }

  // Creates/Updates a day
  async saveDay(username, day) {
    try {
      const storedDay = await this.dayExists(username, date_id);
      if (storedDay) {
        // Day exists: UPDATE
        await storedDay.update(day);
        debugLog("Updated day successfully");
        return successResponse(storedDay);
      }
      else {
        // Day does NOT exist: CREATE
        const newDay = await Day.create({...day, username});
        debugLog("Created day successfully");
        return successResponse(newDay);
      }
    } catch (error) {
      debugLog(`Error creating day: ${error}`);
      return failedResponse(error);
    }
  }

  // Gets a day based on it's id
  async getDay(username, date_id) {
    try {
      // Find the user with the specific date_id
      const day = await Day.findOne({
        where: { 
          date_id: date_id, // The date of the day you want
          username: username   // Make sure it's the correct user
        },
        include: [
          {
            model: Emotion, // Include the emotions associated with that day
          },
        ],
      });
  
      if (!day) {
        debugLog("Day does not exist");
        return failedResponse("Day does not exist");
      }
  
      debugLog("Fetched day successfully");
      return successResponse(day);

    } catch (error) {
      debugLog(`Error getting day: ${error}`);
      return failedResponse(error);
    }
  }

  // Deletes a day entry from the database
  // Returns the deleted day object
  async deleteDay(username, date_id) {
    try {
      // Checks if data does NOT exists
      const deletedDay = await this.dayExists(username, date_id);

      if (!deletedDay) {
        debugLog("Day does not exist");
        return failedResponse("Day does not exist");
      }

      await deletedDay.destroy();
      debugLog("Day deleted successfully");
      return successResponse(deletedDay);

    } catch (error) {
      debugLog(`Error deleting day: ${error}`);
      return failedResponse(error);
    }
  }

  // Creates/Updates all emotions for a day 
  // Overwrites all emotions for a specific day
  async saveEmotions(username, date_id, emotions) {
    try {
      // Check if the day entry exists
      if (await this.dayExists(username, date_id)) {
        debugLog("Day not does not exist");
        return failedResponse("Day does not exist");
      }

      // Begin a transaction as there are multiple operations done on the database
      const transaction = await sequelize.transaction();

      try {
        // Delete all existing emotions for that day
        await Emotion.destroy({
          where: { date_id },
          transaction, // Ensure this happens within the same transaction
        });

        // Create new emotions
        const newEmotions = await Emotion.bulkCreate(emotions.map(emotion => ({
          ...emotion,
          date_id
        })), {
          transaction, // Ensure this happens within the same transaction
        });

        // Commit the transaction
        await transaction.commit();

        debugLog("Emotions updated successfully");
        return successResponse(newEmotions);

      } catch (error) {
        // If anything fails, roll back the transaction
        await transaction.rollback();
        debugLog(`Error saving emotions: ${error}`);
        return failedResponse(error);
      }

    } catch (error) {
      debugLog(`Error processing emotions: ${error}`);
      return failedResponse(error);
    }
  }

  // Clears all data from the database
  async clearAllData() {
    try {
      // Truncate all tables (clear all data)
      await User.truncate({ cascade: true });      // Clear all records in User table
      await Day.truncate({ cascade: true });       // Clear all records in Day table
      await Emotion.truncate({ cascade: true });   // Clear all records in Emotion table
      
      debugLog("All data has been cleared");
      return successResponse();
    } catch (error) {
      debugLog(`Error while clearing data: ${error}`);
      return failedResponse(error);
    }
  }

  // QUERY METHODS

  // Gets a range of days between a start and end date
  async filterDaysByDateRange(username, startDate, endDate) {
    try {
      // Converts date format of MM-DD-YYYY to YYYY-MM-DD
      const startDateFormatted = formatDateToISO(startDate); 
      const endDateFormatted = formatDateToISO(endDate);
  
      const days = await Day.findAll({
        where: {
          username: username,
          date_id: {
            [Op.between]: [startDateFormatted, endDateFormatted],
          },
        },
      });
  
      if (!days.length) {
        debugLog("No days found for the specified date range");
        return failedResponse("No days found");
      }
  
      debugLog("Fetched days by date range successfully");
      return successResponse(days);
    } catch (error) {
      debugLog(`Error filtering days by date range: ${error}`);
      return failedResponse(error);
    }
  }

  // Function to get all the days in a given year
  async getDaysOfYear(username, year) {
    return await this.filterDaysByDateRange(username, `01-01-${year}`, `12-31-${year}`);  
  }

  // Function to get all the days in a given month
  async getDaysOfMonth(username, month, year) {
    // Check if the year is a leap year
    const isLeapYear = (year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0));
  
    // Determine the last day of the month
    let lastDay = 31; // Default to 31 days
    if (month === "02") {
      lastDay = isLeapYear ? 29 : 28; // February has 29 or 28 days based on leap year
    } else if (["04", "06", "09", "11"].includes(month)) {
      lastDay = 30; // April, June, September, and November have 30 days
    } 
    return await this.filterDaysByDateRange(username, `${month}-01-${year}`, `${month}-${lastDay}-${year}`);
  }
  
  
}
const SQLiteDayModel = new _SQLiteDayModel();
export default SQLiteDayModel;
