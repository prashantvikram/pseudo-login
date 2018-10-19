import { Request, Response, NextFunction } from "express";
const rug: any = require("random-username-generator");
import passport from "passport";
import { IUser } from "../models/user";

export class UserController {
  public generateNew(_: any, res: Response): any {
    rug.setSeperator("_");
    let username: string = rug.generate().toLowerCase();
    return res.status(200).send(username);
  }
  public register(req: Request, res: Response, next: NextFunction): any {
    passport.authenticate("signup", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      return res.json(info);
    })(req, res, next);
  }
  public login(req: Request, res: Response, next: NextFunction): any {
    passport.authenticate("signin", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      return res.json(info);
    })(req, res, next);
  }
}