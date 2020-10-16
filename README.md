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
        "mentions": Number,
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
  - id - Number, the restaurant's unique ID to add a new popular dish within
  - dishes: Object. The popular dish to create {
      dish_id: Number, new popular dish id
      restaurant_id: Number, represents which restaurant the dish is associated with, same id as restaurant id
  -   name: String, name of the dish to add to restaurant
  -   description: String, describing some details of the dish
  -   photo: String, a url to the photo associated with the popular dish
  -   reviews - Array [
              review_id: Number, the Review ID associated with the dishes review being created
              user_id: Number, the User ID associated with the dish's review being created
              username: String,  Display Name associated with the user's sch3mati account
              stars: Decimal Number, a star rating scale value representing how much the user enjoyed the dish being posted
              date: String, date associated with the user and when they consumed the dish
              review: String, represents what they enjoyed about the dish and why
              vip_status: Boolean, whether or not the user is a VIP user
          ]
  }

  - ---------RESPONSE JSON----------
  - {
 "id": 35,
  "dishes": [
   {
     dish_id: 7,
     restaurant_id: 35
     name: "Chicken Pot Pie",
     description: "mashed potatoes, broccolini, mint jelly",
     photo: "http://potpie.com/potpie.png",
     reviews: [
       {
         review_id: 5,
         user_id: 8,
         username: "OpenTableDiner",
         stars: 4.2,
         date: "November 17, 2019",
         review: "Love the ambiance, service, lighting, food (of course, fried chicken was superb) and Dimitri manages to   always greet his guests as if they were family,   which is so rare in this town",
         vip_status: true
       }
     ]
   },
   {...}
  ]
}

> Update a restaurant's popular dish info -----------------------------------------------------------------------------------
  - PATCH /api/restaurants/:restaurantId/dishes/:dishId
  - Path parameters:
      - restaurantId: restaurant id,
      - dishId: dish id,
  - Status Codes:
      - Success: 204
      - Error: 404

  - ------REQUEST BODY: Expects JSON with any of the following keys including only the keys to be updated--------
  - {
    "dishes": [
      {
        "dish_id": Number,
        "name": String,
        "description": String,
        "photo": String,
        "reviews": Array [
            "review_id": Number,
            "user_id": Number,
            "username": String,
            "stars": Decimal Number,
            "date": String(date),
            "review": String,
            "vip_status": Boolean
        ]
      }
    ]
  }

- -----RESPONSE FIELD ---------
- The updated popular dish object

> Delete / DELETE - delete a popular dish ------------------------------------------------------------------------------------
  - DELETE /api/restaurants/:restaurantId/dishes/:dishId
  - Remove a specific dish from a restaurant's collection of popular dishes
  Path parameters:
    - restaurantId: restaurant id,
    - dishId: dish id
  Status Codes :
    - Success: 204,
    - Error: 404

  Response Field: Success Status Code


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