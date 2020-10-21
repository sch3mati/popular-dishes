DROP KEYSPACE IF EXISTS dishes_keyspace;

CREATE KEYSPACE dishes_keyspace
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE dishes_keyspace;

CREATE TABLE restaurant_by_id (
  restaurant_id UUID,
  name VARCHAR,
  phone VARCHAR,
  email VARCHAR,
  city VARCHAR,
  state VARCHAR,
  zip VARCHAR,
  PRIMARY KEY(restaurant_id)
);

CREATE TABLE dishes_by_restaurant_id (
  dish_id UUID,
  restaurant_id UUID,
  name VARCHAR,
  description VARCHAR,
  category VARCHAR,
  photo VARCHAR,
  PRIMARY KEY (category, dish_id)
);

CREATE TABLE review_by_dish_id (
  review_id UUID,
  user_id UUID,
  dish_id UUID,
  username VARCHAR,
  review TEXT,
  date DATE,
  stars TINYINT,
  PRIMARY KEY (stars, review_id)
);
