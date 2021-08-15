"use strict";

import request from "supertest";
import assert from "assert";

import App from "../src/app";
import { openConnection } from "../src/utils/sqliteAsync";
import buildSchemas from "../src/schemas";


let db;
let app;

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
    before(async () => {
        db = await openConnection();
        buildSchemas(db);
        app = App(db);
    });

    describe("COMMON TEST", () => {
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


    describe("PAGINATION TEST", () => {
      before((done) => {
        const promises = Array.from(Array(15).keys()).map((val, i) => {
          const data = Object.keys(DUMMY_RIDE).reduce((newRide, key) => {
            newRide[key] = DUMMY_RIDE[key] + i;
            return newRide;
          }, {});

          return new Promise((resolve) => {
            request(app)
              .post("/rides")
              .send(data)
              .then(resolve);
          });
        });

        Promise.all(promises).then(() => done());
      });

      describe("GET /rides", () => {
        it("should return max 10 items if limit and page are not given", (done) => {
            request(app)
                .get("/rides")
                .expect("Content-Type", /json/)
                .then((response) => {
                  assert.equal(response.body.length, 10);
                  done();
                })
                .catch((err) => done(err));
        });

        it("should return 6 items if page 2 is given", (done) => {
          request(app)
              .get("/rides?page=2")
              .expect("Content-Type", /json/)
              .then((response) => {
                assert.equal(response.body.length, 6);
                done();
              })
              .catch((err) => done(err));
        });
      });


    });

});