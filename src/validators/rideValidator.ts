import { IRideRequestParams } from "../models/ride";

export const validatePostRide = (rideParams: IRideRequestParams) => {
  const errors: any = {};
  if (!(rideParams.startLat >= -90 && rideParams.startLat <= 90) || !(rideParams.startLong >= -180 && rideParams.startLong <= 180)) {
    errors.start = "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively";
  }

  if (!(rideParams.endLat >= -90 && rideParams.endLat <= 90) || !(rideParams.endLong >= -180 && rideParams.endLong <= 180)) {
    errors.end = "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively";
  }

  if (typeof rideParams.riderName !== "string" || rideParams.riderName.length < 1) {
    errors.rider_name = "Rider name must be a non empty string";
  }

  if (typeof rideParams.driverName !== "string" || rideParams.driverName.length < 1) {
    errors.driver_name =  "Driver name must be a non empty string";
  }

  if (typeof rideParams.driverVehicle !== "string" || rideParams.driverVehicle.length < 1) {
    errors.driver_vehicle = "Driver vehicle must be a non empty string";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
}