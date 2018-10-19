import express from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import session from "express-session";

import passportConfig from "./config/passport-config";
import winston from "./config/winston-config";

import { config } from "./config/env-config";

import { Routes } from "./api";

class App {

  public app: express.Application;
  public routes: Routes = new Routes();
  public mongoUrl: string = config.mongoUrl;

  constructor() {
    this.app = express();
    this.config();
    this.routes.allRoutes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    // middleware for parsing requests
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // setting the port
    this.app.set("port", config.port);

    passportConfig(passport);

    this.app.use(helmet());

    this.app.use(compression());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      }
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());

    this.app.use(morgan("combined", {
      stream: {
        write: (message: any) => {
          winston.info(message);
        },
      }
    }));
  }
  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, { useNewUrlParser: true }, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Database connected");
      }
    });
  }
}

export default new App().app;