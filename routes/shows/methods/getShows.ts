import { Request, Response } from "express";
import Show from "../../../models/Show";

//Get shows
//Optional: query parameters
const getShows = async (req: Request, res: Response) => {
  try {
    //Check if user token data exists (added from the authorization middleware)
    const userTokenData = req.userTokenData;

    if (!userTokenData) {
      return res.status(400).json({
        success: false,
        message: "User authorization token is not valid",
      });
    }

    //Retrieve shows
    const shows: any = await Show.find();

    //Return error if no show found
    if (!shows || shows.length < 1) {
      return res.status(400).json({
        success: false,
        message: "No shows found",
      });
    }

    //Return shows retrieved successfully
    return res.json({
      success: true,
      message: "Shows retrieved successfully",
      data: shows,
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`getShows: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve shows" });
  }
};

export default getShows;
