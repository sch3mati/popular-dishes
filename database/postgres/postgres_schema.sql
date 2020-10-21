-- Drop is exists
DROP DATABASE IF EXISTS dishes;

-- Create
CREATE DATABASE dishes;

-- Use
\c dishes;

CREATE TABLE IF NOT EXISTS restaurants (
  restaurant_id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  phone VARCHAR(12),
  email VARCHAR(50),
  city VARCHAR(30),
  state VARCHAR(4),
  zip VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS dishes (
  dish_id SERIAL NOT NULL PRIMARY KEY,
  restaurant_id SERIAL REFERENCES restaurants(restaurant_id),
  name VARCHAR(100) NOT NULL,
  description VARCHAR(100),
  photo VARCHAR(200)
);

CREATE TABLE IF NOT EXISTS reviews (
  review_id SERIAL NOT NULL PRIMARY KEY,
  dish_id SERIAL REFERENCES dishes(dish_id),
  user_id BIGINT,
  username VARCHAR(100),
  avatar VARCHAR(255),
  vip_status BOOLEAN,
  review TEXT,
  date DATE,
  stars DECIMAL
);

COPY restaurants(name, phone, email, city, state, zip) FROM '/Users/billysmac/Documents/Hack_Reactor/SEI/SDC/popular-dishes-service/database/postgres/data-storage/restaurants_records.csv' CSV header;

COPY dishes(restaurant_id, name, description, photo) FROM '/Users/billysmac/Documents/Hack_Reactor/SEI/SDC/popular-dishes-service/database/postgres/data-storage/dishes_records.csv' CSV header;

COPY reviews(dish_id, user_id, username, avatar, vip_status, review, date, stars) FROM '/Users/billysmac/Documents/Hack_Reactor/SEI/SDC/popular-dishes-service/database/postgres/data-storage/reviews_records.csv' CSV header;
