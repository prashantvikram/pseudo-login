"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var joi = __importStar(require("joi"));
var envVar = dotenv.config();
if (envVar.error) {
    throw envVar.error;
}
var envVarSchema = joi.object().keys({
    NODE_ENV: joi.string()
        .valid(["development", "production", "test"])
        .required(),
    PORT: joi.number()
        .required(),
    LOGGER_LEVEL: joi.string()
        .valid(["error", "warn", "info", "verbose", "debug", "silly"])
        .default("info"),
    MONGO_URL: joi.string()
        .required(),
    SESSION_SECRET: joi.string()
        .required(),
});
var _a = joi.validate(envVar.parsed, envVarSchema), error = _a.error, envVarParsed = _a.value;
if (error) {
    throw new Error("Config validation error: " + error.message);
}
exports.config = {
    port: envVarParsed.PORT,
    dev: envVarParsed.NODE_ENV,
    level: envVarParsed.LOGGER_LEVEL,
    mongoUrl: envVarParsed.MONGO_URL,
    sessionSecret: envVarParsed.SESSION_SECRET
};
