# Project Name
TKOut, popular-dishes service module

Full stack module for displaying popular dishes of the restaurant

## Related Projects

  - Photo-Gallery Service, Chris Sorta: https://github.com/sch3mati/photos-carousel-service
  - Bookings Service, Victoria Chen: https://github.com/sch3mati/bookings-service
  - Reviews Service, Mike Juli: __________

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## CRUD Operations

All CRUD operations will operate with the endpoint: ‘/api/restaurants/:restaurantId/dishes’, where id is the uniqure identifier for specified restaurant.

> Create a new popular dish
  - POST /api/restaurants/:restaurantId/dishes
  - Parameters:

> Create a new restaurant
  - POST /restaurants

> Read / GET - read a popular dish
  - Resource Path: ‘/api/restaurants/:restaurantId/dishes’
  - Parameters: id, string
  - Response will be an object representing a restaurant unique to the id entered. Inside the restaurant object, it will contain the properties "restaurant_id" and
      "dishes". "dishes" will be an array of of objects. Each object represents a popular dish for a specific restaurant. Inside each dish object, there will live
      the properties: data types: "name": String, "mentions": Number, "description": String, "reviews": Array". Inside the "reviews" array is a review object containing
      the following properties: data types: user_id: Number, "review_id": Number, "username": String, "stars": Number, "dined_on": String(date), "review": String.

> Update / PUT - update a popular dish
  -

> Delete / DELETE - delete a popular dish
  -

## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```