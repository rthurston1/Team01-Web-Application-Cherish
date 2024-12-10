/* The Day Controller places calls to Model */
/* DayRoutes.js tells the Day Controller which calls to place  */
import ModelFactory from "../model/ModelFactory.js";
import { debugLog } from "../../config/debug.js";

class DayController {
  constructor() {
    this.initializeModel("sqlite-fresh");
  }

  async initializeModel(modelType) {
    try {
      this.model = await ModelFactory.getModel(modelType);
      debugLog(`DayController initialized with ${modelType}`, "INFO");
    } catch (err) {
      debugLog(`Error initializing DayController: ${err}`, "ERROR");
      throw new Error("Error initializing Model in DayController: " + err);
    }
  }

  setModel(model) {
    this.model = model;
  }

  // Handles the request and response for each method
  // Author: @nikozbk
  async handleRequest(request, response, modelMethod, methodName, ...params) {
    debugLog(`DayController.${methodName}`, "CALL");
    try {
      const data = await modelMethod(...params);
      debugLog(`Data: ${JSON.stringify(data)}`, "INFO");
      if (!data.success) {
        debugLog(`Bad Request: ${data.error}`, "INFO");
        response.status(methodName === "loginUser" ? 401 : 400).json(data);
      } else {
        debugLog(`Success: ${JSON.stringify(data)}`, "INFO");
        response.setHeader("Content-Type", "application/json");
      }
      response.json(data);
    } catch (error) {
      debugLog(error, "ERROR");
      // don't send headers if already sent
      if (!response.headersSent) {
        response.status(500).send(`Error in DayController.${methodName}`);
      } else {
        response.send(`Error in DayController.${methodName}`);
      }
    }
  }

  // Gets all users in the database (does not include their day data)
  // Author: @nikozbk
  async getAllUsers(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.getAllUsers.bind(this.model),
      "getAllUsers"
    );
  }

  // Gets a user from the database
  // Request param contains the username
  // Author: @nikozbk
  async getUserByUsername(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.getUser.bind(this.model),
      "getUserByUsername",
      request.params.username
    );
  }

  /**
   * Adds a new user into the database and returns a JWT session token
   * Request body contains the username and password (password needs to be encrypted)
   */
  async registerUser(request, response) {
    debugLog(`DayController.registerUser`);
    // Implement user registration logic here
    // Example:
    // const { username, password } = request.body;
    // const result = await this.model.registerUser(username, password);
    // return response.json(result);
  }

  /**
   * Attempts to login in the user and returns all of their data
   * Request body contains a username and password inputted by the user
   * Author: @nikozbk
   */
  async loginUser(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.loginUser.bind(this.model),
      "loginUser",
      request.body.username,
      request.body.password
    );
  }

  /**
   * Posts the user's data
   * Request params contains the username
   * Author: @nikozbk
   */
  async postUserData(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.saveUser.bind(this.model),
      "postUserData",
      request.params.username
    );
  }

  /**
   * Gets all the user's data
   * Request params contains the username
   * Author: @nikozbk
   */
  async getUserData(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.getUserData.bind(this.model),
      "getUserData",
      request.params.username
    );
  }

  /**
   * Saves a day into the database
   * Request params contains the username and date_id
   * Author: @nikozbk
   */
  async postDay(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.saveDay.bind(this.model),
      "postDay",
      request.params.username,
      request.body
    );
  }

  /**
   * Gets a day from the database
   * Request params contains the username and date_id
   */
  async getDay(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.getDay.bind(this.model),
      "getDay",
      request.params.username,
      request.params.date_id
    );
  }

  /**
   * Gets all the days in a month
   * Request params contains the username, a month, and a year
   */
  async getDaysOfMonth(request, response) {
    await this.handleRequest(
      request,
      response,
      this.model.getDaysOfMonth.bind(this.model),
      "getDaysOfMonth",
      request.params.username,
      request.params.month,
      request.params.year
    );
  }

  /**
   * Gets all the days in a year
   * Request params contains the username and a year
   */
  async getDaysOfYear(request, response) {
    this.handleRequest(
      request,
      response,
      this.model.getDaysOfYear.bind(this.model),
      "getDaysOfYear",
      request.params.username,
      request.params.year
    );
  }

  async addEmotion(request, response) {
    debugLog(`DayController.addEmotion`);
    // Implement add emotion logic here
    // Example:
    // const { username, date_id, emotion } = request.body;
    // const result = await this.model.addEmotion(username, date_id, emotion);
    // return response.json(result);
  }

  async deleteEmotion(request, response) {
    debugLog(`DayController.deleteEmotion`);
    // Implement delete emotion logic here
    // Example:
    // const { username, date_id, index } = request.params;
    // const result = await this.model.deleteEmotion(username, date_id, index);
    // return response.json(result);
  }
}

export default new DayController();
