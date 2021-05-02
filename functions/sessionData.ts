import { addDays } from "date-fns";
import { encrypt } from "./cryptUtils";

//Generates the session data for cookie
const sessionData = (user: any) => {
  let newSessionData = null;

  //Generate user session token
  const userSessionToken = encrypt({
    user,
    expiry: addDays(new Date(), 30),
  });

  //Set user session token
  if (userSessionToken) {
    //Create cookie options (because secure cookies only works with https, this will set it dynamically based on the  environment as localhost is usually just http)
    let cookieOptions = {};
    if (process.env.NODE_ENV !== "development") {
      cookieOptions = {
        secure: true,
        sameSite: "none",
        httpOnly: true,
      };
    }
    newSessionData = { userSessionToken, cookieOptions };
  }

  return newSessionData;
};

export default sessionData;
