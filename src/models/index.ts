import sqlite3 from "sqlite3";
import { open } from "sqlite";

import config from "../config";
import createRideTableSchema from "./ride";

let db;

export const init = async (filename?: string) => {
  db = await open({
    filename: filename || config.dbFileName,
    driver: sqlite3.Database
  });
  await buildSchema();
  return db;
}

export const buildSchema = async () => {
  await db.run(createRideTableSchema);
};

export const getDb = async () => {
  if (!db) return init();
  return db;
}

export default db;
