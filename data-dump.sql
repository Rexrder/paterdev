-- MariaDB dump 10.19  Distrib 10.5.10-MariaDB, for debian-linux-gnu (aarch64)
--
-- Host: localhost    Database: paternoster
-- ------------------------------------------------------
-- Server version	10.5.10-MariaDB-1:10.5.10+maria~focal

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `drawsep`
--

DROP TABLE IF EXISTS `drawsep`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `drawsep` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `drawer` smallint(10) NOT NULL,
  `sep` smallint(10) NOT NULL,
  `part` smallint(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `drawer` (`drawer`,`sep`,`part`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `drawsep`
--

LOCK TABLES `drawsep` WRITE;
/*!40000 ALTER TABLE `drawsep` DISABLE KEYS */;
INSERT INTO `drawsep` VALUES (2,0,0,0),(3,0,1,0),(4,0,2,0),(5,1,0,0),(6,1,1,0),(7,1,2,0),(8,2,0,0),(9,2,1,0),(10,2,2,0),(11,3,0,0),(12,3,1,0),(13,3,2,0),(14,4,0,0),(15,4,1,0),(16,4,2,0),(17,5,0,0),(18,5,1,0),(19,5,2,0),(20,6,0,0),(21,6,1,0),(22,6,2,0),(23,7,0,0),(24,7,1,0),(25,7,2,0),(26,8,0,0),(27,8,1,0),(28,8,2,0),(29,9,0,0),(30,9,1,0),(31,9,2,0),(32,10,0,0),(33,10,1,0),(34,10,2,0),(35,11,0,0),(36,11,1,0),(37,11,2,0),(38,12,0,0),(39,12,1,0),(40,12,2,0),(41,13,0,0),(42,13,1,0),(43,13,2,0),(44,14,0,0),(45,14,1,0),(46,14,2,0),(47,15,0,0),(48,15,1,0),(49,15,2,0);
/*!40000 ALTER TABLE `drawsep` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prod_drawer`
--

DROP TABLE IF EXISTS `prod_drawer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prod_drawer` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `idprod` int(6) unsigned NOT NULL,
  `iddraw` int(6) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_prodraw` (`idprod`),
  KEY `fk_drawer` (`iddraw`),
  CONSTRAINT `fk_drawer` FOREIGN KEY (`iddraw`) REFERENCES `drawsep` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_prodraw` FOREIGN KEY (`idprod`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prod_drawer`
--

LOCK TABLES `prod_drawer` WRITE;
/*!40000 ALTER TABLE `prod_drawer` DISABLE KEYS */;
INSERT INTO `prod_drawer` VALUES (8,32,2),(9,33,8),(10,34,23),(11,35,38),(12,36,32);
/*!40000 ALTER TABLE `prod_drawer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `p_name` varchar(50) NOT NULL,
  `quantity` smallint(50) unsigned NOT NULL DEFAULT 0,
  `cost_unit` decimal(10,2) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `p_name` (`p_name`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (32,'LED3mm',120,0.10),(33,'MW232',25,0.10),(34,'555',39,0.20),(35,'595',67,0.34),(36,'Arduinos',10,7.00);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `request` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `prod` int(6) unsigned NOT NULL,
  `user` int(6) unsigned NOT NULL,
  `quantity` smallint(50) NOT NULL,
  `reqtype` tinyint(1) DEFAULT 0,
  `dat` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `fk_prod` (`prod`),
  KEY `fk_user` (`user`),
  CONSTRAINT `fk_prod` FOREIGN KEY (`prod`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=116 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
INSERT INTO `request` VALUES (103,32,4,12,1,'2021-04-19 23:59:42'),(104,32,4,12,1,'2021-04-20 00:02:29'),(105,34,4,13,1,'2021-04-20 00:03:32'),(106,32,4,12,1,'2021-04-20 00:03:42'),(107,34,4,10,0,'2021-04-20 00:03:56'),(108,35,4,12,0,'2021-04-20 00:04:08'),(109,34,4,24,1,'2021-04-20 00:04:17'),(110,36,4,2,0,'2021-04-20 00:26:42'),(111,35,4,12,1,'2021-04-20 00:28:55'),(112,35,4,35,1,'2021-04-20 01:51:12'),(113,36,4,2,1,'2021-04-20 01:52:07'),(114,35,4,10,0,'2021-04-20 01:53:46'),(115,32,4,34,1,'2021-04-20 01:56:13');
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('BiiePZTz2iquZPiEUqMx1HA2NxiKhpGC',1623636581,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `lastlog` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'ChristianGarcia','$2a$10$UXfS4v7TRJaGY90cFl10KuxOEKn1/XfqtJoXd9I7oRm2oeknKDta6',1,'2021-03-31 03:38:13'),(5,'Rexrder','$2a$10$IrqLE/rvQDQhJF9B.Bxq6.RZr2a3/ZFsyd4qH2tALKw.FPBhKKr6W',0,'2021-03-31 18:29:10');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-13 17:29:48
