import { User } from "../../models/User";
declare module "express-session" {
  namespace Express {
    interface Session {
      user?: User;
    }
  }
}
