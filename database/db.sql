DROP DATABASE paternoster;
CREATE DATABASE paternoster;

use paternoster;

-- Create the table in the specified schema
CREATE TABLE product
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    p_name VARCHAR(50) UNIQUE NOT NULL,
    quantity SMALLINT(50) UNSIGNED NOT NULL DEFAULT '0',
    cost_unit DECIMAL(10,2) UNSIGNED
);

CREATE TABLE user
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(60) NOT NULL,
    admin TINYINT(1) DEFAULT 0,
    lastlog TIMESTAMP
);

CREATE TABLE request
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    prod INT(6) UNSIGNED NOT NULL,
    CONSTRAINT `fk_prod`
        FOREIGN KEY (prod) REFERENCES product(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    user INT(6) UNSIGNED NOT NULL,
    CONSTRAINT `fk_user`
        FOREIGN KEY (user) REFERENCES user(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    quantity SMALLINT(50) NOT NULL,
    reqtype TINYINT(1) DEFAULT 0,
    dat TIMESTAMP NOT NULL DEFAULT current_timestamp
);

CREATE TABLE drawsep
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    drawer SMALLINT(10) NOT NULL,
    sep SMALLINT(10) NOT NULL,
    part SMALLINT(10) NOT NULL,
    UNIQUE (drawer, sep, part)
);

CREATE TABLE prod_drawer
(
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    idprod INT(6) UNSIGNED NOT NULL,
    iddraw INT(6) UNSIGNED NOT NULL,
    CONSTRAINT `fk_prodraw`
        FOREIGN KEY (idprod) REFERENCES product(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT `fk_drawer`
        FOREIGN KEY (iddraw) REFERENCES drawsep(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DELIMITER //

CREATE PROCEDURE createSeparators()
BEGIN
    SET @count0 = 0;
    SET @count1 = 0;
    WHILE @count0<= 15 DO
    WHILE @count1<= 2 DO
        INSERT INTO drawsep(drawer,sep,part) VALUES(@count0, @count1, 0);
        SET @count1 = @count1 + 1;
    END WHILE;
   SET @count0 = @count0 + 1;
   SET @count1 = 0;
    END WHILE;
END;
//
DELIMITER ;