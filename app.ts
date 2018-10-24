import express, { Request, Response } from "express";

// imports for database
import mongoose from "mongoose";

// imports for logger
import winston from "./config/winston-config";
import morgan from "morgan";

// imports for middleware
import * as bodyParser from "body-parser";
import helmet from "helmet";
import compression from "compression";

// imports for authentication and sessions
import passport from "passport";
import session from "express-session";
const MongoStore: any = require("connect-mongo")(session);
import passportConfig from "./config/passport-config";

// imports for rate limiting
import rateLimit from "express-rate-limit";

import { Routes } from "./routes";

import { config } from "./config/env-config";

class App {

  public app: express.Application;
  public routes: Routes = new Routes(passport);
  public mongoUrl: string = config.mongoUrl;

  constructor() {
    this.app = express();
    this.mongoSetup();
    this.loggerSetup();
    this.middleware();
    this.routes.allRoutes(this.app);
    this.rateLimiter();
  }

  private mongoSetup(): void {
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true
    }, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("Database connected");
      }
    });
  }

  private loggerSetup(): void {
    this.app.use(morgan("combined", {
      stream: {
        write: (message: any) => {
          winston.info(message);
        },
      }
    }));
  }

  private middleware(): void {
    // protection from web vulnerabilities like XSS and clickjacking
    this.app.use(helmet());

    // reducing the size of res.body
    this.app.use(compression());

    // parsing res.body to json
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    passportConfig(passport);
    this.app.use(session({
      secret: config.sessionSecret,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000
      }
    }));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private rateLimiter(): void {
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
  }
}

export default new App().app;