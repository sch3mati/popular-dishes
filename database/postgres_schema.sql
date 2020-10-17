-- Drop is exists
DROP DATABASE IF EXISTS dishes;

-- Create
CREATE DATABASE dishes;

-- Use
\c dishes;

CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  phone VARCHAR(11),
  email VARCHAR(30),
  city VARCHAR(30),
  state VARCHAR(4),
  zip VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS dishes (
  dish_id SERIAL NOT NULL PRIMARY KEY,
  restaurant_id SERIAL REFERENCES restaurants(id),
  name VARCHAR(30) NOT NULL,
  description VARCHAR(100),
  photo VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS users (
  users_id SERIAL NOT NULL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  avatar VARCHAR(150),
  vip_status BOOLEAN
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL NOT NULL PRIMARY KEY,
  user_id SERIAL REFERENCES users(id),
  dish_id SERIAL REFERENCES dishes(id),
  review TEXT,
  date DATE,
  stars DECIMAL
);
