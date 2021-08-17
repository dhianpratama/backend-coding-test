"use strict";


// tslint:disable: no-implicit-dependencies
import request from "supertest";
import chai from "chai";

import App from "../src/app";
import { init } from "../src/models";
import httpStatus from "http-status";

const expect = chai.expect;

let db;
let app;

describe("SQL Injection tests", () => {
    before(async () => {
        db = await init();
        app = App();
    });

    it("should not return unhandled error (500) when there is a script attached to the url", (done) => {
      request(app)
        .get(`/rides/1 || DROP TABLE Rides;`)
        .expect("Content-Type", /json/)
        .then((response) => {
          const responseData = response.body;
          expect(responseData.code).not.equal(httpStatus.BAD_GATEWAY);
          done();
        })
        .catch((err) => done(err));
  });

});
