import { getDb } from "../models";
import { IRideRequestParams } from "../models/ride";

export const listRidesWithPagination = async (page: number, limit: number) => {
  const db = await getDb();
  const skip = (page - 1) * limit;
  const totalData = await db.all("SELECT COUNT(*) as total FROM Rides");
  const total = totalData[0].total;
  const totalPage = Math.ceil(total / limit);
  const rides = await db.all(`SELECT * FROM Rides  ORDER BY riderName LIMIT ? OFFSET ?`, [limit, skip]);
  return { rides, currentPage: page, totalPage, limitPerPage: limit };
};

export const createNewRide = async (rideParams: IRideRequestParams) => {
  const db = await getDb();
  const values = [
    rideParams.startLat,
    rideParams.startLong,
    rideParams.endLat,
    rideParams.endLong,
    rideParams.riderName,
    rideParams.driverName,
    rideParams.driverVehicle,
  ];
  const result = await db.run(
    `INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    values,
  );
  const rides = await db.all("SELECT * FROM Rides WHERE rideID = ?", result.lastID);
  return rides[0];
};

export const getRideById = async (id: number) => {
  const db = await getDb();
  const rides = await db.all(`SELECT * FROM Rides WHERE rideID=?`, [id]);
  return (rides && rides.length > 0) ? rides[0] : null;
};
