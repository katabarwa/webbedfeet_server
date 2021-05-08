import { Request, Response } from "express";

//Get user profile
const getUserProfile = async (req: Request, res: Response) => {
  try {
    //Check if user token data exists (added from the authorization middleware)
    const userTokenData = req.userTokenData;

    if (!userTokenData) {
      return res.status(400).json({
        success: false,
        message: "User authorization token is not valid",
      });
    }

    //Return user profile retrieved successfully
    return res.json({
      success: true,
      message: "User profile retrieved successfully",
      data: userTokenData.user,
    });
  } catch (err) {
    //Log error and return error on catch
    console.error(`getUser: ${err}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to retrieve user profile" });
  }
};

export default getUserProfile;
