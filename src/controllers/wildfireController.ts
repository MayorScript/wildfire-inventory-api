import { Request, Response } from "express";
import WildfireService from "../services/wildfireService";
import logger from "../lib/logger";

const wildfireService = new WildfireService();

/**
 * Fetch wildfire data and handle errors.
 * @param req {Request} The Express request object.
 * @param res {Response} The Express response object.
 */
const fetchWildfireData = async (req: Request, res: Response) => {
  try {
    const result = await wildfireService.getWildfires(req, res);
    res.json(result);
  } catch (error: any) {
    const errorMessage = `An error occurred: ${error.message}`;
    logger.error(errorMessage);

    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
module.exports = { fetchWildfireData };
