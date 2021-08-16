import { open } from "sqlite";
import sqlite3 from "sqlite3";

import config from "../config";
import createRideTableSchema from "./ride";

let db;

export const init = async (filename?: string) => {
  db = await open({
    driver: sqlite3.Database,
    filename: filename || config.dbFileName,
  });
  await buildSchema();
  return db;
};

export const buildSchema = async () => {
  await db.run(createRideTableSchema);
};

export const getDb = async () => {
  if (!db) { return init(); }
  return db;
};

export default db;
