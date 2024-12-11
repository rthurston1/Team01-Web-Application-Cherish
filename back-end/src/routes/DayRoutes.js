import express, { request, response } from "express";
import { debugLog } from "../../config/debug.js";
import DayController from "../controller/DayController.js";
import cors from "cors";

class DayRoutes {
  constructor() {
    this.router = express.Router();
    this.createRoutes();
  }

  createRoutes() {
    // Enable CORS for all routes
    this.router.use(cors());
    // Helper function to handle routes and log errors
    const handleRoute = (routeHandler) => async (request, response) => {
      try {
        await routeHandler(request, response);
        debugLog(`Route ${request.method} ${request.originalUrl} successful`);
      } catch (error) {
        debugLog(
          `Error in route ${request.method} ${request.originalUrl}: ${error.message}`,
          "ERROR"
        );
        response
          .status(500)
          .json({ success: false, error: "Internal Server Error" });
      }
    };

    // Adds a new user to the database
    this.router.post(
      "/v1/users",
      handleRoute(async (request, response) => {
        debugLog(`POST /v1/users`);
        await DayController.registerUser(request, response);
      })
    );

    // Gets all the users from the database
    this.router.get(
      "/v1/users",
      handleRoute(async (request, response) => {
        debugLog("GET /v1/users");
        await DayController.getAllUsers(request, response);
      })
    );

    // Gets the user from the database
    this.router.get(
      "/v1/users/:username",
      handleRoute(async (request, response) => {
        debugLog(`GET /v1/users/${request.params.username}`);
        await DayController.getUserByUsername(request, response);
      })
    );

    // Authenticates the user, responds with a JWT token
    this.router.post(
      "/v1/login",
      handleRoute(async (request, response) => {
        debugLog(`POST /v1/login`);
        await DayController.loginUser(request, response);
      })
    );

    // Posts all the user's data.
    this.router.post(
      "/v1/days/:username",
      handleRoute(async (request, response) => {
        debugLog(
          `POST /v1/days/${request.params.username} (DayController.postUserData)`
        );
        await DayController.postUserData(request, response);
      })
    );

    // Gets all the user's data
    this.router.get(
      "/v1/days/:username",
      handleRoute(async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username} (DayController.getUserData)`
        );
        await DayController.getUserData(request, response);
      })
    );

    // Adds/Updates a day to the database
    this.router.post(
      "/v1/days/:username/:date_id",
      handleRoute(async (request, response) => {
        debugLog(
          `POST /v1/days/${request.params.username}/${request.params.date_id}`
        );
        await DayController.postDay(request, response);
      })
    );

    // Gets a specified day based on its id
    this.router.get(
      "/v1/days/:username/:date_id",
      async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username}/${request.params.date_id}`
        );
        await DayController.getDay(request, response);
    });
  

    // Gets all the days in the specified month in a year
    this.router.get(
      "/v1/days/:username/:month/:year",
      handleRoute(async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username}/${request.params.month}/${request.params.year}`
        );
        await DayController.getDaysOfMonth(request, response);
      })
    );

    // Gets all the days in the specified year
    this.router.get(
      "/v1/days/:username/:year",
      handleRoute(async (request, response) => {
        debugLog(
          `GET /v1/days/${request.params.username}/${request.params.year}`
        );
        await DayController.getDaysOfYear(request, response);
      })
    );

    // Adds an emotion entry to a day
    this.router.post(
      "/v1/emotions/:username/:date_id",
      handleRoute(async (request, response) => {
        debugLog(
          `POST /v1/emotions/${request.params.username}/${request.params.date_id}`
        );
        await DayController.saveEmotions(request, response);
      })
    );

    // Deletes an emotion entry to a day from the given index
    this.router.delete(
      "/v1/emotions/:index",
      handleRoute(async (request, response) => {
        debugLog(`DELETE /v1/emotions/${request.params.index}`);
        await DayController.deleteEmotion(request, response);
      })
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new DayRoutes().getRouter();
