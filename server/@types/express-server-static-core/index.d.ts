import { Session } from "express-session";
import { User } from "../../models/User";
declare module "express-serve-static-core" {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
