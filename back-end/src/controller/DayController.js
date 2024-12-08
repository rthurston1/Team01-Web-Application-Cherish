/* The Day Controller places calls to Model */
/* DayRoutes.js tells the Day Controller which calls to place  */
import ModelFactory from "../model/ModelFactory.js";
import { debugLog } from "../../config/debug.js";

class DayController {
  constructor() {
    this.initializeModel("local");
  }

  async initializeModel(modelType) {
    try {
      this.model = await ModelFactory.getModel(modelType);
      debugLog(`DayController initialized with ${this.model.name}`);
    } catch (err) {
      debugLog(`Error initializing DayController: ${err}`);
    }
  }

  setModel(model) {
    this.model = model;
  }

  /** Author: Nikolay Ostroukhov @nikozbk
   *  Retrieves all data from the model and sends it as a JSON response.
   *  Logs the process and handles any errors that occur.
   *
   *  @param {Object} request - The request object.
   *  @param {Object} response - The response object.
   *  @returns {Promise<void>} - A promise that resolves when the data is sent or an error is handled.
   */
  // async getAllData(request, response) {
  //   debugLog(`DayController.getAllData`);
  //   try {
  //     const data = await this.model.read();
  //     debugLog(`Returning data: ${JSON.stringify(data)}`);
  //     request.setHeader("Content-Type", "application/json");
  //     request.json(data);
  //   } catch (err) {
  //     debugLog(`Error in DayController.getAllData: ${err}`);
  //     response
  //       .status(500)
  //       .send("Error retrieving data from DayController.getAllData");
  //   }
  // }

  // Gets all users in the database (does not include their day data)
  async getAllUsers(request, response) {
    debugLog(`DayController.getAllUsers`);
    try {
      const data = await this.model.getAllUsers();
      if (data.success) response.setHeader("Content-Type", "application/json");
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.getAllUsers: ${error}`);
      response
        .status(500)
        .send("Error retrieving data from DayController.getAllUsers");
    }
  }

  // Gets a user from the database
  // Request param contains the username
  async getUserByUsername(request, response) {
    debugLog(`DayController.getUserByUsername`);
    try {
      const data = await this.model.getUser(request.params.username);
      if (data.success) response.setHeader("Content-Type", "application/json");
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.getUserByUsername: ${error}`);
      response
        .status(500)
        .send("Error retrieving data from DayController.getUserByUsername");
    }
  }

  /**
   * Adds a new user into the database and returns a JWT session token
   * Request body contains the username and password (password needs to be encrypted)
   */
  async registerUser(request, response) {
    debugLog(`DayController.registerUser`);
    // TODO: Implement this method
  }

  /**
   * Attempts to login in the user and returns all of their data
   * Request body contains a username and password inputted by the user
   */
  async loginUser(request, response) {
    debugLog(`DayController.loginUser`);
    try {
      const data = await this.model.loginUser(
        request.body.username,
        request.body.password
      );
      if (!data.success) {
        response.status(401);
      } else {
        // response.setHeader("Authorization", data.token);
        response.setHeader("Content-Type", "application/json");
      }
      response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.loginUser: ${error}`);
      response
        .status(500)
        .send("Error logging in from DayController.loginUser");
    }
  }

  /**
   * Posts the user's data
   * Request params contains the username
   */
  async postUserData(request, response) {
    debugLog(`DayController.postUserData`);
    try {
      const data = await this.model.saveUser(request.params.username);
      if (!data.success) {
        response.status(400);
      } else {
        response.setHeader("Content-Type", "application/json");
      }
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.postUserData: ${error}`);
      response
        .status(500)
        .send("Error posting data from DayController.postUserData");
    }
  }

  /**
   * Gets all the user's data
   * Request params contains the username
   */
  async getUserData(request, response) {
    debugLog(`DayController.getUserData`);
    try {
      const data = await this.model.getUserData(request.params.username);
      if (!data.success) {
        response.status(400);
      } else {
        response.setHeader("Content-Type", "application/json");
      }
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.getUserData: ${error}`);
      response
        .status(500)
        .send("Error retrieving data from DayController.getUserData");
    }
  }

  /**
   * Saves a day into the database
   * Request params contains the username and date_id
   */
  async postDay(request, response) {
    debugLog(`DayController.postDay`);
    try {
      const data = await this.model.saveDay(
        request.params.username,
        request.params.date_id,
        request.body
      );
      if (!data.success) {
        response.status(400);
      } else {
        response.setHeader("Content-Type", "application/json");
      }
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.postDay: ${error}`);
      response
        .status(500)
        .send("Error posting data from DayController.postDay");
    }
  }

  /**
   * Gets a day from the database
   * Request params contains the username and date_id
   */
  async getDay(request, response) {
    debugLog(`DayController.getDay`);
    try {
      const data = await this.model.getDay(
        request.params.username,
        request.params.date_id
      );
      if (!data.success) {
        response.status(400);
      } else {
        response.setHeader("Content-Type", "application/json");
      }
      return response.json(data);
    } catch (error) {
      debugLog(`Error in DayController.getDay: ${error}`);
      response
        .status(500)
        .send("Error retrieving data from DayController.getDay");
    }
  }

  /**
   * Gets all the days in a month
   * Request params contains the username, a month, and a year
   */
  async getDaysOfMonth(request, response) {
    debugLog(`DayController.getDaysOfMonth`);
    // TODO: Implement this method
  }

  /**
   * Gets all the days in a year
   * Request params contains the username and a year
   */
  async getDaysOfYear(request, response) {
    debugLog(`DayController.getDaysOfYear`);
    // TODO: Implement this method
  }

  async addEmotion(request, response) {
    debugLog(`DayController.addEmotion`);
    // TODO: Implement this method
  }

  async deleteEmotion(request, response) {
    debugLog(`DayController.deleteEmotion`);
    // TODO: Implement this method
  }
}

export default new DayController();
