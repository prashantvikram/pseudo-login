import appRoot from "app-root-path";
import { createLogger, Logger, transports, LogMethod } from "winston";
import { config } from "./env-config";

let logger: Logger = createLogger({
  transports: [
    new transports.File({
      level: config.level,
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new transports.Console({
      level: "debug",
      handleExceptions: true,
    })
  ],
  exitOnError: false, // do not exit on handled exceptions
});

export default logger;