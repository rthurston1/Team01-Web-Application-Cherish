/* Server.js listens for requests on port 3000 by default */
/* These requests are defined in DayRoutes.js */
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import DayRoutes from "./routes/DayRoutes.js";

// Declare and get the directory names - Liam
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
  /* TODO: */
  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.setupRoutes();
  }

  configureMiddleware() {
    // Static files from the front-end - Liam
    this.app.use(express.static(path.join(__dirname, "../../front-end/src")));

    // Parses the json body and limits it to 10mb - Liam
    this.app.use(express.json({ limit: "10mb" }));

    // Serve JavaScript files with the correct MIME type - Niko
    this.app.use((req, res, next) => {
      if (req.path.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      } else if (req.path.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (req.path.endsWith(".json")) {
        res.setHeader("Content-Type", "application/json");
      } else if (req.path.endsWith(".html")) {
        res.setHeader("Content-Type", "text/html");
      } else if (req.path.endsWith("/")) {
        res.setHeader("Content-Type", "text/html");
      } else {
        res.setHeader("Content-Type", "text/plain");
      }
      next();
    });

    // Set Content Security Policy headers
    this.app.use((req, res, next) => {
      res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:; font-src 'self' https://fonts.googleapis.com; connect-src 'self';"
      );
      next();
    });

    // Logs the HTTP method and path of each request, then passes control to the next middleware. - Liam
    this.app.use((req, res, next) => {
      console.log(`${req.method} ${req.path}`);
      next();
    });
  }

  // Setup the routes for server - Liam
  setupRoutes() {
    this.app.use("/v1", DayRoutes);
  }

  // Start the server on a specified port
  start(port = 3000) {
    this.app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  }
}

// Initialize and start the server
console.log("Starting server...");
const server = new Server();
server.start();