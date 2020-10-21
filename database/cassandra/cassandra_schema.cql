DROP KEYSPACE IF EXISTS dishes_keyspace;

CREATE KEYSPACE dishes_keyspace
WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': '1'};

USE dishes_keyspace;

CREATE TABLE restaurant_by_id (
  restaurant_id INT,
  name TEXT,
  phone TEXT,
  email TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  PRIMARY KEY(restaurant_id)
);

CREATE TABLE dishes_by_restaurant_id (
  dish_id INT,
  restaurant_id INT,
  name TEXT,
  description TEXT,
  category TEXT,
  photo TEXT,
  PRIMARY KEY (category, dish_id)
);

CREATE TABLE review_by_dish_id (
  review_id INT,
  user_id INT,
  dish_id INT,
  username TEXT,
  avatar TEXT,
  review TEXT,
  vip_status BOOLEAN,
  date DATE,
  stars DECIMAL,
  PRIMARY KEY (stars, review_id)
);
