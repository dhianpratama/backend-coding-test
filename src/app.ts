"use strict";

import bodyParser from "body-parser";
import express from "express";
import asyncHandler from "express-async-handler";

import { getRides, getSingleRide, postRide } from "./controllers/rideController";

const app = express();
const jsonParser = bodyParser.json();

export default () => {
    app.get("/health", asyncHandler(async (req, res) => res.send("Healthy")));
    app.post(`/rides`, jsonParser, asyncHandler(postRide));
    app.get("/rides", asyncHandler(getRides));
    app.get("/rides/:id", asyncHandler(getSingleRide));

    return app;
};
