import { Request, Response } from "express";
import { decrypt, encrypt } from "../../../functions/cryptUtils";
import { addDays, isBefore, parseISO } from "date-fns";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { validatePassword } from "../../../functions/validateInputs";

//Change user password
const changeUserPassword = async (req: Request, res: Response) => {
  //Check if request contains a body
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "No data was sent to the server" });
  }

  //De-structure the request body properties
  let { password, changePasswordToken } = req.body;

  //Validate if verification token exists and is non empty
  if (changePasswordToken === "" || !changePasswordToken)
    return res
      .status(400)
      .json({ success: false, message: "A change password token is required" });

  //Validate if password exists and is non empty
  if (!password || password === "")
    return res
      .status(400)
      .json({ success: false, message: "Password is required" });

  //Validate if password length
  if (!validatePassword(password))
    return res.status(400).json({
      success: false,
      message: "Password must be at least 6 characters",
    });

  //Begin change of user password
  try {
    //Decrypt change password reset token
    const changePasswordTokenData = decrypt(changePasswordToken);

    //Check if token is valid
    if (!changePasswordTokenData) {
      return res.status(400).json({
        success: false,
        message: "Change password link is invalid",
      });
    }

    //Check password reset token expiry
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 0);

    if (!isBefore(currentDate, parseISO(changePasswordTokenData.expiryDate))) {
      return res.status(400).json({
        success: false,
        message: "Change password link has expired",
      });
    }

    //create password salt
    const passwordSalt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, passwordSalt);

    //Update user password
    await User.findOneAndUpdate(
      {
        email: changePasswordTokenData.email,
      },
      {
        $set: {
          password,
        },
      }
    );

    //Get newly updated user
    const updatedUser: any = await User.findOne({
      email: changePasswordTokenData.email,
    });

    if (updatedUser) {
      //Generate user session token
      const userSessionToken = encrypt({
        user: updatedUser,
        expiry: addDays(new Date(), 30),
      });

      //Set user session token
      if (userSessionToken) {
        //Set cookie in browser
        res.cookie("_wf_st", userSessionToken, {
          secure: true,
          httpOnly: true,
        });
      }

      //TO DO
      //Send password changed email to user

      //Return change password successful
      return res.json({
        success: true,
        message: "Password changed successfully",
        token: userSessionToken,
      });
    }
  } catch (error) {
    //Log error and return error on catch error
    console.error(`changeUserPassword: ${error}`);
    res
      .status(500)
      .json({ success: false, message: "Failed to change password" });
  }
};

export default changeUserPassword;
