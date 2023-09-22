import { Request, Response } from "express";
import axios from "../lib/axiosInstance";
import { getCountryFromCoordinates } from "../lib/utils";
import logger from "../lib/logger";
import { MONTHS } from "../lib/constants";

class WildfireService {
  /**
   * Fetch wildfire data and handle errors.
   * @param req {Request} The Express request object.
   * @param res {Response} The Express response object.
   */

  async getWildfires(req: Request, res: Response): Promise<any> {
    try {
      const { month, year } = req.query;
      const newMonth = (month as string).toUpperCase(); // Convert month to uppercase for comparison
      logger.info(
        `Received request for wildfires with month: ${newMonth} and year: ${year}`,
      );

      const wildfiresResponse = await axios.get(
        `?category=wildfires&status=closed`,
      );
      const events: Array<object> = wildfiresResponse.data.events;

      const filteredWildfireData = await Promise.all(
        events.map(async (event: any) => {
          const { title, closed, geometry } = event;
          const dateObject = new Date(closed);
          const monthAbbreviation = MONTHS[dateObject.getUTCMonth()];
          const yearD = dateObject.getUTCFullYear();

          if (
            newMonth === monthAbbreviation &&
            year === yearD.toString() &&
            geometry
          ) {
            const coordinates: Array<number> = geometry[0]?.coordinates;
            if (coordinates && coordinates.length === 2) {
              const [longitude, latitude]: Array<number> = coordinates;
              const country = getCountryFromCoordinates(longitude, latitude);
              return { name: title, country };
            }
          }

          return null; // Return null for non-matching events or events without coordinates
        }),
      );

      const filteredData = filteredWildfireData.filter(Boolean);
      logger.info(
        `Found ${filteredData.length} matching wildfires for the given query.`,
      );
      return filteredData;
    } catch (error) {
      logger.error("Error while fetching wildfire data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default WildfireService;
