import { getDb } from "../models";

export const listRidesWithPagination = async (page: number, limit: number) => {
  const db = await getDb();
  const skip = (page - 1) * limit;
  const rides = await db.all(`SELECT * FROM Rides  ORDER BY riderName LIMIT ${limit} OFFSET ${skip}`, []);
  return rides;
};

export const createNewRide = async (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) => {
  const db = await getDb();
  const values = [
    startLat,
    startLong,
    endLat,
    endLong,
    riderName,
    driverName,
    driverVehicle,
  ];
  const result = await db.run(
    `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    values
  );
  const rides = await db.all("SELECT * FROM Rides WHERE rideID = ?", result.lastID);
  return rides;
};

export const getRideById = async (id: number) => {
  const db = await getDb();
  const rides = await db.all(`SELECT * FROM Rides WHERE rideID='${id}'`, []);
  return rides;
};
