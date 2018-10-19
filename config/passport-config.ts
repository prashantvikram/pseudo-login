import { Strategy as LocalStrategy } from "passport-local";
import User, { IUser } from "../models/user";
import { PassportStatic } from "passport";

function config (passport: PassportStatic): void {
  passport.serializeUser((user: IUser, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findById(id, (err: any, user: IUser) => {
      done(err, user);
    });
  });

  passport.use("signup", new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.findOne({ "username": username }, (err: any, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, false, { message: "User with the same username/email exists" });
      } else {
        var newUser: IUser = new User(req.body);
        newUser.save((err: any) => {
          if (err) {
            throw err;
          }
          return done(null, newUser, { message: "User was added successfully" });
        });
      }
    });
  }));

  passport.use("signin", new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    User.findOne({ "username": username }, (err:any, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "No user found" });
      }
      if (!user.validatePassword(password)) {
        return done(null, false, { message: "Wrong password" });
      }

      return done(null, user, { message: "User logged in successfully" });
    });
  }));
}

export default config;