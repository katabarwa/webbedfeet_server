import { Request, Response } from "express";
import { validateEmailFormat } from "../../../functions/validateInputs";
import { encrypt } from "../../../functions/cryptUtils";
import User from "../../../models/User";

//Send change password link to user email
const sendChangePasswordLinkToUserEmail = async (
  req: Request,
  res: Response
) => {
  //Check if request contains a body
  if (!req.body) {
    return res
      .status(400)
      .json({ success: false, message: "No data was sent to the server" });
  }

  //De-structure the email from the request body
  let { email } = req.body;

  //set email to lowercase for consistency
  email = email?.toLowerCase();

  //Validate if email exists and is non empty
  if (email === "" || !email)
    return res
      .status(400)
      .json({ success: false, message: "Email is required" });

  //Validate if email provided is an email (just checks if it is an email format)
  if (!validateEmailFormat(email.trim()))
    return res
      .status(400)
      .json({ success: false, message: "Email is invalid" });

  //Begin creation of change password link
  try {
    //Check if user exists
    const existingUser: any = await User.findOne({
      email: email.trim(),
    });

    //Return success message if user does not exists, this is to confuse hackers and spammers from finding out emails that do not exist
    if (!existingUser) {
      return res.json({
        success: true,
        message: "Password reset link sent successfully",
      });
    }

    //Generate encrypted change password token
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);
    const changePasswordToken = encrypt({ email, expiryDate });

    //Return error if generating change password token failed
    if (!changePasswordToken) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate change password token",
      });
    }

    //TO DO
    //Send email to the user with the a link containing the encrypted token

    //Return password reset email sent successfully
    return res.json({
      success: true,
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    //Log error and return error on catch error
    console.error(`sendChangePasswordLinkToUserEmail : ${error}`);
    return res.json({
      success: true,
      message: "Password reset link sent successfully",
    });
  }
};

export default sendChangePasswordLinkToUserEmail;
