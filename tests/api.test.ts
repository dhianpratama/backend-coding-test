"use strict";

import * as request from "supertest";
import * as sqlite3 from "sqlite3";

import App from "../src/app";
import buildSchemas from "../src/schemas";

const Sqlite3 = sqlite3.verbose();
const db = new Sqlite3.Database(":memory:");

const app = App(db);

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
});