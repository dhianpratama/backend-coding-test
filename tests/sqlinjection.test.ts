"use strict";

import request from "supertest";
import assert from "assert";

import App from "../src/app";
import { init } from "../src/models";


let db;
let app;


describe("SQL Injection tests", () => {
    before(async () => {
        db = await init();
        app = App();
    });

    it("should return 200 when there is a script attached to the url", (done) => {
      request(app)
        .get(`/rides/1 || DROP TABLE Rides;`)
        .expect("Content-Type", /json/)
        .expect(200, done)
  });

});