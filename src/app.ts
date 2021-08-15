"use strict";

import bodyParser from "body-parser";
import express from "express";
import asyncHandler from "express-async-handler"

const app = express();
const jsonParser = bodyParser.json();

export default (db) => {
    app.get("/health", asyncHandler(async (req, res) => res.send("Healthy")));

    app.post(`/rides`, jsonParser, asyncHandler(async (req, res) => {
        const startLatitude = Number(req.body.start_lat);
        const startLongitude = Number(req.body.start_long);
        const endLatitude = Number(req.body.end_lat);
        const endLongitude = Number(req.body.end_long);
        const riderName = req.body.rider_name;
        const driverName = req.body.driver_name;
        const driverVehicle = req.body.driver_vehicle;

        if (startLatitude < -90 || startLatitude > 90 || startLongitude < -180 || startLongitude > 180) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
            });
        }

        if (endLatitude < -90 || endLatitude > 90 || endLongitude < -180 || endLongitude > 180) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively",
            });
        }

        if (typeof riderName !== "string" || riderName.length < 1) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }

        if (typeof driverName !== "string" || driverName.length < 1) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }

        if (typeof driverVehicle !== "string" || driverVehicle.length < 1) {
            return res.send({
                error_code: "VALIDATION_ERROR",
                message: "Rider name must be a non empty string",
            });
        }

        const values = [
          req.body.start_lat,
          req.body.start_long,
          req.body.end_lat,
          req.body.end_long,
          req.body.rider_name,
          req.body.driver_name,
          req.body.driver_vehicle,
        ];

        const result = await db.run(
          `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          values
        );

        const rides = await db.all("SELECT * FROM Rides WHERE rideID = ?", result.lastID);

        res.send(rides);
    }));

    app.get("/rides", asyncHandler(async (req, res) => {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page - 1) * limit;

        const rows = await db.all(`SELECT * FROM Rides  ORDER BY riderName LIMIT ${limit} OFFSET ${skip}`, []);
        if (rows.length === 0) {
            return res.send({
                error_code: "RIDES_NOT_FOUND_ERROR",
                message: "Could not find any rides",
            });
        }

        res.send(rows);
    }));

    app.get("/rides/:id", asyncHandler(async (req, res) => {
        const rows = await db.all(`SELECT * FROM Rides WHERE rideID='${req.params.id}'`, []);
        if (rows.length === 0) {
            return res.send({
                error_code: "RIDES_NOT_FOUND_ERROR",
                message: "Could not find any rides",
            });
        }

        res.send(rows);
    }));

    return app;
};
