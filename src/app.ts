"use strict";

import bodyParser from "body-parser";
import express from "express";
// import asyncHandler from "express-async-handler";
import { JSend } from "jsend-express";

import PackageJson from "../package.json";
import { getRides, getSingleRide, postRide } from "./controllers/rideController";
import requestAsyncHandler from "./utils/requestAsyncHandler";

export default () => {
    const app = express();
    const jsonParser = bodyParser.json();
    const jSend = new JSend({ name: PackageJson.name, version: PackageJson.version })

    app.use(jsonParser)
    app.use(jSend.middleware.bind(jSend))

    app.get("/health", (req, res) => res.send("Healthy"));

    app.post("/rides", requestAsyncHandler(postRide));
    app.get("/rides", requestAsyncHandler(getRides));
    app.get("/rides/:id", requestAsyncHandler(getSingleRide));

    return app;
};
