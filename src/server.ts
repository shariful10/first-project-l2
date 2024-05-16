import app from "./app";
import { Server } from "http";
import mongoose from "mongoose";
import config from "./app/config";

let server: Server;

const main = async () => {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(`App is listening on port: ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

main();

process.on("unhandledRejection", () => {
  console.log(`👺 unhandledRejection is detected! Shutting down.`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`👺 uncaughtException is detected! Shutting down.`);
  process.exit(1);
});
