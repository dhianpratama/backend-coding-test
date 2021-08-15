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

### ✨ [Demo](https://sample.com)

## Overview
This is a Node Express project with REST API to store the customer's and driver's trip. It will store the start and end location point.

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
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
200 OK
Content-Type: application/json

[
    {
        "rideID": 1,
        "startLat": 10,
        "startLong": 20,
        "endLat": 30,
        "endLong": 60,
        "riderName": "dhian",
        "driverName": "rony",
        "driverVehicle": "Civic",
        "created": "2021-08-15 16:12:31"
    }
]
```
**Empty Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "error_code": "RIDES_NOT_FOUND_ERROR",
    "message": "Could not find any rides"
}
``` 

## Save a Ride
To save a ride data, start and end location point, and also driver data.

**Request:**
```json
POST /rides
Content-Type: application/json

{
    "start_lat": 10,
    "start_long": 20,
    "end_lat": 30,
    "end_long": 60,
    "rider_name": "dhian",
    "driver_name": "rony",
    "driver_vehicle": "Civic"
}
```
**Successful Response:**
```json
200 OK
Content-Type: application/json

[
    {
        "rideID": 1,
        "startLat": 10,
        "startLong": 20,
        "endLat": 30,
        "endLong": 60,
        "riderName": "dhian",
        "driverName": "rony",
        "driverVehicle": "Civic",
        "created": "2021-08-15 16:12:31"
    }
]
```
**Failed Response:**
```json
HTTP/1.1 200 OK
Server: My RESTful API
Content-Type: application/json
Content-Length: xy

{
    "error_code": "VALIDATION_ERROR",
    "message": "Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively"
}
``` 

## Author

👤 **Dhian**

* Github: [@dhianpratama](https://github.com/dhianpratama)

## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_