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
   "/v1/days/:username/:date_id",
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

    // Function to convert data into CSV format - Made by Liam Campbell @ChronoSpirit
    const convertToCSV = (data, fields) => {
      const header = fields.join(","); //After every Data, join with a ','

      // Maps over the data array to generate the rows of data
      const rows = data.map(row =>
          fields.map(field => (row[field] !== undefined ? row[field] : "")).join(",") //map function, if field exist, print -> else undefended or ""
      );
      
      //Combines the headers and rows into a single csv string that are separated by new lines
      return [header, ...rows].join("\n");
    };

    //Route for exporting data as a csv file - Made by Liam Campbell @ChronoSpirit
    this.router.get("/export-csv", async (req, res) => {
      try {
          const data = await data;
          const fields = ["date_id", "rating", "emotion", "journal"]; //fields
          const csv = convertToCSV(data, fields); //converts to csv using the data and fields

          //Everything below is what creates the csv file and the file's name when downloaded
          res.setHeader("Content-Type", "text/csv");
          res.setHeader("Content-Disposition", "attachment; filename=summary.csv");
          res.status(200).send(csv);
          //Catches error if an error occurs and sends a 500 status error if failed
      } catch (error) {
          console.error("Error exporting CSV:", error);
          res.status(500).send("Failed to generate CSV");
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new DayRoutes().getRouter();
