import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import config from "./config";

import wildfireRoute from "./routes/wildfireRoute";

dotenv.config(); // Load environment variables

const app: Application = express();

// Middleware
app.use(express.json()); // Parse application/json
app.use(express.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded
app.use(cors(config.cors)); // Enable CORS requests

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Server is Healthy!");
});

// Use the wildfire routes
app.use("/wildfire", wildfireRoute);

export default app;
