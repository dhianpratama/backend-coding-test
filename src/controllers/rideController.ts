import { Request, Response } from "express";

import { createNewRide, getRideById, listRidesWithPagination } from "../services/rideService";

export const getRides = async (req: Request, res: Response) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;

  const rides = await listRidesWithPagination(page, limit);
  if (rides.length === 0) {
      return res.send({
          error_code: "RIDES_NOT_FOUND_ERROR",
          message: "Could not find any rides",
      });
  }

  res.send(rides);
};

export const postRide = async (req: Request, res: Response) => {
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

  const rides = await createNewRide(
    startLatitude, startLongitude, endLatitude, endLatitude, riderName, driverName, driverVehicle,
  );

  return res.send(rides);
};

export const getSingleRide = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const rides = await getRideById(id);
  if (rides.length === 0) {
    return res.send({
        error_code: "RIDES_NOT_FOUND_ERROR",
        message: "Could not find any rides",
    });
  }
  res.send(rides);
};
