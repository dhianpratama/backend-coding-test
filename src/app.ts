"use strict";

import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import { JSend } from "jsend-express";
import { RateLimiterMemory } from "rate-limiter-flexible";

import PackageJson from "../package.json";
import config from "./config";
import { getRides, getSingleRide, postRide } from "./controllers/rideController";
import { rateLimiterMiddleware } from "./utils/rateLimiterMiddleware";
import requestAsyncHandler from "./utils/requestAsyncHandler";

interface IAppOptions {
  disabledRateLimiter?: boolean;
}

export default (options: IAppOptions = {}) => {
    const app = express();
    const jsonParser = bodyParser.json();
    const jSend = new JSend({ name: PackageJson.name, version: PackageJson.version })

    app.use(helmet())
    app.use(jsonParser)
    app.use(jSend.middleware.bind(jSend))

    if (!options.disabledRateLimiter) {
      app.use(rateLimiterMiddleware);
    }

    const rateLimiter = new RateLimiterMemory({
      points: 6,
      duration: 1,
    });

    app.get("/health", (req, res) => res.send("Healthy"));

    app.post("/rides", requestAsyncHandler(postRide));
    app.get("/rides", requestAsyncHandler(getRides));
    app.get("/rides/:id", requestAsyncHandler(getSingleRide));

    return app;
};
