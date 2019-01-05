CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price INT NULL,
  stock_quantity INT NULL
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "clothing", 2.99, 457);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("candle", "home decor", 5.99, 1947);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pac-Man Game", "digital media", 29.89, 287);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("coffee", "food", 8.99, 897);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("computer", "electronics", 897.99, 309);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("t-shirt", "clothing", 10.99, 89);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("light bulb", "home appliance", 2.87, 789);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("book", "education", 15.97, 578);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog food", "pet care", 50.89, 480);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("beer", "drinks", 12.99, 847);