"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_root_path_1 = __importDefault(require("app-root-path"));
var winston_1 = require("winston");
var env_config_1 = require("./env-config");
var logger = winston_1.createLogger({
    transports: [
        new winston_1.transports.File({
            level: env_config_1.config.level,
            filename: app_root_path_1.default + "/logs/app.log",
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
        new winston_1.transports.Console({
            level: "debug",
            handleExceptions: true,
        })
    ],
    exitOnError: false,
});
exports.default = logger;
