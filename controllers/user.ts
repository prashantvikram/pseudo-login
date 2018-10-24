import { Request, Response, NextFunction } from "express";
const rug: any = require("random-username-generator");
import { PassportStatic } from "passport";
import { IUser } from "../models/user";

export class UserController {

  public passport: PassportStatic;

  constructor(passport: PassportStatic) {
    this.passport = passport;

    this.signup = this.signup.bind(this);
    this.signin = this.signin.bind(this);
  }

  public getUserSession(req: Request, res: Response):any {
    return res.json(req.session);
  }


  public generateNew(_: any, res: Response): any {
    rug.setSeperator("_");
    let username: string = rug.generate().toLowerCase();
    return res.status(200).send(username);
  }

  public signup(req: Request, res: Response, next: NextFunction): any {
    this.passport.authenticate("signup", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      return res.json(info);
    })(req, res, next);
  }

  public signin(req: Request, res: Response, next: NextFunction): any {
    this.passport.authenticate("signin", (err: any, user: IUser, info: any) => {
      if (err) {
        return next(err);
      }

      req.login(user, err => {
        if (err) { return next(err); }

        user.lastActive = new Date();
        return res.json(info);
      });
    })(req, res, next);
  }

  public logout(req: Request, res: Response, next: NextFunction): any {
    req.logout();
    res.json({ message: "logged out successfully" });
  }
}