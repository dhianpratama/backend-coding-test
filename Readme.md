<h1 align="center">Xendit backend-coding-test</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://sampledocs.com" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> A coding assessment for Xendit backend interviews

### ✨ [Demo](https://xendit-backend-test.herokuapp.com/)

## Overview
This is a Node Express project with REST API to store the customer's and driver's trip. It will store the start and end location point.

## Install

```sh
npm install
```

## Usage
Development mode (using nodemon, will listen to any file changes)

```sh
npm run dev
```

Production mode
```sh
npm run start
```

## Run tests
To run unit test

```sh
npm run test
```

To run load test
```sh
npm run test:load
```
...

# REST API

The REST API to the example app is described below.

## Get All Rides
To list all rides data.

**Request:**
```json
GET /rides
Query String:
  - page (default 1)
  - limit (default 10)
Content-Type: application/json
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:53:11.064Z",
    "timestamp": 1629157991064,
    "status": "success",
    "code": 200,
    "message": "OK",
    "data": {
        "rides": [
            {
                "rideID": 1,
                "startLat": -50,
                "startLong": 20,
                "endLat": 30,
                "endLong": 60,
                "riderName": "dhian",
                "driverName": "rony",
                "driverVehicle": "Civic",
                "created": "2021-08-16 23:52:56"
            },
            {
                "rideID": 2,
                "startLat": -50,
                "startLong": 20,
                "endLat": 30,
                "endLong": 60,
                "riderName": "dhian",
                "driverName": "rony",
                "driverVehicle": "Civic",
                "created": "2021-08-16 23:52:58"
            }
        ],
        "currentPage": 1,
        "totalPage": 1,
        "limitPerPage": 10
    }
}
```
**Empty Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:52:33.746Z",
    "timestamp": 1629157953746,
    "status": "success",
    "code": 200,
    "message": "OK",
    "data": {
        "rides": [],
        "currentPage": "2",
        "totalPage": 0,
        "limitPerPage": 10
    }
}
``` 

## Get Ride by ID
To get a ride data by ID

**Request:**
```json
POST /rides/:id
```
**Successful Response:**
```json
HTTP/1.1 201 OK
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:54:51.818Z",
    "timestamp": 1629158091818,
    "status": "success",
    "code": 201,
    "message": "OK",
    "data": {
        "ride": {
            "rideID": 1,
            "startLat": -50,
            "startLong": 20,
            "endLat": 30,
            "endLong": 60,
            "riderName": "dhian",
            "driverName": "rony",
            "driverVehicle": "Civic",
            "created": "2021-08-16 23:54:51"
        }
    }
}
```
**Failed Response:**
```json
HTTP/1.1 404 Not Found
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:58:26.718Z",
    "timestamp": 1629158306718,
    "status": "fail",
    "code": 404,
    "message": "Ride not found",
    "data": {}
}
``` 

## Get All Rides
To list all rides data.

**Request:**
```json
GET /rides
Query String:
  - page (default 1)
  - limit (default 10)
Content-Type: application/json
```
**Successful Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:53:11.064Z",
    "timestamp": 1629157991064,
    "status": "success",
    "code": 200,
    "message": "OK",
    "data": {
        "rides": [
            {
                "rideID": 1,
                "startLat": -50,
                "startLong": 20,
                "endLat": 30,
                "endLong": 60,
                "riderName": "dhian",
                "driverName": "rony",
                "driverVehicle": "Civic",
                "created": "2021-08-16 23:52:56"
            },
            {
                "rideID": 2,
                "startLat": -50,
                "startLong": 20,
                "endLat": 30,
                "endLong": 60,
                "riderName": "dhian",
                "driverName": "rony",
                "driverVehicle": "Civic",
                "created": "2021-08-16 23:52:58"
            }
        ],
        "currentPage": 1,
        "totalPage": 1,
        "limitPerPage": 10
    }
}
```
**Empty Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json

{
    "program": "backend-coding-test",
    "version": "1.0.0",
    "release": "0",
    "datetime": "2021-08-16T23:52:33.746Z",
    "timestamp": 1629157953746,
    "status": "success",
    "code": 200,
    "message": "OK",
    "data": {
        "rides": [],
        "currentPage": "2",
        "totalPage": 0,
        "limitPerPage": 10
    }
}
``` 

## Author

👤 **Dhian**

* Github: [@dhianpratama](https://github.com/dhianpratama)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_