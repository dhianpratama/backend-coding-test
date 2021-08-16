"use-strict";

import * as winston from "winston";

const defaultFormat = winston.format.printf((info) => {
  return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const consoleTransport = () => {
  return new winston.transports.Console({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.colorize(),
      defaultFormat,
    ),
    level: process.env.NODE_ENV === "production" ? "info" : "silly",
  });
};

const Logger = winston.createLogger({
  format: defaultFormat,
  level: "info",
  transports: [
    consoleTransport(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default Logger;
