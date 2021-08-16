import { Request, Response } from "express";
import httpStatus from "http-status";

import { validatePostRide } from "../validators/rideValidator";

import { createNewRide, getRideById, listRidesWithPagination } from "../services/rideService";

export const getRides = async (req: Request, res: Response) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const data = await listRidesWithPagination(page, limit);
  res.success({ data });
};

export const postRide = async (req: Request, res: Response) => {
  const rideParams = {
    startLat: Number(req.body.start_lat),
    startLong: Number(req.body.start_long),
    endLat: Number(req.body.end_lat),
    endLong: Number(req.body.end_long),
    riderName: req.body.rider_name,
    driverName: req.body.driver_name,
    driverVehicle: req.body.driver_vehicle,
  }

  const { isValid, errors } = validatePostRide(rideParams);

  if (!isValid) {
    return res.fail({
      error: {
        errors
      }
    });
  }

  const ride = await createNewRide(rideParams);

  const data = { ride };
  return res.success({ data });
};

export const getSingleRide = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const ride = await getRideById(id);
  if (!ride) {
    return res.fail({
      status: httpStatus.NOT_FOUND,
      error: {
        message: "Ride not found"
      }
    });
  }

  const data = { ride };
  res.success({ data });
};
