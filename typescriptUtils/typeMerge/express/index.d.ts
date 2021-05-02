import { TUserTokenData } from "../../interfaces";
declare global {
  namespace Express {
    interface Request {
      userTokenData?: TUserTokenData;
    }
  }
}
