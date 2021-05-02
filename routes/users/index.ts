import express from "express";
import authorization from "../../middleware/authorization";
import changeUserPassword from "./methods/changeUserPassword";
import getUserProfile from "./methods/getUserProfile";
import loginUserViaEmail from "./methods/loginUserViaEmail";
import sendChangePasswordLinkToUserEmail from "./methods/sendChangePasswordLinkToUserEmail";

//declare the express router
const router = express.Router();

// @route   POST api/user/login/email
// @desc    Login user via email
// @access  Public
router.post("/login/email", loginUserViaEmail);

// @route   GET api/user/profile
// @desc    get user profile
// @access  Private
router.get("/profile", authorization, getUserProfile);

// @route   POST api/user/send-change-password-link-to-email
// @desc    Send change password link to user email
// @access  Public
router.post(
  "/send-change-password-link-to-email",
  sendChangePasswordLinkToUserEmail
);

// @route   POST api/user/change-password
// @desc    Change user password
// @access  Public
router.post("/change-password", changeUserPassword);

export default router;
