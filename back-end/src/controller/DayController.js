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
   *  @param {Object} req - The request object.
   *  @param {Object} res - The response object.
   *  @returns {Promise<void>} - A promise that resolves when the data is sent or an error is handled.
   */
  async getAllData(req, res) {
    debugLog(`DayController.getAllData`);
    try {
      const data = await this.model.read();
      debugLog(`Returning data: ${JSON.stringify(data)}`);
      res.setHeader("Content-Type", "application/json");
      res.json(data);
    } catch (err) {
      debugLog(`Error in DayController.getAllData: ${err}`);
      res
        .status(500)
        .send("Error retrieving data from DayController.getAllData");
    }
  }

  async getAllUsers(req, res) {
    debugLog(`DayController.getAllUsers`);
    // TODO: Implement this method
  }

  async getUserByUsername(req, res) {
    debugLog(`DayController.getUserByUsername`);
    // TODO: Implement this method
  }

  async registerUser(req, res) {
    debugLog(`DayController.registerUser`);
    // TODO: Implement this method
  }

  async loginUser(req, res) {
    debugLog(`DayController.loginUser`);
    // TODO: Implement this method
  }

  async postUserData(req, res) {
    debugLog(`DayController.postUserData`);
    // TODO: Implement this method
  }

  async getUserData(req, res) {
    debugLog(`DayController.getUserData`);
    // TODO: Implement this method
  }

  async postDay(req, res) {
    debugLog(`DayController.postDay`);
    // TODO: Implement this method
  }

  async getDay(req, res) {
    debugLog(`DayController.getDay`);
    // TODO: Implement this method
  }

  async getDaysOfMonth(req, res) {
    debugLog(`DayController.getDaysOfMonth`);
    // TODO: Implement this method
  }

  async getDaysOfYear(req, res) {
    debugLog(`DayController.getDaysOfYear`);
    // TODO: Implement this method
  }

  async addEmotion(req, res) {
    debugLog(`DayController.addEmotion`);
    // TODO: Implement this method
  }

  async deleteEmotion(req, res) {
    debugLog(`DayController.deleteEmotion`);
    // TODO: Implement this method
  }
}

export default new DayController();
