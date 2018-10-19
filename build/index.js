"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var http = __importStar(require("http"));
var server = http.createServer(app_1.default);
server.listen(app_1.default.get("port"));
server.on("error", onError);
server.on("listening", onListening);
function onError(error) {
    console.error(error);
}
function onListening() {
    console.log("Server connected...");
}
