import { format, transports } from "winston";

module.exports = {
  port: process.env.APP_PORT || 8080,
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
  logging: {
    format: format.combine(format.timestamp(), format.json()),
    transports: [
      new transports.File({ filename: "./logs/logs.log" }),
      new transports.Console(),
    ],
  },
  wildfire: {
    baseUrl: process.env.NASA_WILDFIRE_URL,
  },
  openCageApiKey: process.env.OPEN_CAGE_API_KEY,
};
