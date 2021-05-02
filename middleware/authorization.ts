import { NextFunction, Response } from "express";
import { decrypt } from "../functions/cryptUtils";
import User from "../models/User";

//Check if header or cookie contains the authorization token
const authorization = async (req: any, res: Response, next: NextFunction) => {
  let token = req.cookies?._wf_st;
  if (!token) token = req.header ? req.header("authorization") : null;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token, authorization denied",
    });
  }

  const tokenData = await decrypt(token);

  if (!tokenData) {
    return res.status(400).json({
      success: false,
      message: "User authorization token is not valid",
    });
  }

  //Check if user exists
  const existingUser: any = await User.findOne({
    _id: tokenData.user._id,
  });

  //Return error if user does not exist
  if (!existingUser) {
    return res.status(400).json({
      success: false,
      message: "User does not exists",
    });
  }

  tokenData.user = existingUser;
  tokenData.token = token;
  req.userTokenData = tokenData;
  next();
};

export default authorization;
