-- Crear las tablas
CREATE TABLE IF NOT EXISTS Category (
  category_id   INT AUTO_INCREMENT PRIMARY KEY,
  code          VARCHAR(255) UNIQUE,
  name          VARCHAR(255),
  description   VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Product (
  product_id    INT AUTO_INCREMENT PRIMARY KEY,
  code          VARCHAR(255) UNIQUE,
  name          VARCHAR(255),
  description   VARCHAR(255),
  price         FLOAT,
  category_id   INT,
  stock         INT,
  size          VARCHAR(255),
  color         VARCHAR(255),
  FOREIGN KEY (category_id) REFERENCES Category(category_id)
);

CREATE TABLE IF NOT EXISTS ShoppingCart (
  cart_id       INT AUTO_INCREMENT PRIMARY KEY,
  product_id    INT UNIQUE,
  quantity      INT,
  FOREIGN KEY (product_id) REFERENCES Product(product_id)
);

-- Insertar categorías
INSERT INTO Category (code, name, description) VALUES 
('C001', 'Electronics', 'Electronic products'),
('C002', 'Clothing', 'Clothing for all ages'),
('C003', 'Home', 'Home goods');

-- Insertar productos
INSERT INTO Product (code, name, description, price, category_id, stock, size, color) VALUES
('P001', 'Phone', 'Smartphone', 499.99, 1, 50, NULL, 'Black'),
('P002', 'TV', '55-inch LED TV', 899.99, 1, 30, NULL, 'Black'),
('P003', 'Laptop', 'Ultra-thin laptop', 1299.99, 1, 20, NULL, 'Silver'),
('P004', 'Shirt', 'Cotton shirt', 29.99, 2, 100, 'M', 'Blue'),
('P005', 'Pants', 'Jeans', 39.99, 2, 80, '32x32', 'Black'),
('P006', 'Sofa', 'Leather sofa', 699.99, 3, 10, NULL, 'Brown'),
('P007', 'Lamp', 'LED desk lamp', 19.99, 3, 50, NULL, 'White'),
('P008', 'Pot', 'Stainless steel pot', 49.99, 3, 30, NULL, 'Silver'),
('P009', 'Book', 'Bestselling novel', 14.99, 1, 100, NULL, NULL),
('P010', 'Coffee Maker', 'Drip coffee maker', 39.99, 3, 40, NULL, 'Black');
