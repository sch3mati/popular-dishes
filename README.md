# Project Name
TKOut, popular-dishes service module

Full stack module for displaying popular dishes of the restaurant

## Related Projects

  - Photo-Gallery Service, Chris Sorta: https://github.com/sch3mati/photos-carousel-service
  - Bookings Service, Victoria Chen: https://github.com/sch3mati/bookings-service
  - Reviews Service, Mike Juli: https://github.com/sch3mati/service-reviews/tree/master

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

--------------------------------------------
## CRUD Operations

All CRUD operations will operate with the endpoint: ‘/api/restaurants/:restaurantId/dishes’, where id is the uniqure identifier for specified restaurant.


> Read all popular dishes from a restaurant -----------------------------------------------------------------------------
  - GET /api/restaurants/:restaurantId/dishes
  - Path Parameters:
      - restaurantId: restaurant id
  - Status Codes :
      - Success: 200
      - Error: 400

  - ---------Returns JSON ------------
  - {
    "restaurant_id": Number,
    "name": String,
    "phone": String,
    "email": String,
    "city": String,
    "state": String,
    "zip": String,
    "dishes": Array [
     - {
        "dish_id": Number,
        "name": String,
        "category": String,
        "description": String,
        "reviews": Array [
            "user_id": Number,
            "review_id": Number,
            "username": String,
            "stars": Number,
            "dined_on": String(date),
            "review": String
        ]
      }
      {...}
    ]
  }

> Create a new popular dish ----------------------------------------------------------------------------------------------
  - POST /api/restaurants/:restaurantId/dishes
  - Creates and new popular dish which can include information on the dish
  - Status Codes:
      - Success: 201
      - Error: 401

  - --------REQUEST BODY: Expects JSON with the following keys----------
  - "id" - Number, the restaurant's unique ID to add a new popular dish within
  - "dishes": Object. The popular dish to create {
      "dish_id": Number, new popular dish id
      "restaurant_id": Number, represents which restaurant the dish is associated with, same id as restaurant id
  -   "name": String, name of the dish to add to restaurant,
      "cateogry": String, category of the dish
  -   "description": String, describing some details of the dish
  -   "photo": String, a url to the photo associated with the popular dish
    }

  - ------RESPONSE Field : Success Code 201, or Error 401

> Update a restaurant's popular dish info -----------------------------------------------------------------------------------
  - PATCH /api/restaurants/:restaurantId/dishes/:dishId
  - Path parameters:
      - restaurantId: restaurant id,
      - dishId: dish id,
  - Status Codes:
      - Success: 204
      - Error: 404

  - ------REQUEST BODY: Expects JSON with any of the following keys including only the keys to be updated--------
  leave out reviews
  - {
      {
        "dish_id": Number,
        "name": String,
        "category": String,
        "description": String,
        "photo": String,
      }
  }

- ---RESPONSE FIELD: Success Code 204, or Error 404



> Delete / DELETE - delete a popular dish ------------------------------------------------------------------------------------
  - DELETE /api/restaurants/:restaurantId/dishes/:dishId
  - Remove a specific dish from a restaurant's collection of popular dishes
  Path parameters:
    - restaurantId: restaurant id,
    - dishId: dish id
  Status Codes :
    - Success: 204,
    - Error: 404

  Response Field: Success Status Code 204, Error 404


-------------------------------------------
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