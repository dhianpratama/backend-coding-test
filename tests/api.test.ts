"use strict";

import * as request from "supertest";
import * as sqlite3 from "sqlite3";

import App from "../src/app";
import buildSchemas from "../src/schemas";
import * as assert from "assert";

const Sqlite3 = sqlite3.verbose();
const db = new Sqlite3.Database(":memory:");

const app = App(db);

const DUMMY_RIDE = {
  start_lat: 10,
  start_long: 20,
  end_lat: 30,
  end_long: 60,
  rider_name: "dhian",
  driver_name: "rony",
  driver_vehicle: "Civic"
};

let rideID;

describe("API tests", () => {
    before((done) => {
        db.serialize((err) => {
            if (err) {
                return done(err);
            }

            buildSchemas(db);

            done();
        });
    });

    describe("GET /health", () => {
        it("should return health", (done) => {
            request(app)
                .get("/health")
                .expect("Content-Type", /text/)
                .expect(200, done);
        });
    });

    describe("POST /rides", () => {
      it("should throw error if start_lat < -90", (done) => {
        request(app)
            .post("/rides")
            .send({
              ...DUMMY_RIDE,
              start_lat: -100
            })
            .expect("Content-Type", /json/)
            .expect(200, {
              "error_code": "VALIDATION_ERROR",
              "message": "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
      });

      it("should throw error if endLatitude > 90", (done) => {
        request(app)
            .post("/rides")
            .send({
              ...DUMMY_RIDE,
              end_lat: 110
            })
            .expect("Content-Type", /json/)
            .expect(200, {
              "error_code": "VALIDATION_ERROR",
              "message": "End latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
            }, done);
      });

      it("should throw error if rider_name is null", (done) => {
        request(app)
            .post("/rides")
            .send({
              ...DUMMY_RIDE,
              rider_name: null
            })
            .expect("Content-Type", /json/)
            .expect(200, {
              "error_code": "VALIDATION_ERROR",
              "message": "Rider name must be a non empty string"
            }, done);
      });

      it("should throw error if driver_name is null", (done) => {
        request(app)
            .post("/rides")
            .send({
              ...DUMMY_RIDE,
              driver_name: null
            })
            .expect("Content-Type", /json/)
            .expect(200, {
              "error_code": "VALIDATION_ERROR",
              "message": "Rider name must be a non empty string"
            }, done);
      });

      it("should throw error if driver_vehicle is null", (done) => {
        request(app)
            .post("/rides")
            .send({
              ...DUMMY_RIDE,
              driver_vehicle: null
            })
            .expect("Content-Type", /json/)
            .expect(200, {
              "error_code": "VALIDATION_ERROR",
              "message": "Rider name must be a non empty string"
            }, done);
      });

      it("should return success if all data is correct", (done) => {
          request(app)
              .post("/rides")
              .send(DUMMY_RIDE)
              .expect("Content-Type", /json/)
              .then((response) => {
                const ride = response.body[0];
                rideID = ride.rideID;
                assert.equal(ride.riderName, DUMMY_RIDE.rider_name);
                done();
              })
              .catch((err) => done(err));
      });
    });

    describe("GET /rides", () => {
      it("should return list of rides", (done) => {
          request(app)
              .get("/rides")
              .expect("Content-Type", /json/)
              .then((response) => {
                const ride = response.body[0];
                assert.equal(ride.riderName, DUMMY_RIDE.rider_name);
                done();
              })
              .catch((err) => done(err));
      });
    });

    describe("GET /rides/:id", () => {
      it("should return ride object", (done) => {
          request(app)
              .get(`/rides/${rideID}`)
              .expect("Content-Type", /json/)
              .then((response) => {
                const ride = response.body[0];
                assert.equal(ride.riderName, DUMMY_RIDE.rider_name);
                done();
              })
              .catch((err) => done(err));
      });
    });

});