import sqlite3 from "sqlite3";
import { open } from "sqlite";

let db;

const openConnection = async (filename?: string) => {
  db = await open({
    filename: filename || ":memory:",
    driver: sqlite3.Database
  });
  return db;
}

export {
  openConnection
}

export default db;
