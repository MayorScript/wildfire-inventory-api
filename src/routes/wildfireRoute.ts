import express from "express";
import validate from "../middlewares/validator"; // validator middleware
import wildfireSchema from "../schema/wildfireSchema"; // validate schema
const wildfireController = require("../controllers/wildfireController");
const router = express.Router();

router.get(
  "/fetch-data",
  validate(wildfireSchema),
  wildfireController.fetchWildfireData,
);

export default router;
