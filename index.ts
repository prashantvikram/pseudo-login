import app from "./app";
import * as http from "http";

const server: http.Server = http.createServer(app);
server.listen(app.get("port"));

server.on("error", onError);
server.on("listening", onListening);

function onError(error:Error): void {
  console.error(error);
}

function onListening(): void {
  console.log("Server connected...");
}