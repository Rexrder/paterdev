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

CREATE TABLE user
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    lastlog TIMESTAMP
);


CREATE TABLE request
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    prod VARCHAR(50) NOT NULL,
    CONSTRAINT `fk_prod`
        FOREIGN KEY (prod) REFERENCES product(p_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    user VARCHAR(50) NOT NULL,
    CONSTRAINT `fk_user`
        FOREIGN KEY (user) REFERENCES user(username)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    dat TIMESTAMP
);

CREATE TABLE drawsep
(
    drawer SMALLINT(10) NOT NULL,
    sep SMALLINT(10) NOT NULL,
    PRIMARY KEY (sep, drawer)
);

CREATE TABLE prod_drawer
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    prod VARCHAR(50) NOT NULL,
    CONSTRAINT `fk_prodrawer`
        FOREIGN KEY (prod) REFERENCES product(p_name)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    drawer SMALLINT(10) NOT NULL,
    CONSTRAINT `fk_drawer`
        FOREIGN KEY (drawer) REFERENCES drawsep(drawer)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    sep SMALLINT(10) NOT NULL,
    CONSTRAINT `fk_sep`
        FOREIGN KEY (sep) REFERENCES drawsep(sep)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);