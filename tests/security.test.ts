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

describe("Security Test tests", () => {
    before(async () => {
        db = await init();
        app = App({ disabledRateLimiter: false });
    });

    describe("SQL Injection", () => {
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

    describe("Verify Response Headers", () => {
      it("should have proper response headers", (done) => {
        request(app)
          .get(`/rides`)
          .expect("Content-Type", /json/)
          .then((response) => {
            const headers = response.headers;
            expect(headers).to.not.have.property("x-powered-by")
            expect(headers["x-content-type-options"]).equal("nosniff");
            expect(headers["x-permitted-cross-domain-policies"]).equal("none");
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe("Rate Limiter", () => {
      it("it should get block if there are more than 10 requests per second", (done) => {
        const promises = Array.from(Array(15).keys()).map((val, i) => {
          return new Promise((resolve, reject) => {
            request(app)
              .get("/rides")
              .then(resolve);
          });
        });

        Promise.all(promises)
          .then((responses) => {
            let hasError = false;
            responses.forEach((res: any) => {
              if (res.statusCode === 500) hasError = true;
            });
            expect(hasError).equal(true);
            done()
          })
          .catch((err) => done(err));
      });
    });

});
