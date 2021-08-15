"use-strict";

import * as winston from "winston";

const defaultFormat = winston.format.printf((info) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const consoleTransport = () => {
  return new winston.transports.Console({
    level: process.env.NODE_ENV === "production" ? "info" : "silly",
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      defaultFormat,
    ),
  })
}

const Logger = winston.createLogger({
  level: "info",
  format: defaultFormat,
  transports: [
    consoleTransport(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default Logger;
