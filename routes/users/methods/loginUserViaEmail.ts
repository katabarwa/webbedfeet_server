import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import {
  validateEmailFormat,
  validatePassword,
} from "../../../functions/validateInputs";
import User from "../../../models/User";
import sessionData from "../../../functions/sessionData";

//Login user via email
const loginUserViaEmail = async (req: Request, res: Response) => {
  //Check if request contains a body
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "No data was sent to the server" });
  }

  //De-structure the request body properties
  let { email, password = null } = req.body;

  //set email to lowercase for consistency
  email = email?.toLowerCase();

  /*Validate request body data values*/
  //Validate if email provided is an email (just checks if it is an email format)
  if (!validateEmailFormat(email.trim()))
    return res
      .status(400)
      .json({ success: false, message: "Email is invalid" });

  //Validate if password is at least 6 characters
  if (!validatePassword(password))
    return res
      .status(400)
      .json({
        success: false,
        message: "Password must be at least 6 characters",
      });

  //Begin user login
  try {
    //Check if user exists
    const existingUser: any = await User.findOne(
      {
        email: email.trim(),
      },
      "+password"
    );

    //Return error if user does not exist
    if (!existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email not registered",
      });
    }

    //Check password hash if it matched provided password else return an error
    const userPasswordHash = existingUser.password;
    const passwordMatch = await bcrypt.compare(password, userPasswordHash);

    if (!passwordMatch) {
      return res.status(400).json({
        success: false,
        message: "Your email or password is incorrect",
      });
    }

    //Remove user password from user data
    let user = { ...existingUser._doc };
    delete user.password;

    //Generate user session data
    const userSessionData = sessionData(user);

    //Set user session token
    if (userSessionData) {
      //Set cookie in browser
      res.cookie(
        "_wf_st",
        userSessionData.userSessionToken,
        userSessionData.cookieOptions
      );
    }

    //Return user login successful
    return res.json({
      success: true,
      message: "User login successfully",
      token: userSessionData.userSessionToken,
    });
  } catch (error) {
    //Log error and return error on catch error
    console.error(`loginUserViaEmail: ${error.message}`);
    res.status(500).json({ success: false, message: "Failed to login user" });
  }
};

export default loginUserViaEmail;
