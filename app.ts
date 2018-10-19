import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import session from "express-session";
import rateLimit from "express-rate-limit";

import passportConfig from "./config/passport-config";
import winston from "./config/winston-config";

import { config } from "./config/env-config";

import { Routes } from "./routes";

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

    const apiLimiter: any = new rateLimit({
      windowMs: 10 * 60 * 1000, // 2 minutes
      max: 100, // limit each IP to 100 requests per windowMs
      message: "Too many requests from this IP",
      handler: function(req: Request, res: Response):void {
        // handle requests when limit is reached
        // could be logged using winston
        // or saved to a redis store
      }
    });

    this.app.use("/api/", apiLimiter);

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