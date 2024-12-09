import express, { request, response } from "express";
import { debugLog } from "../../config/debug.js";
import DayController from "../controller/DayController.js";

class DayRoutes {
  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  createRoutes() {
    // Adds a new user to the database
    this.router.post("/v1/users", async (request, response) => {
      debugLog(`POST /v1/users`);
      DayController.registerUser(request, response);
    });

    // Gets all the users from the database
    this.router.get("/v1/users", async (request, response) => {
      debugLog("GET /v1/users");
      DayController.getAllUsers(request, response);
    });

    // Gets the user from the database
    this.router.get("/v1/users/:username", async (request, response) => {
      debugLog(`GET /v1/users/${request.params.username}`);
      DayController.getUserByUsername(request, response);
    });

    // Authenticates the user, responds with a JWT token
    this.router.post("/v1/login", async (request, response) => {
      debugLog(`POST /v1/login`);
      DayController.loginUser(request, response);
    });

    // Posts all the user's data.
    this.router.post("/v1/days/:username", async (request, response) => {
      debugLog(`POST /v1/days/${request.params.username}`);
      DayController.postUserData(request, response);
    });

    // Gets all the user's data
    this.router.get("/v1/days/:username", async (request, response) => {
      debugLog(`GET /v1/days/${request.params.username}`);
      DayController.getUserData(request, response);
    });

    // Adds/Updates a day to the database
    this.router.post(
      "/v1/days/:username/:date_id",
      async (request, response) => {
        debugLog(
          `POST /v1/days/${request.params.username}/${request.params.date_id}`
        );
        DayController.postDay(request, response);
      }
    );

    // Gets a specified day based on it's id
    this.router.get(
      "/v1/days/:username/:date_id(\\d{2}-\\d{2}-\\d{4})",
      async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username}/${request.params.date_id}`
        );
        DayController.getDay(request, response);
      }
    );

    // Gets all the days in the specified month in a year
    this.router.get(
      "/v1/days/:username/:month/:year",
      async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username}/${request.params.month}/${request.params.year}`
        );
        DayController.getDaysOfMonth(request, response);
      }
    );

    // Gets all the days in the specified year
    this.router.get("/v1/days/:username/:year", async (request, response) => {
      debugLog(
        `GET /v1/days/${request.params.username}/${request.params.year}`
      );
      DayController.getDaysOfYear(request, response);
    });

    // Adds an emotion entry to a day
    this.router.post("/v1/emotions", async (request, response) => {
      debugLog("POST /v1/emotions");
      DayController.addEmotion(request, response);
    });

    // Deletes an emotion entry to a day from the given index
    this.router.delete("/v1/emotions/:index", async (request, response) => {
      debugLog(`DELETE /v1/emotions/${request.params.index}`);
      DayController.deleteEmotion(request, response);
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new DayRoutes().getRouter();
