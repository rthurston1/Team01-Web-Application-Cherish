import express from "express";
import DayController from "../controller/DayController.js";
import { debugLog } from "../../config/debug.js";

/* Class Written by Nikolay Ostroukhov @nikozbk (heavily inspired by Tim Richards' sample code) */
class DayRoutes {
  constructor() {
    this.router = express.Router();
    this.initializeRoutes();
  }

  /**
   * Initializes the routes for the Day entity.
   *
   * Routes:
   * - GET /days: Retrieves all days.
   * - GET /days/:id: Retrieves a specific day by ID.
   * - PUT /days/:id: Adds a new day with the specified ID.
   * - DELETE /days/:id: Deletes a specific day by ID.
   * - DELETE /days: Clears all days.
   *
   * Each route logs the request and response status, and handles errors by sending a 500 status code with the error message.
   */
  initializeRoutes() {
    // Get all days route
    this.router.get("/days", async (req, res) => {
      debugLog(`GET /days`);
      try {
        await DayController.getAllData(req, res);
        if (res.ok) {
          debugLog(`GET /days - Success`);
        }
      } catch (error) {
        debugLog(`GET /days - Error: ${error.message}`);
        res.status(500).send(error.message);
      }
    });

    // Get a specific day
    this.router.get("/days/:id", async (req, res) => {
      debugLog(`GET /days/${req.params.id}`);
      try {
        await DayController.getDay(req, res);
        if (res.ok) {
          debugLog(`GET /days/${req.params.id} - Success`);
        }
      } catch (error) {
        debugLog(`GET /days/${req.params.id} - Error: ${error.message}`);
        res.status(500).send(error.message);
      }
    });

    // Add a new day
    this.router.put("/days/:id", async (req, res) => {
      debugLog(`PUT /days/${req.params.id}`);
      try {
        await DayController.addDay(req, res);
        if (res.ok) {
          debugLog(`PUT /days/${req.params.id} - Success`);
        }
      } catch (error) {
        debugLog(`PUT /days/${req.params.id} - Error: ${error.message}`);
        res.status(500).send(error.message);
      }
    });

    // Delete a specific day
    this.router.delete("/days/:id", async (req, res) => {
      debugLog(`DELETE /days/${req.params.id}`);
      try {
        await DayController.removeDay(req, res);
        if (res.ok) {
          debugLog(`DELETE /days/${req.params.id} - Success`);
        }
      } catch (error) {
        debugLog(`DELETE /days/${req.params.id} - Error: ${error.message}`);
        res.status(500).send(error.message);
      }
    });

    // Clear all days
    this.router.delete("/days", async (req, res) => {
      debugLog(`DELETE /days`);
      try {
        await DayController.clearAllData(req, res);
        if (res.ok) {
          debugLog(`DELETE /days - Success`);
        }
      } catch (error) {
        debugLog(`DELETE /days - Error: ${error.message}`);
        res.status(500).send(error.message);
      }
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new DayRoutes().getRouter();
