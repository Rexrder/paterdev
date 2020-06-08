DROP DATABASE paternoster;
CREATE DATABASE paternoster;

use paternoster;

-- Create the table in the specified schema
CREATE TABLE product
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(50) UNIQUE NOT NULL,
    quantity SMALLINT(50) UNSIGNED NOT NULL DEFAULT '0',
    cost_unit DECIMAL(10,2) UNSIGNED,
    drawer SMALLINT(10),
    sep SMALLINT(10)
);

INSERT INTO product (p_name, cost_unit) VALUES ('74HC595', 0.09);
