import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";


import {config} from "./config/env-config";

class App {

  public app: express.Application;
  public mongoUrl: string = config.mongoUrl;

  constructor() {
    this.app = express();
    this.config();
    this.mongoSetup();
  }

  private config(): void {
    // middleware for parsing requests
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // setting the port
    this.app.set("port", config.port);
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