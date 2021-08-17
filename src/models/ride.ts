"use strict";

export const createRideTableSchema = `
    CREATE TABLE IF NOT EXISTS Rides
    (
      rideID INTEGER PRIMARY KEY AUTOINCREMENT,
      startLat DECIMAL NOT NULL,
      startLong DECIMAL NOT NULL,
      endLat DECIMAL NOT NULL,
      endLong DECIMAL NOT NULL,
      riderName TEXT NOT NULL,
      driverName TEXT NOT NULL,
      driverVehicle TEXT NOT NULL,
      created DATETIME default CURRENT_TIMESTAMP
    )
`;

export interface IRideRequestParams {
  startLat: number;
  startLong: number;
  endLat: number;
  endLong: number;
  riderName: string;
  driverName: string;
  driverVehicle: string;
}
