-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: j11c106.p.ssafy.io    Database: health
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Attendance`
--

DROP TABLE IF EXISTS `Attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Attendance` (
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `FK7pfwdy3jpud8kpro12g81mjim` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Attendance`
--

LOCK TABLES `Attendance` WRITE;
/*!40000 ALTER TABLE `Attendance` DISABLE KEYS */;
INSERT INTO `Attendance` VALUES ('2024-10-11 09:11:24.000000',1,3),('2024-10-03 09:11:24.000000',2,3),('2024-10-04 09:11:24.000000',3,3),('2024-10-07 09:11:24.000000',4,3);
/*!40000 ALTER TABLE `Attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Battle`
--

DROP TABLE IF EXISTS `Battle`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Battle` (
  `awayCrewScore` float DEFAULT NULL,
  `homeCrewScore` float DEFAULT NULL,
  `awayCrew_id` bigint DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `homeCrew_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `status` enum('FINISHED','NONE','STARTED','WAITING') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKte67ch9ghpu6b8168owr86t7o` (`awayCrew_id`),
  KEY `FKqdwio6s88jarcg9vivkvm6mfr` (`homeCrew_id`),
  CONSTRAINT `FKqdwio6s88jarcg9vivkvm6mfr` FOREIGN KEY (`homeCrew_id`) REFERENCES `Crew` (`id`),
  CONSTRAINT `FKte67ch9ghpu6b8168owr86t7o` FOREIGN KEY (`awayCrew_id`) REFERENCES `Crew` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Battle`
--

LOCK TABLES `Battle` WRITE;
/*!40000 ALTER TABLE `Battle` DISABLE KEYS */;
INSERT INTO `Battle` VALUES (0,0,12,'2024-10-09 15:22:37.543995',3,1,'STARTED'),(0,0,1,'2024-10-09 16:05:14.894591',10,2,'STARTED'),(0,0,17,'2024-10-09 17:03:18.152847',11,3,'STARTED'),(0,0,5,'2024-10-09 17:06:46.294177',23,4,'STARTED'),(0,0,2,'2024-10-10 11:42:28.053996',6,5,'STARTED'),(0,0,15,'2024-10-10 11:55:11.567469',24,6,'STARTED'),(0,0,18,'2024-10-10 12:03:12.049667',25,7,'STARTED'),(0,0,8,'2024-10-10 12:07:42.105359',4,8,'STARTED'),(0,0,16,'2024-10-10 12:12:29.481220',26,9,'STARTED');
/*!40000 ALTER TABLE `Battle` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BodyHistory`
--

DROP TABLE IF EXISTS `BodyHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BodyHistory` (
  `bodyFatRatio` float DEFAULT NULL,
  `height` float DEFAULT NULL,
  `isMuscle` bit(1) DEFAULT NULL,
  `skeletalMuscleMass` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `bodyType_id` bigint DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKapflfrgx8tkrl8ovbytm4p129` (`bodyType_id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_created_At` (`createdAt`),
  CONSTRAINT `FK9t8a0c228p8i30tsxmqmalnhi` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`),
  CONSTRAINT `FKapflfrgx8tkrl8ovbytm4p129` FOREIGN KEY (`bodyType_id`) REFERENCES `BodyType` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BodyHistory`
--

LOCK TABLES `BodyHistory` WRITE;
/*!40000 ALTER TABLE `BodyHistory` DISABLE KEYS */;
INSERT INTO `BodyHistory` VALUES (0,123,_binary '\0',0,12,2,'2024-10-07 14:54:00.705367',1,1),(20,180,_binary '\0',20,180,4,'2024-10-07 14:55:59.914589',2,2),(0,123,_binary '\0',0,12,2,'2024-10-07 14:58:23.383811',3,1),(0,123,_binary '\0',0,123,4,'2024-10-07 15:00:04.549529',5,1),(0,123,_binary '\0',0,12,4,'2024-10-07 15:03:17.466077',6,1),(0,123,_binary '\0',0,12,4,'2024-10-07 15:08:02.860249',7,1),(0,123,_binary '\0',0,123,3,'2024-10-07 16:03:52.395590',8,1),(0,1234,_binary '\0',0,34,1,'2024-10-07 17:21:38.627515',10,1),(0,170,_binary '\0',0,77,2,'2024-10-07 19:51:33.378164',12,1),(0,210,_binary '\0',0,70,4,'2024-10-07 19:54:39.902065',13,3),(0,210,_binary '\0',0,71,3,'2024-10-07 19:56:42.124442',14,3),(0,210,_binary '\0',0,72,4,'2024-10-07 20:03:06.890609',15,3),(55,188,_binary '\0',12,50,2,'2024-10-07 20:03:38.603940',16,1),(0,210,_binary '\0',0,71,4,'2024-10-07 20:06:36.037082',18,3),(0,210,_binary '\0',0,71,2,'2024-10-07 20:08:28.678723',19,3),(0,210,_binary '\0',0,72,2,'2024-10-07 20:31:34.509212',20,3),(0,123,_binary '\0',0,60,2,'2024-10-07 21:03:13.048453',22,1),(0,155,_binary '\0',0,35,6,'2024-10-07 21:22:09.301309',23,1),(0,2,_binary '',0,1,5,'2024-10-07 21:27:49.885583',24,5),(0,1231,_binary '\0',0,23,2,'2024-10-07 21:35:56.534620',25,1),(0,1321,_binary '\0',0,23,2,'2024-10-07 22:30:47.452296',27,1),(0,123,_binary '\0',0,123,2,'2024-10-07 22:44:14.296519',28,1),(0,120,_binary '\0',0,20,2,'2024-10-07 22:50:19.868136',29,2),(0,1231,_binary '\0',0,24,4,'2024-10-07 23:02:08.517314',30,1),(0,180,_binary '\0',0,80,2,'2024-10-07 23:13:55.824833',31,2),(0,123,_binary '\0',0,55,4,'2024-10-07 23:14:56.881608',32,1),(0,123,_binary '\0',0,55,4,'2024-10-07 23:15:09.931258',33,1),(0,123,_binary '\0',0,55,4,'2024-10-07 23:15:16.235114',34,1),(0,123,_binary '\0',0,33,4,'2024-10-07 23:18:33.489734',35,1),(20,180,_binary '',20,20,4,'2024-10-07 23:27:24.199377',36,2),(0,132,_binary '\0',0,77,2,'2024-10-07 23:29:39.418148',37,1),(20,180,_binary '',40,100,8,'2024-10-07 23:30:03.247235',38,2),(10,180,_binary '\0',10,60,1,'2024-10-07 23:33:06.112707',39,2),(0,156,_binary '\0',0,56,4,'2024-10-07 23:33:28.086320',40,1),(10,180,_binary '\0',20,80,2,'2024-10-07 23:43:56.099480',41,2),(20,180,_binary '\0',20,80,6,'2024-10-07 23:49:12.085053',42,2),(0,156,_binary '\0',0,55,4,'2024-10-07 23:51:07.928701',43,1),(10,180,_binary '\0',10,80,5,'2024-10-07 23:55:06.424512',44,2),(12,180,_binary '',20,40,8,'2024-10-08 00:04:21.764187',45,2),(20,180,_binary '',20,40,8,'2024-10-08 00:10:11.514304',46,2),(10,180,_binary '\0',10,80,2,'2024-10-08 00:15:34.057672',47,2),(0,210,_binary '\0',0,71,4,'2024-10-08 08:57:15.636288',49,3),(0,180,_binary '\0',0,88,14,'2024-10-08 08:59:03.566495',50,1),(0,166,_binary '\0',0,90,13,'2024-10-08 10:24:28.678764',53,1),(0,210,_binary '\0',0,75,4,'2024-10-08 13:41:04.981744',55,3),(0,210,_binary '\0',0,76,4,'2024-10-08 13:42:37.783854',56,3),(0,210,_binary '\0',0,80,4,'2024-10-08 13:43:49.597166',57,3),(0,178,_binary '\0',0,77,4,'2024-10-08 14:06:19.177916',58,1),(0,177,_binary '\0',0,80,5,'2024-10-08 14:07:47.524070',59,1),(12,123,_binary '',12,12,5,'2024-10-08 14:14:59.774902',60,2),(0,210,_binary '\0',0,82,2,'2024-10-08 14:33:25.542257',61,3),(0,166,_binary '\0',0,88,5,'2024-10-08 14:44:31.162134',62,1),(0,199,_binary '\0',0,99,5,'2024-10-08 14:47:06.226889',63,1),(0,176,_binary '\0',0,84,6,'2024-10-08 14:55:27.928253',64,6),(0,155,_binary '\0',0,66,5,'2024-10-08 15:05:39.935755',65,1),(10,123,_binary '\0',12,123,4,'2024-10-08 15:27:15.682904',67,7),(0,180,_binary '',0,70,4,'2024-10-09 16:38:17.590520',68,5),(0,210,_binary '\0',0,81,5,'2024-10-09 21:12:04.163831',69,3),(0,180,_binary '\0',0,80,5,'2024-10-10 14:50:18.091531',71,5),(0,176,_binary '\0',0,83.4,6,'2024-10-10 17:31:00.862912',72,6),(0,210,_binary '\0',0,80,5,'2024-10-10 17:41:24.297512',73,3),(30,270,_binary '\0',20,80,4,'2024-10-10 19:44:34.854783',74,12),(0,174,_binary '\0',0,80,5,'2024-10-10 20:49:46.668551',75,11),(0,176,_binary '\0',0,84,6,'2024-10-10 22:28:31.704991',76,14),(20,200000,_binary '\0',20,2000,1,'2024-10-11 10:40:25.307686',78,15),(0,180,_binary '\0',0,80,3,'2024-10-11 10:44:57.112499',79,3),(0,180,_binary '\0',0,80,2,'2024-10-11 11:21:51.285451',80,3),(0,180,_binary '\0',0,80,1,'2024-10-11 11:23:32.227618',81,3),(0,180,_binary '\0',0,80,1,'2024-10-11 11:26:15.058896',82,3),(0,187,_binary '\0',0,67,11,'2024-10-11 11:38:47.153761',83,1);
/*!40000 ALTER TABLE `BodyHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BodyType`
--

DROP TABLE IF EXISTS `BodyType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `BodyType` (
  `maxFatRatio` float NOT NULL,
  `minFatRatio` float NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `gender` enum('MAN','WOMAN') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BodyType`
--

LOCK TABLES `BodyType` WRITE;
/*!40000 ALTER TABLE `BodyType` DISABLE KEYS */;
INSERT INTO `BodyType` VALUES (5,0,1,'저체중','UNDERWEIGHT_LOW',NULL,'MAN'),(9,6,2,'마름','UNDERWEIGHT',NULL,'MAN'),(14,10,3,'보기좋은','FIT',NULL,'MAN'),(20,15,4,'보통','NORMAL',NULL,'MAN'),(24,21,5,'과체중','OVERWEIGHT',NULL,'MAN'),(50,25,6,'비만','OBESE',NULL,'MAN'),(6,3,7,'저체중','MUSCLE_UNDERWEIGHT_LOW',NULL,'MAN'),(9,7,8,'마름','MUSCLE_UNDERWEIGHT',NULL,'MAN'),(14,10,9,'보기좋은','MUSCLE_FIT',NULL,'MAN'),(20,15,10,'보통','MUSCLE_NORMAL',NULL,'MAN'),(16,0,11,'저체중','UNDERWEIGHT_LOW',NULL,'WOMAN'),(19,17,12,'마름','UNDERWEIGHT',NULL,'WOMAN'),(24,20,13,'보기좋은','FIT',NULL,'WOMAN'),(30,25,14,'보통','NORMAL',NULL,'WOMAN'),(34,31,15,'과체중','OVERWEIGHT',NULL,'WOMAN'),(60,35,16,'비만','OBESE',NULL,'WOMAN'),(16,13,17,'저체중','MUSCLE_UNDERWEIGHT_LOW',NULL,'WOMAN'),(19,17,18,'마름','MUSCLE_UNDERWEIGHT',NULL,'WOMAN'),(24,20,19,'보기좋은','MUSCLE_FIT',NULL,'WOMAN'),(30,25,20,'보통','MUSCLE_NORMAL',NULL,'WOMAN');
/*!40000 ALTER TABLE `BodyType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Category` (
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES (NULL,1,'유산소'),(NULL,2,'구기종목'),(NULL,3,'근력운동'),(NULL,4,'기타');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CharacterSet`
--

DROP TABLE IF EXISTS `CharacterSet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CharacterSet` (
  `characters_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `parts_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKgo6vi63wvia513it9toolwngk` (`user_id`),
  KEY `FK1dixbvnihsggi88aemo44ny18` (`characters_id`),
  KEY `FKcri7l891x84tnwr6uprjafy52` (`parts_id`),
  CONSTRAINT `FK1dixbvnihsggi88aemo44ny18` FOREIGN KEY (`characters_id`) REFERENCES `characters` (`id`),
  CONSTRAINT `FKcri7l891x84tnwr6uprjafy52` FOREIGN KEY (`parts_id`) REFERENCES `Parts` (`id`),
  CONSTRAINT `FKfsk7td243tgr7bsdpn0wod4qw` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CharacterSet`
--

LOCK TABLES `CharacterSet` WRITE;
/*!40000 ALTER TABLE `CharacterSet` DISABLE KEYS */;
INSERT INTO `CharacterSet` VALUES (11,1,1,1),(5,2,1,2),(1,3,2,3),(5,5,2,5),(6,6,1,6),(4,7,2,7),(4,9,1,12),(5,10,1,11),(6,11,1,14),(1,12,1,15);
/*!40000 ALTER TABLE `CharacterSet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CharacterSnapshot`
--

DROP TABLE IF EXISTS `CharacterSnapshot`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CharacterSnapshot` (
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `characterSnapshotUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK18uqilwwsxy0h2rcefdxws6w6` (`user_id`),
  CONSTRAINT `FK18uqilwwsxy0h2rcefdxws6w6` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CharacterSnapshot`
--

LOCK TABLES `CharacterSnapshot` WRITE;
/*!40000 ALTER TABLE `CharacterSnapshot` DISABLE KEYS */;
INSERT INTO `CharacterSnapshot` VALUES ('2024-10-07 23:54:10.292902',1,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d784eef2-1cfb-442b-b018-7b112f4b22d5.png'),('2024-10-07 23:54:26.560662',2,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/e0a5aafa-dc09-4637-985c-9799c98f1f24.png'),('2024-10-07 23:55:14.051547',3,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ace1411f-985c-49ee-ac2a-39327ceadcf0.png'),('2024-10-08 00:14:28.247719',4,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/babd1806-f2cc-4dd6-8129-7b0b59aa3753.png'),('2024-10-08 00:15:39.209297',5,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f811a18f-949a-42c1-8def-87ce308869eb.png'),('2024-10-08 00:29:52.277842',6,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/70b4262d-04d3-4295-bbb7-ac019c5657dd.png'),('2024-10-08 00:30:04.192018',7,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/caca1b28-524c-44dd-aff9-935dee998f8d.png'),('2024-10-08 00:30:18.660680',8,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/cf52e600-20c6-4c7f-a79c-e4783cc635b0.png'),('2024-10-08 08:59:41.066309',9,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4cc0539a-b123-4804-b752-027aa6d21f5e.png'),('2024-10-08 10:40:35.121393',10,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/830e3514-3336-454a-a704-9e8fdcf17e2b.png'),('2024-10-08 10:40:44.994733',11,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/20251ecc-e553-452d-ae68-41f9721f8d16.png'),('2024-10-08 10:40:53.013737',12,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7cfd05a6-1136-4e1c-ba6c-d26793adb696.png'),('2024-10-08 14:08:42.031281',13,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ffdb4e16-0148-4d54-b850-9b5bb6e92c1f.png'),('2024-10-08 14:08:58.436936',14,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1bf51ba0-8480-4886-b96d-8a5f00a7b398.png'),('2024-10-08 14:10:30.423197',15,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/33df3921-5336-4acf-a8b0-64d65cdaddba.png'),('2024-10-08 14:16:25.321762',16,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/2a1a2c85-bf56-4574-acfd-9286409d84f6.png'),('2024-10-08 14:59:58.887513',17,6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/991d5ef8-fc19-44a1-af9d-a2d3817572c2.png'),('2024-10-08 15:00:04.254458',18,6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a84aa3d4-13f5-418c-b204-b6f0011ea57e.png'),('2024-10-08 20:30:29.082885',19,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d92e079e-01ca-449f-8e16-a5250eabe0ab.png'),('2024-10-08 20:35:14.034382',20,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/9f7d3641-922e-4e61-abe3-d9dfabcbfe2b.png'),('2024-10-08 20:35:16.668332',21,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/8b38d789-fa90-4403-a642-6ad8cdee6b5d.png'),('2024-10-08 20:35:21.159375',22,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a91435e4-1cbb-40ea-8c54-9a86aacf8b45.png'),('2024-10-08 20:35:31.456868',23,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/e6187c57-67d3-4a85-9890-c4a426e08a22.png'),('2024-10-08 20:35:34.140945',24,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4f6d0a78-ba55-4096-b520-4a242337d0a7.png'),('2024-10-08 22:44:23.107253',25,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4137e2e1-0d7c-4541-a18a-22e3499e1e8b.png'),('2024-10-09 21:29:53.776497',28,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/97157fb3-754e-4137-893d-477d536a78b3.png'),('2024-10-09 21:30:00.449718',29,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b97be473-3fbc-4b92-9b76-b44e830bee6d.png'),('2024-10-09 21:30:10.100194',30,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/96cca599-a3de-4807-aa1a-023cc2d820d7.png'),('2024-10-09 21:34:18.871379',31,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ce177e89-1b69-47bf-9d13-f6becb3abd6b.png'),('2024-10-09 21:34:27.842171',32,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/25ed0e05-e4b0-4ead-8104-6e52a59be7db.png'),('2024-10-09 21:44:07.054699',33,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/fd13ba99-dd9e-45d1-9a4c-acc4f13e18a0.png'),('2024-10-09 21:44:22.137258',34,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7bc38cfa-9169-4f2e-b59d-bba0e75a76c2.png'),('2024-10-09 21:45:07.665659',35,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f2f1008b-ca46-4b86-ae46-c3aafa543844.png'),('2024-10-09 21:45:22.275531',36,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/01305435-2917-41dd-9df1-c3d22f6f7f73.png'),('2024-10-09 21:51:34.685808',37,3,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/dcea5b51-c6bb-4c28-a490-ab8cd2901e14.png'),('2024-10-09 21:51:47.755875',38,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0568fced-c1b4-4a55-8cd3-725f14e1b47c.png'),('2024-10-09 21:51:59.034692',39,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/616e744d-d6a2-48c0-b561-42185823310d.png'),('2024-10-09 21:54:49.872657',40,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5d48d3e2-2ccf-467c-ac4b-884c48b610a9.png'),('2024-10-09 21:57:36.051540',41,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/de9e0450-bf26-4e8e-b371-174f17eb98ee.png'),('2024-10-09 22:05:58.017497',43,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/3c1a984b-beb0-4a37-843c-3b322b439672.png'),('2024-10-09 22:32:35.525744',44,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5aa4b48a-6ad2-441c-a25f-df85d6b2a3d6.png'),('2024-10-09 23:31:23.796742',49,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/678d763c-459f-4197-b5b4-034143c9e29f.png'),('2024-10-10 04:18:06.575543',50,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/8297d40e-6b29-4f9b-b4c3-ce128ee05551.png'),('2024-10-10 04:18:10.286607',51,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/fdf6cd05-bde8-4fdb-a5a9-186af1f7b930.png'),('2024-10-10 07:17:01.667736',52,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/2680d180-dc0e-4037-8db8-709117d893f8.png'),('2024-10-10 07:19:52.046122',53,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/911b53f1-6703-4713-931b-25eba80ea102.png'),('2024-10-10 07:19:59.647157',54,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d2285891-0f70-451b-8557-bb4c7dd3320b.png'),('2024-10-10 07:20:14.675434',55,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4f4ff7b0-b80d-4055-9354-3dacf5f1a6ac.png'),('2024-10-10 07:21:44.093685',56,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a2f0e9a0-267c-432a-b324-3f2497494b3b.png'),('2024-10-10 07:46:22.421020',57,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ec125616-b3b9-4fbe-9814-c32c969a9351.png'),('2024-10-10 08:45:25.897284',58,7,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f0685a17-70bd-4d65-950e-09e14e9e44ce.png'),('2024-10-10 08:45:27.219534',59,7,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/cf9c2cb7-223e-4670-be28-9b2746455c9e.png'),('2024-10-10 10:26:45.224941',60,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/fbd2bb3d-9da6-4542-be1d-019c935f0069.png'),('2024-10-10 13:14:27.744307',62,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f71051e2-50c8-4e29-988e-c8821022a323.png'),('2024-10-10 13:14:34.531596',63,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f239c0d6-9cd6-4ff2-85e5-6a6898399760.png'),('2024-10-10 13:14:41.621332',64,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ac9e634c-70bd-4de0-9d34-40ea44af6278.png'),('2024-10-10 13:14:46.802414',65,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/99932025-b36f-4e15-8582-04f62fb88ef4.png'),('2024-10-10 13:14:51.144011',66,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d735dce2-f179-48e1-9b52-a85017af50ca.png'),('2024-10-10 13:26:12.541636',67,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/315ae284-a063-465f-afbe-1af5e21dfeb6.png'),('2024-10-10 13:26:13.048914',68,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/81f867f1-048c-4bf5-98d0-632969c82f7a.png'),('2024-10-10 13:26:16.262460',69,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ced15cd6-4987-4e4e-a90a-f0a9d12cb040.png'),('2024-10-10 13:26:24.101914',70,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/69a51b47-2aca-4860-96fc-a167e6c22dd0.png'),('2024-10-10 13:26:33.159153',71,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bb94a047-7d06-4c92-b466-9f52f7d95228.png'),('2024-10-10 13:26:53.199514',72,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0afc036f-071a-4830-ba56-c5e15e28c668.png'),('2024-10-10 13:27:01.002156',73,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/03ea96e0-d3a4-4640-a446-21fc440c7095.png'),('2024-10-10 14:55:54.007428',75,6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d786da55-a67d-4e0a-b6f8-ce04fd100739.png'),('2024-10-10 15:21:49.777447',76,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/52cacf77-e237-44a7-97d4-c6d4a3ca902b.png'),('2024-10-10 15:21:56.756515',77,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ccbfd868-b339-4e2f-8750-9fc96902e860.png'),('2024-10-10 15:22:21.313639',78,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1e877a2d-1bda-42ce-956e-03ae8f80e7f0.png'),('2024-10-10 15:22:24.091579',79,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a2edd7f6-9358-449b-a725-f9fe676be092.png'),('2024-10-10 15:22:45.356809',80,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5e5a6c9e-c5d2-448d-9140-6e4d813a609c.png'),('2024-10-10 15:22:59.125853',81,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4f243d63-51f1-4a52-8567-c8ae7377ba5b.png'),('2024-10-10 15:23:05.713499',82,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/989ba7c5-fa3a-4241-a9a3-5ce39bef028d.png'),('2024-10-10 15:23:25.191816',83,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1b1fc759-c98b-4bc8-b7cc-80c056f7be7b.png'),('2024-10-10 15:23:36.937466',84,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/913afb5b-0708-4edb-9589-0fbb396e2f67.png'),('2024-10-10 15:23:43.858012',85,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/dcdc9102-8f08-46de-b4f7-ddc17813e970.png'),('2024-10-10 15:23:48.777825',86,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a18408a3-e1d9-478a-b726-93540d968b54.png'),('2024-10-10 15:23:52.355584',87,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/3a7fabd7-9bcf-4b4f-8043-16aa442dc561.png'),('2024-10-10 15:26:39.112884',88,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5698d731-5749-4072-ad41-c2cfde735ee0.png'),('2024-10-10 15:26:48.388826',89,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7aeb11b3-5e6b-42c4-a6c8-ab54f53d4a7b.png'),('2024-10-10 15:26:56.107984',90,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ab4e9816-1b83-4ec7-96df-a8860fdadcf4.png'),('2024-10-10 15:27:04.047590',91,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/8758882e-c3db-45ac-bd36-ae6ee0f72733.png'),('2024-10-10 15:27:09.378593',92,1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/9d91b96d-2d33-4a95-be45-0f30da3ef37d.png'),('2024-10-10 22:06:36.823280',94,6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1818f468-db36-4e8d-bf6f-84c43b3e8495.png'),('2024-10-10 22:10:07.419682',96,3,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a82928be-48f7-4f84-88d3-f1af772cfc7c.png'),('2024-10-10 22:29:17.327266',97,14,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/256a8067-50f3-42dd-9ed7-b20eb374397a.png'),('2024-10-10 22:29:20.279883',98,14,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/df61cc63-325c-40a0-9cf5-90f6a5589d7e.png'),('2024-10-10 22:29:27.350590',99,14,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b4e3d195-3871-4345-85de-d3a98e52e22d.png'),('2024-10-11 00:08:43.636200',101,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4373af0a-c6ed-4f89-ba77-a7d2ddadd352.png'),('2024-10-11 00:08:46.597903',102,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a0742037-4f3c-4516-8c8a-63e3ab8f3b43.png'),('2024-10-11 00:08:49.723072',103,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/d0023e47-b0bf-4d8a-854f-56000c93a94b.png'),('2024-10-11 00:08:50.165390',104,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7ab5e365-a11a-4b2e-b7f3-e8f1632ae196.png'),('2024-10-11 00:08:54.332634',105,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/788e1729-4edc-4aec-93ab-469ad79d8261.png'),('2024-10-11 00:08:56.634018',106,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b2f07a24-c8e2-443c-b76c-91215e7ed0a8.png'),('2024-10-11 00:08:56.718441',107,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/862180cd-ed4d-44a5-88b2-c368a052e0d7.png'),('2024-10-11 00:09:03.461886',108,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ab43f2b1-7b62-4e80-83c4-2f0875889027.png'),('2024-10-11 00:09:19.390739',109,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/3ffb1bde-635f-4871-8094-97f20e693b51.png'),('2024-10-11 00:09:26.759491',110,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/cad07151-9207-4a5b-b175-17d1ecc73066.png'),('2024-10-11 00:09:31.716672',111,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/23105020-c080-4db2-be6e-b7d2134f26d4.png'),('2024-10-11 00:09:40.999521',112,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/6729e808-b8d4-4eab-8199-a054c830be79.png'),('2024-10-11 00:10:30.364888',113,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4c20dde6-096f-4bb7-9d2e-2711a0918397.png'),('2024-10-11 00:10:37.419690',114,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0e8003a7-dc94-4368-b64a-22ef413546d2.png'),('2024-10-11 00:10:37.533744',115,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/c36d136d-38ee-4636-ae20-fe70678d685c.png'),('2024-10-11 00:10:37.691522',116,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4a6d8d30-7f64-40c3-9171-ab5b3604e425.png'),('2024-10-11 00:11:20.490337',118,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/a8a704b2-9df2-4121-8f76-002927c74460.png'),('2024-10-11 00:11:35.338393',119,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/80df6188-fa7f-45d9-a818-1ee237f12012.png'),('2024-10-11 00:12:16.628832',120,5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/60dde208-0998-41e0-a876-f1003a607165.png'),('2024-10-11 00:45:26.733378',121,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4a5d55ea-fada-4ceb-b7f7-76cc396fdcf7.png'),('2024-10-11 00:45:32.650506',122,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b6e3588c-3a92-4d9d-96f6-d737bc3d1850.png'),('2024-10-11 00:45:33.701475',123,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/3125b1cb-ae44-4db4-8fc7-c646298b904a.png'),('2024-10-11 00:45:37.222450',124,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/3eb0bde5-b8fb-463d-ad80-9128d4b5e1b5.png'),('2024-10-11 00:45:37.608226',125,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7b8aec38-1a01-4fb3-9737-6900a92e5e70.png'),('2024-10-11 00:45:49.424193',126,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1b98618c-2bb7-4c59-bd4b-f24296331d07.png'),('2024-10-11 00:45:59.715713',127,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/2d2bc937-7693-4d68-85d8-2a5a91114ff0.png'),('2024-10-11 00:45:59.941329',128,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b716b4a2-6eb8-4248-8606-3bb726ffd48e.png'),('2024-10-11 00:46:33.270748',129,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/58de08c8-ed0a-45a9-9472-199a8d170686.png'),('2024-10-11 00:46:33.457018',130,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/c783b6b9-76ef-40e9-a35a-20fd8cc51e35.png'),('2024-10-11 00:46:41.120525',131,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0ddc66a5-9e98-4439-95e3-0ae0da2ab21c.png'),('2024-10-11 00:46:41.369620',132,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/b67d4abe-668b-4588-82a7-847a8f359f6b.png'),('2024-10-11 00:47:08.810344',133,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/ca69c7ba-2d79-4e35-b460-bfc4f8ceaa15.png'),('2024-10-11 00:50:45.934475',134,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/0a353b87-a8f3-4226-9063-959815bb32b4.png'),('2024-10-11 01:04:58.640792',137,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/350d0a17-ace7-4158-9175-cb1e021f2a9b.png'),('2024-10-11 01:04:59.316239',138,2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/bf7ccbc9-4e95-4d9d-a706-27b580d8cdbb.png'),('2024-10-11 09:13:29.188144',143,6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/5501e889-9ce1-48e5-b536-654bc52ff684.png'),('2024-10-11 10:42:47.944561',145,3,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/8ce6f7f3-5e81-4a80-a80b-d0e8ca0b7c92.png'),('2024-10-11 11:21:14.031143',146,3,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/f5823c4d-b62c-4836-8333-ded43120e3a2.png');
/*!40000 ALTER TABLE `CharacterSnapshot` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Crew`
--

DROP TABLE IF EXISTS `Crew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Crew` (
  `activityScore` float DEFAULT NULL,
  `averageAge` int DEFAULT NULL,
  `basicScore` float DEFAULT NULL,
  `battleStatus` bit(1) DEFAULT NULL,
  `crewCoin` int DEFAULT NULL,
  `crewMemberCount` int DEFAULT NULL,
  `memberLimit` int NOT NULL,
  `version` int DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `exercise_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_exercise_id` (`exercise_id`),
  CONSTRAINT `FKgervvs700vu4aep78b8ve159o` FOREIGN KEY (`exercise_id`) REFERENCES `Exercise` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Crew`
--

LOCK TABLES `Crew` WRITE;
/*!40000 ALTER TABLE `Crew` DISABLE KEYS */;
INSERT INTO `Crew` VALUES (0,23,3.8745,_binary '',1200,NULL,10,15,'2024-10-08 21:20:21.149362',1,1,'무릎아파 관절아파','zxcvzxcvbnm','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/1.jpg'),(0,23,0,_binary '',0,NULL,10,3,'2024-10-08 21:30:05.435238',4,2,'준혁이와 함께하는 러닝크루','지응아 달려','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/2.jpg'),(500,26,600,_binary '\0',950,1,10,18,'2024-10-08 22:34:43.000000',2,3,'음하하하하','가보자 주녁','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/3.jpg'),(200,27,100,_binary '\0',1200,1,10,10,'2024-10-08 22:34:43.000000',3,4,'캬캬캬캬 드루와','노는게 제일 좋아','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/4.jpg'),(300,28,200,_binary '\0',900,1,10,3,'2024-10-08 22:34:43.000000',4,5,'덤벼라 애송이들','달리기 크루','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/5.jpg'),(200,29,150,_binary '\0',1900,1,10,15,'2024-10-08 22:34:43.000000',5,6,'여미새 안받아요','등산의 목적','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/6.jpg'),(1000,22,1000,_binary '',1000,1,10,1,'2024-10-08 22:34:43.000000',6,7,'쓰레기 주우실 분','환경을 보호하자','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/7.jpg'),(700,23,800,_binary '',900,1,10,2,'2024-10-08 22:34:44.000000',7,8,'모두가 내 발 아래','이게 너와 나의 눈높이','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/8.jpg'),(300,24,300,_binary '',1000,1,10,1,'2024-10-08 22:34:44.000000',8,9,'니들이 게 맛을 알어?','신구크루','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/9.jpg'),(0,25,0,_binary '',1000,1,10,3,'2024-10-08 22:34:44.000000',1,10,'바니바니바니바니','토끼','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/10.jpg'),(20,26,20,_binary '',900,1,10,2,'2024-10-08 22:34:44.000000',10,11,'당근 당근','토끼2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/11.jpg'),(30,22,200,_binary '',900,1,10,2,'2024-10-08 22:34:44.000000',2,12,'집에 가자','싸피생들','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/12.jpg'),(500,24,400,_binary '',1000,1,10,1,'2024-10-08 22:34:44.000000',3,13,'새벽 2시 반','지금 시간','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/13.jpg'),(300,23,241.3,_binary '',1000,1,10,3,'2024-10-08 22:34:44.000000',4,14,'노선바꾼 뱀새끼들','한국 힙합','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/14.jpg'),(250,27,500,_binary '',900,1,10,2,'2024-10-08 22:34:44.000000',5,15,'yo yo yo','씨잼','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/15.jpg'),(330,28,600,_binary '',900,1,10,2,'2024-10-08 22:34:44.000000',6,16,'메롱이다','약오르지롱','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/16.jpg'),(260,29,450,_binary '',900,1,10,2,'2024-10-08 22:34:45.000000',7,17,'드루와','신세계 크루','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/17.jpg'),(450,20,600,_binary '',900,1,10,2,'2024-10-08 22:34:45.000000',8,18,'ㅋㅋ','크크크루','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/18.jpg'),(90,40,200,_binary '',1000,1,10,1,'2024-10-08 22:34:45.000000',9,19,'소개 필요 없음','소개팅','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/19.jpg'),(100,22,230,_binary '',1000,1,10,1,'2024-10-08 22:34:45.000000',10,20,'팅팅팅팅 탱탱탱탱','탱탱한 사과','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/20.jpg'),(200,24,400,_binary '',1000,1,10,1,'2024-10-08 22:34:45.000000',11,21,'팅팅 탱탱','배그 후라이팬','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/21.jpg'),(300,26,600,_binary '',1000,1,10,1,'2024-10-08 22:34:45.000000',12,22,'후라이팬놀이','고전놀이','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/22.jpg'),(0,23,3.8745,_binary '',900,NULL,10,5,'2024-10-09 14:27:58.192296',1,23,'오늘 저녁 뭐 먹지','우린배고프다','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/23.jpg'),(0,23,0,_binary '\0',100,NULL,10,4,'2024-10-09 18:02:24.026940',2,24,'기다리다 지쳤어요','땡벌땡벌','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/24.jpg'),(0,23,1.50675,_binary '\0',100,NULL,10,4,'2024-10-09 20:46:09.275186',3,25,'제발요','크루반영테스트','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/crew_image/25.jpg'),(0,24,0,_binary '\0',100,NULL,10,6,'2024-10-10 12:11:35.233377',12,26,'ㅁㄴㅇㄹ','ㅁㄴㅇㄹ','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/88165dd0-5770-4f1f-81a9-5001df9bcf91.png');
/*!40000 ALTER TABLE `Crew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CrewQuest`
--

DROP TABLE IF EXISTS `CrewQuest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CrewQuest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) DEFAULT NULL,
  `status` enum('COMPLETED','CREATED','FINISHED') NOT NULL,
  `crew_id` bigint DEFAULT NULL,
  `quest_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKera6yhrphy3y2g6c8cvwkidm7` (`crew_id`),
  KEY `FKhylietmitiqypfox1fopppr86` (`quest_id`),
  CONSTRAINT `FKera6yhrphy3y2g6c8cvwkidm7` FOREIGN KEY (`crew_id`) REFERENCES `Crew` (`id`),
  CONSTRAINT `FKhylietmitiqypfox1fopppr86` FOREIGN KEY (`quest_id`) REFERENCES `Quest` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CrewQuest`
--

LOCK TABLES `CrewQuest` WRITE;
/*!40000 ALTER TABLE `CrewQuest` DISABLE KEYS */;
INSERT INTO `CrewQuest` VALUES (1,'2024-10-11 11:25:04.963796','CREATED',1,4),(2,'2024-10-11 11:25:04.968576','CREATED',2,4),(3,'2024-10-11 11:25:04.970207','CREATED',3,4),(4,'2024-10-11 11:25:04.972063','CREATED',4,4),(5,'2024-10-11 11:25:04.973733','CREATED',5,4),(6,'2024-10-11 11:25:04.975405','CREATED',6,4),(7,'2024-10-11 11:25:04.977235','CREATED',7,4),(8,'2024-10-11 11:25:04.978963','CREATED',8,4),(9,'2024-10-11 11:25:04.980492','CREATED',9,4),(10,'2024-10-11 11:25:04.982242','CREATED',10,4),(11,'2024-10-11 11:25:04.983847','CREATED',11,4),(12,'2024-10-11 11:25:04.985517','CREATED',12,4),(13,'2024-10-11 11:25:04.987127','CREATED',13,4),(14,'2024-10-11 11:25:04.989095','CREATED',14,4),(15,'2024-10-11 11:25:04.990948','CREATED',15,4),(16,'2024-10-11 11:25:04.992457','CREATED',16,4),(17,'2024-10-11 11:25:04.994594','CREATED',17,4),(18,'2024-10-11 11:25:04.996256','CREATED',18,4),(19,'2024-10-11 11:25:04.997904','CREATED',19,4),(20,'2024-10-11 11:25:04.999597','CREATED',20,4),(21,'2024-10-11 11:25:05.001335','CREATED',21,4),(22,'2024-10-11 11:25:05.003013','CREATED',22,4),(23,'2024-10-11 11:25:05.004477','CREATED',23,4),(24,'2024-10-11 11:25:05.006072','CREATED',24,4),(25,'2024-10-11 11:25:05.007589','CREATED',25,4),(26,'2024-10-11 11:25:05.009326','CREATED',26,4);
/*!40000 ALTER TABLE `CrewQuest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Exercise`
--

DROP TABLE IF EXISTS `Exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Exercise` (
  `met` float NOT NULL,
  `category_id` bigint DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsd0gjcxr9gv0edrvcr8vim0ln` (`category_id`),
  CONSTRAINT `FKsd0gjcxr9gv0edrvcr8vim0ln` FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Exercise`
--

LOCK TABLES `Exercise` WRITE;
/*!40000 ALTER TABLE `Exercise` DISABLE KEYS */;
INSERT INTO `Exercise` VALUES (4.5,1,NULL,1,NULL,'걷기'),(8,1,NULL,2,NULL,'계단오르기'),(7,2,NULL,3,NULL,'농구'),(8,1,NULL,4,NULL,'달리기'),(7,1,NULL,5,NULL,'등산'),(7,2,NULL,6,NULL,'배구'),(9,2,NULL,7,NULL,'배드민턴'),(7.8,1,NULL,8,NULL,'복싱'),(7,1,NULL,9,NULL,'스케이팅'),(7,3,NULL,10,NULL,'클라이밍'),(9,1,NULL,11,NULL,'스피닝'),(6,1,NULL,12,NULL,'에어로빅'),(2.5,1,NULL,13,NULL,'요가'),(10,3,NULL,14,NULL,'유도'),(6,1,NULL,15,NULL,'수영'),(7,1,NULL,16,NULL,'자전거'),(5.5,1,NULL,17,NULL,'축구'),(5.3,3,NULL,18,NULL,'주짓수'),(10,3,NULL,19,NULL,'크로스핏'),(10,1,NULL,20,NULL,'킥복싱'),(5,2,NULL,21,NULL,'탁구'),(7,2,NULL,22,NULL,'테니스'),(8,1,NULL,23,NULL,'펜싱'),(5.5,1,NULL,24,NULL,'폴댄스'),(4,3,NULL,25,NULL,'플랭크'),(5.5,1,NULL,26,NULL,'필라테스'),(5.5,3,NULL,27,NULL,'헬스'),(4,4,NULL,28,NULL,'기타 운동 (저강도)'),(7,4,NULL,29,NULL,'기타 운동 (중강도)'),(10,4,NULL,30,NULL,'기타 운동 (고강도)');
/*!40000 ALTER TABLE `Exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ExerciseHistory`
--

DROP TABLE IF EXISTS `ExerciseHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ExerciseHistory` (
  `burnedCalories` float NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `exerciseDuration` bigint NOT NULL,
  `exerciseEndTime` datetime(6) NOT NULL,
  `exerciseStartTime` datetime(6) NOT NULL,
  `exercise_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_exercise_start_time` (`exerciseStartTime`),
  KEY `FKkjl6msh8ep5hyshdvknp9d7tq` (`exercise_id`),
  CONSTRAINT `FKkjl6msh8ep5hyshdvknp9d7tq` FOREIGN KEY (`exercise_id`) REFERENCES `Exercise` (`id`),
  CONSTRAINT `FKkr3vwdsjxd0fx3bc10qbrjmrx` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ExerciseHistory`
--

LOCK TABLES `ExerciseHistory` WRITE;
/*!40000 ALTER TABLE `ExerciseHistory` DISABLE KEYS */;
INSERT INTO `ExerciseHistory` VALUES (0,'2024-10-08 15:56:20.553236',6650,'2024-10-08 06:56:20.521000','2024-10-08 06:56:15.632000',12,2,2),(0,'2024-10-08 20:31:12.283073',14110,'2024-10-08 11:31:12.253000','2024-10-08 11:30:53.776000',13,3,2),(449.404,'2024-10-05 10:04:42.000000',2400420,'2024-10-05 10:44:42.349443','2024-10-05 10:04:42.349443',25,11,3),(9.68625,'2024-10-09 17:20:24.462135',71050,'2024-10-09 08:20:24.099000','2024-10-09 08:19:12.923000',1,13,7),(19.3725,'2024-10-09 17:57:18.955425',167960,'2024-10-09 08:57:18.782000','2024-10-09 08:54:28.987000',1,14,7),(20,'2024-10-09 18:05:13.000000',10000000,'2024-10-09 18:05:13.000000','2024-10-09 18:05:13.000000',1,15,5),(0,'2024-10-09 20:05:36.641917',2380,'2024-10-09 11:05:36.344000','2024-10-09 11:05:33.949000',12,16,1),(15.0675,'2024-10-09 20:52:37.813353',60960,'2024-10-09 11:52:37.591000','2024-10-09 11:51:34.354000',3,17,7),(0,'2024-10-09 21:12:55.650433',12720,'2024-10-09 21:12:55.534000','2024-10-09 21:12:41.937000',15,18,7),(9.68625,'2024-10-09 21:15:47.910879',76450,'2024-10-09 21:15:47.822000','2024-10-09 21:14:30.399000',1,21,7),(0,'2024-10-09 21:17:53.217686',1940,'2024-10-09 21:17:53.194000','2024-10-09 21:17:46.664000',2,22,2),(0,'2024-10-09 21:33:12.103787',2030,'2024-10-09 21:33:12.050000','2024-10-09 21:33:07.248000',16,23,2),(0,'2024-10-09 21:33:55.966655',6680,'2024-10-09 21:33:55.916000','2024-10-09 21:33:39.122000',8,24,2),(0,'2024-10-09 21:54:38.937630',21930,'2024-10-09 21:54:38.753000','2024-10-09 21:54:24.549000',8,25,2),(0,'2024-10-09 21:57:21.122991',5840,'2024-10-09 21:57:20.839000','2024-10-09 21:57:11.520000',2,26,2),(0,'2024-10-09 22:19:07.222680',59660,'2024-10-09 22:19:07.032000','2024-10-09 22:16:58.655000',1,29,2),(0,'2024-10-10 00:04:26.375231',1170,'2024-10-09 15:04:26.321000','2024-10-09 15:04:23.040000',11,31,1),(0,'2024-10-10 00:25:18.166127',10870,'2024-10-10 00:25:18.124000','2024-10-10 00:24:47.725000',9,32,2),(0,'2024-10-10 00:28:41.311521',12820,'2024-10-10 00:28:41.270000','2024-10-10 00:28:24.478000',4,33,2),(0,'2024-10-10 01:08:07.697763',13220,'2024-10-10 01:08:07.662000','2024-10-10 01:06:47.909000',4,34,2),(0,'2024-10-10 01:43:11.032840',2580,'2024-10-10 01:43:10.855000','2024-10-10 01:37:28.284000',1,35,2),(0,'2024-10-10 02:18:20.618937',5290,'2024-10-10 02:18:20.547000','2024-10-10 02:14:53.400000',2,36,2),(0,'2024-10-10 03:03:33.545491',13450,'2024-10-10 03:03:33.414000','2024-10-10 03:03:27.263000',1,37,2),(0,'2024-10-10 04:16:33.263746',8960,'2024-10-10 04:16:33.172000','2024-10-10 04:15:34.551000',2,38,2),(0,'2024-10-10 07:14:46.285741',8030,'2024-10-10 07:14:46.159000','2024-10-10 07:14:37.827000',16,39,1),(0,'2024-10-10 08:06:05.473123',3300,'2024-10-10 08:06:05.317000','2024-10-10 08:05:55.051000',17,40,1),(0,'2024-10-10 08:25:04.381181',2810,'2024-10-10 08:25:04.218000','2024-10-10 08:25:00.614000',23,41,1),(0,'2024-10-10 08:29:26.881597',650,'2024-10-10 08:29:26.682000','2024-10-10 08:29:25.320000',16,42,1),(0,'2024-10-10 08:48:23.247494',520,'2024-10-10 08:48:23.076000','2024-10-10 08:48:22.236000',23,43,1),(0,'2024-10-10 08:51:42.997243',1210,'2024-10-10 08:51:42.825000','2024-10-10 08:51:40.058000',23,44,1),(0,'2024-10-10 08:54:59.221390',770,'2024-10-10 08:54:59.046000','2024-10-10 08:54:58.012000',20,45,1),(0,'2024-10-10 08:56:24.645874',18060,'2024-10-10 08:56:24.622000','2024-10-10 08:55:31.581000',1,46,7),(0,'2024-10-10 09:00:29.064847',8420,'2024-10-10 09:00:28.886000','2024-10-10 09:00:11.450000',23,47,1),(0,'2024-10-10 09:00:46.465528',390,'2024-10-10 09:00:46.436000','2024-10-10 09:00:02.023000',1,48,7),(0,'2024-10-10 09:03:44.244955',970,'2024-10-10 09:03:44.059000','2024-10-10 09:03:40.043000',23,49,1),(0,'2024-10-10 09:04:13.730596',370,'2024-10-10 09:04:13.696000','2024-10-10 09:03:35.098000',1,50,7),(0,'2024-10-10 09:06:38.423703',1120,'2024-10-10 09:06:38.189000','2024-10-10 09:06:36.020000',23,51,1),(0,'2024-10-10 09:06:44.345432',12800,'2024-10-10 09:06:44.242000','2024-10-10 09:04:12.898000',2,52,2),(873.128,'2024-09-30 09:36:08.000000',4114702,'2024-09-30 10:44:42.349443','2024-09-30 09:36:08.349443',2,53,1),(468.664,'2024-10-01 09:31:21.000000',4401005,'2024-10-01 10:44:42.349443','2024-10-01 09:31:21.349443',28,54,1),(503.172,'2024-10-02 09:47:28.000000',3434372,'2024-10-02 10:44:42.349443','2024-10-02 09:47:28.349443',26,55,1),(301.743,'2024-10-03 09:56:54.000000',2868235,'2024-10-03 10:44:42.349443','2024-10-03 09:56:54.349443',25,56,1),(731.887,'2024-10-04 09:27:57.000000',4605418,'2024-10-04 10:44:42.349443','2024-10-04 09:27:57.349443',15,57,1),(449.404,'2024-10-05 10:04:42.000000',2400420,'2024-10-05 10:44:42.349443','2024-10-05 10:04:42.349443',5,58,1),(757.567,'2024-10-06 08:46:31.000000',7091319,'2024-10-06 10:44:42.349443','2024-10-06 08:46:31.349443',25,59,1),(0,'2024-10-10 09:07:47.039331',260,'2024-10-10 09:07:47.005000','2024-10-10 09:07:20.627000',1,60,7),(873.128,'2024-09-30 09:36:08.000000',4114702,'2024-09-30 10:44:42.349443','2024-09-30 09:36:08.349443',2,61,7),(468.664,'2024-10-01 09:31:21.000000',4401005,'2024-10-01 10:44:42.349443','2024-10-01 09:31:21.349443',28,62,7),(503.172,'2024-10-02 09:47:28.000000',3434372,'2024-10-02 10:44:42.349443','2024-10-02 09:47:28.349443',26,63,7),(301.743,'2024-10-03 09:56:54.000000',2868235,'2024-10-03 10:44:42.349443','2024-10-03 09:56:54.349443',25,64,7),(731.887,'2024-10-04 09:27:57.000000',4605418,'2024-10-04 10:44:42.349443','2024-10-04 09:27:57.349443',15,65,7),(449.404,'2024-10-05 10:04:42.000000',2400420,'2024-10-05 10:44:42.349443','2024-10-05 10:04:42.349443',5,66,7),(757.567,'2024-10-06 08:46:31.000000',7091319,'2024-10-06 10:44:42.349443','2024-10-06 08:46:31.349443',25,67,7),(0,'2024-10-10 09:08:54.039730',320,'2024-10-10 09:08:54.004000','2024-10-10 09:08:08.116000',1,68,7),(0,'2024-10-10 09:10:04.146232',1270,'2024-10-10 09:10:03.962000','2024-10-10 09:10:01.228000',24,69,1),(0,'2024-10-10 09:18:35.131754',1320,'2024-10-10 09:18:34.947000','2024-10-10 09:18:31.063000',23,70,1),(0,'2024-10-10 09:25:55.996748',9370,'2024-10-10 09:25:55.919000','2024-10-10 09:25:21.179000',4,71,2),(731.887,'2024-10-07 09:27:57.000283',4605418,'2024-10-07 10:44:42.349443','2024-10-07 09:27:57.349443',15,72,1),(449.404,'2024-10-08 10:04:42.000283',2400420,'2024-10-08 10:44:42.349443','2024-10-08 10:04:42.349443',5,73,1),(757.567,'2024-10-09 08:46:31.000283',7091319,'2024-10-09 10:44:42.349443','2024-10-09 08:46:31.349443',25,74,1),(731.887,'2024-10-07 09:27:57.000283',4605418,'2024-10-07 10:44:42.349443','2024-10-07 09:27:57.349443',15,76,3),(449.404,'2024-10-08 10:04:42.000283',2400420,'2024-10-08 10:44:42.349443','2024-10-08 10:04:42.349443',5,77,3),(0,'2024-10-10 10:16:23.761058',6840,'2024-10-10 10:16:22.186000','2024-10-10 10:16:13.421000',1,80,6),(0,'2024-10-10 10:37:57.170357',9100,'2024-10-10 10:37:57.043000','2024-10-10 10:37:46.473000',4,81,7),(0,'2024-10-10 11:16:47.752987',22060,'2024-10-10 11:16:47.631000','2024-10-10 11:16:18.596000',2,82,2),(0,'2024-10-10 11:22:27.858177',2430,'2024-10-10 11:22:27.750000','2024-10-10 11:22:22.859000',1,83,2),(401.8,'2024-10-10 11:23:18.666690',2511550,'2024-10-10 11:23:19.130000','2024-10-10 10:37:04.350000',4,84,5),(0,'2024-10-10 11:50:03.349436',1030,'2024-10-10 11:50:03.103000','2024-10-10 11:50:02.033000',8,85,1),(0,'2024-10-10 13:23:13.073230',6640,'2024-10-10 13:23:12.776000','2024-10-10 13:23:04.875000',11,86,1),(0,'2024-10-10 13:23:49.718788',4750,'2024-10-10 13:23:49.426000','2024-10-10 13:23:43.201000',3,87,1),(0,'2024-10-10 14:29:56.894440',9760,'2024-10-10 14:29:56.591000','2024-10-10 14:29:15.498000',1,89,7),(500,'2024-10-01 13:12:12.123123',2511550,'2024-10-01 14:23:14.123123','2024-10-01 14:33:51.151000',4,91,5),(0,'2024-10-10 16:21:04.104536',50790,'2024-10-10 16:21:02.184000','2024-10-10 16:12:01.960000',5,92,6),(17.64,'2024-10-10 17:28:36.999001',226080,'2024-10-10 17:28:35.106000','2024-10-10 17:16:19.524000',28,93,6),(51.0825,'2024-10-10 17:56:51.931216',333090,'2024-10-10 17:56:50.030000','2024-10-10 17:44:10.100000',5,95,6),(0,'2024-10-10 20:09:28.572378',22970,'2024-10-10 20:09:28.427000','2024-10-10 20:09:13.796000',2,96,2),(0,'2024-10-10 20:16:09.858926',11000,'2024-10-10 20:16:09.713000','2024-10-10 20:16:02.963000',4,97,2),(0,'2024-10-10 21:09:10.017375',50030,'2024-10-10 21:09:10.479000','2024-10-10 20:51:46.936000',8,98,11),(11.2,'2024-10-10 22:15:22.342005',70590,'2024-10-10 22:15:22.028000','2024-10-10 22:14:10.489000',4,99,5),(0,'2024-10-11 03:30:44.203316',38430,'2024-10-11 03:30:43.993000','2024-10-11 03:30:03.981000',4,102,2),(0,'2024-10-11 09:10:59.715551',12840,'2024-10-11 09:10:59.572000','2024-10-11 09:10:43.534000',4,105,2),(280,'2024-10-11 10:43:23.360072',104450,'2024-10-11 10:43:22.162000','2024-10-11 10:41:37.176000',2,108,15),(0,'2024-10-11 10:43:48.086369',12600,'2024-10-11 10:43:48.537000','2024-10-11 10:43:33.819000',4,109,3);
/*!40000 ALTER TABLE `ExerciseHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FavoredExercise`
--

DROP TABLE IF EXISTS `FavoredExercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FavoredExercise` (
  `exercise_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmls5w0s8xnldy8qi50i2spbd7` (`exercise_id`),
  KEY `FK9pbqo71vqt27m73k98r0x1in7` (`user_id`),
  CONSTRAINT `FK9pbqo71vqt27m73k98r0x1in7` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`),
  CONSTRAINT `FKmls5w0s8xnldy8qi50i2spbd7` FOREIGN KEY (`exercise_id`) REFERENCES `Exercise` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FavoredExercise`
--

LOCK TABLES `FavoredExercise` WRITE;
/*!40000 ALTER TABLE `FavoredExercise` DISABLE KEYS */;
INSERT INTO `FavoredExercise` VALUES (1,6,5),(2,7,5),(3,8,5),(4,9,5),(5,10,5),(1,11,1),(2,12,1),(3,13,1),(4,14,1),(5,15,1),(4,16,3),(21,17,3),(29,18,3),(4,19,3),(7,20,3),(16,21,3),(29,22,3),(12,23,3),(22,24,3),(29,25,3),(4,26,3),(22,27,3),(28,28,3),(8,29,1),(22,30,1),(12,31,1),(22,32,1),(23,33,1),(1,34,2),(2,35,2),(5,36,2),(8,37,2),(4,38,3),(14,39,3),(22,40,3),(29,41,3),(15,42,1),(2,43,1),(4,44,6),(5,45,6),(15,46,6),(27,47,6),(29,48,6),(16,49,1),(1,55,7),(3,56,7),(28,57,7),(29,58,7),(30,59,7),(1,65,12),(3,66,12),(5,67,12),(12,68,12),(22,69,12),(1,70,11),(7,71,11),(16,72,11),(17,73,11),(21,74,11),(1,75,14),(4,76,14),(15,77,14),(16,78,14),(28,79,14),(11,80,15),(14,81,15),(22,82,15),(23,83,15),(28,84,15);
/*!40000 ALTER TABLE `FavoredExercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `MealCalories`
--

DROP TABLE IF EXISTS `MealCalories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `MealCalories` (
  `calories` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `mealCount` int NOT NULL,
  `mealType` enum('BALANCED','FAST_FOOD_PROCESSED','HIGH_MEAT_CARB','VEGETARIAN') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `MealCalories`
--

LOCK TABLES `MealCalories` WRITE;
/*!40000 ALTER TABLE `MealCalories` DISABLE KEYS */;
INSERT INTO `MealCalories` VALUES (600,1,1,'VEGETARIAN'),(700,2,1,'BALANCED'),(800,3,1,'HIGH_MEAT_CARB'),(900,4,1,'FAST_FOOD_PROCESSED'),(1200,5,2,'VEGETARIAN'),(1400,6,2,'BALANCED'),(1600,7,2,'HIGH_MEAT_CARB'),(1800,8,2,'FAST_FOOD_PROCESSED'),(1800,9,3,'VEGETARIAN'),(2100,10,3,'BALANCED'),(2400,11,3,'HIGH_MEAT_CARB'),(2700,12,3,'FAST_FOOD_PROCESSED'),(2400,13,4,'VEGETARIAN'),(2800,14,4,'BALANCED'),(3200,15,4,'HIGH_MEAT_CARB'),(3600,16,4,'FAST_FOOD_PROCESSED');
/*!40000 ALTER TABLE `MealCalories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Notification`
--

DROP TABLE IF EXISTS `Notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Notification` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) DEFAULT NULL,
  `additionalData` json DEFAULT NULL,
  `checkedTime` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `notificationStatus` enum('DELETED','READ','UNREAD') DEFAULT NULL,
  `notificationType` enum('BATTLE','QUEST','SURVEY') DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK47qcspfhqn5gd49dylmnu31fb` (`user_id`),
  CONSTRAINT `FK47qcspfhqn5gd49dylmnu31fb` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Notification`
--

LOCK TABLES `Notification` WRITE;
/*!40000 ALTER TABLE `Notification` DISABLE KEYS */;
INSERT INTO `Notification` VALUES (1,'2024-10-11 11:26:15.083436','{\"questDetail\": {\"type\": \"INDIVIDUAL\", \"coins\": 50, \"title\": \"매일 몸무게 입력하기\", \"questId\": 3}}',NULL,'\'매일 몸무게 입력하기\' 퀘스트를 달성했어요.','UNREAD','QUEST',3),(2,'2024-10-11 11:38:47.161081','{\"questDetail\": {\"type\": \"INDIVIDUAL\", \"coins\": 50, \"title\": \"매일 몸무게 입력하기\", \"questId\": 1}}','2024-10-11 11:38:58.105052','\'매일 몸무게 입력하기\' 퀘스트를 달성했어요.','READ','QUEST',1);
/*!40000 ALTER TABLE `Notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parts`
--

DROP TABLE IF EXISTS `Parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parts` (
  `cost` int DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `partsImage` varchar(255) DEFAULT NULL,
  `partsType` enum('ARM','BODY','HAIR','LEG','NONE','PANTS') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parts`
--

LOCK TABLES `Parts` WRITE;
/*!40000 ALTER TABLE `Parts` DISABLE KEYS */;
INSERT INTO `Parts` VALUES (0,'2024-10-02 13:38:54.201172',1,'basic','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/65330d21-38f7-4196-9ee5-cb813b8ecc8d.png','NONE'),(120,'2024-10-02 13:40:35.798862',2,'NaSeonWookPants','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/pants1.png','PANTS'),(900,'2024-10-03 14:40:22.849851',3,'clothes1','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/clothes1.png','BODY'),(900,'2024-10-03 14:41:27.228751',4,'clothes2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/clothes2.png','BODY'),(900,'2024-10-03 14:41:39.040278',5,'clothes3','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/clothes3.png','BODY'),(900,'2024-10-03 14:41:50.776384',6,'clothes4','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/clothes4.png','BODY'),(800,'2024-10-03 14:42:21.109024',7,'hair1','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/hair1.png','HAIR'),(800,'2024-10-03 14:43:35.439970',8,'hair2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/hair2.png','HAIR'),(800,'2024-10-03 14:43:47.873689',9,'hair3','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/hair3.png','HAIR'),(800,'2024-10-03 14:43:56.328773',10,'hair4','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/hair4.png','HAIR'),(700,'2024-10-03 14:48:46.720020',13,'pansts2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/pants2.png','PANTS'),(700,'2024-10-03 14:48:57.719848',14,'pansts3','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/pants3.png','PANTS'),(700,'2024-10-03 14:49:08.541666',15,'pansts4','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/pants4.png','PANTS'),(700,'2024-10-03 14:50:02.610119',16,'shoes1','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/item1.png','LEG'),(700,'2024-10-03 14:51:49.110667',17,'shoes2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/item2.png','LEG'),(700,'2024-10-03 14:52:28.516907',18,'band1','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/item3.png','ARM'),(700,'2024-10-03 14:52:45.699147',19,'band2','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/parts/item4.png','ARM');
/*!40000 ALTER TABLE `Parts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Quest`
--

DROP TABLE IF EXISTS `Quest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Quest` (
  `completionCoins` int NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `period` enum('DAILY','MONTHLY','WEEKLY') NOT NULL,
  `type` enum('CREW','INDIVIDUAL') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Quest`
--

LOCK TABLES `Quest` WRITE;
/*!40000 ALTER TABLE `Quest` DISABLE KEYS */;
INSERT INTO `Quest` VALUES (50,'2024-09-27 17:49:43.395109',1,'매일 몸무게 입력하기','DAILY','INDIVIDUAL'),(50,'2024-09-27 17:50:07.004510',2,'하루 한 번 운동하기','DAILY','INDIVIDUAL'),(50,'2024-09-27 17:52:40.573372',3,'2주 이상 출석 도장 찍기','MONTHLY','INDIVIDUAL'),(30,'2024-09-30 10:24:51.510417',4,'크루 내 2명 이상의 팀원 하루에 합산 1시간 이상 운동하기','DAILY','CREW');
/*!40000 ALTER TABLE `Quest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RankHistory`
--

DROP TABLE IF EXISTS `RankHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RankHistory` (
  `activityScore` float DEFAULT NULL,
  `basicScore` float DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `ranking` int DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `crew_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKikw7qvsi3lqnab8lpcq32hqjs` (`crew_id`),
  KEY `FKdwboks13df4w6qy4g4v3bm3r5` (`user_id`),
  CONSTRAINT `FKdwboks13df4w6qy4g4v3bm3r5` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`),
  CONSTRAINT `FKikw7qvsi3lqnab8lpcq32hqjs` FOREIGN KEY (`crew_id`) REFERENCES `Crew` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RankHistory`
--

LOCK TABLES `RankHistory` WRITE;
/*!40000 ALTER TABLE `RankHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `RankHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RecommendedExercise`
--

DROP TABLE IF EXISTS `RecommendedExercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RecommendedExercise` (
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `description` text,
  `exerciseName` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKb1r0054vf99bmgki3h1anx08x` (`user_id`),
  CONSTRAINT `FKb1r0054vf99bmgki3h1anx08x` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=391 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RecommendedExercise`
--

LOCK TABLES `RecommendedExercise` WRITE;
/*!40000 ALTER TABLE `RecommendedExercise` DISABLE KEYS */;
INSERT INTO `RecommendedExercise` VALUES ('2024-10-08 20:50:59.548987',1,5,'두 발 어깨너비로 벌리고 무릎을 굽히며 엉덩이를 뒤로 빼고 앉았다 일어나는 동작입니다.','스쿼트','스쿼트는 하체 근육을 강화해 걷기, 계단 오르기, 농구에서의 점프력 향상에 도움을 줍니다.'),('2024-10-08 20:50:59.556695',2,5,'팔꿈치를 바닥에 대고 몸을 일직선으로 유지하며 버티는 자세입니다.','플랭크','코어 근육을 강화해 균형과 안정성을 높이며 농구와 등산 시 유용하게 작용합니다.'),('2024-10-08 20:50:59.557672',3,5,'자전거를 타면서 심박수를 올리고 지속적으로 페달을 밟는 운동입니다.','자전거 타기','하체 근력을 키우고 심폐 지구력을 향상시켜 달리기 및 등산과 잘 어울립니다.'),('2024-10-08 20:50:59.558664',4,5,'다양한 자세로 몸의 유연성과 근력을 증진시키는 운동입니다.','요가','유연성을 향상시키고 근육 회복을 도와 운동 후 스트레칭으로 효과적입니다.'),('2024-10-08 20:50:59.559657',5,5,'달리는 속도를 점진적으로 높이며 일정 시간 계속 달리는 훈련입니다.','프로그레시브 런닝','달리기와 관련된 심혈관 운동을 증가시키고 지구력을 향상시킵니다.'),('2024-10-08 21:10:43.609514',6,1,'두 발을 어깨 너비로 벌리고, 무릎을 굽히며 엉덩이를 뒤로 빼면서 앉았다 일어나는 동작입니다.','스쿼트','스쿼트는 하체 근육을 강화하여 달리기, 계단 오르기, 농구 등에서의 능력을 향상시켜 줍니다.'),('2024-10-08 21:10:43.610838',7,1,'엎드린 자세에서 팔꿈치와 발끝으로 몸을 지탱하며 일직선을 유지하는 자세입니다.','플랭크','코어 근육을 강화하여 복싱, 테니스, 농구 등의 운동에서 안정성을 높여줍니다.'),('2024-10-08 21:10:43.611629',8,1,'종류에 따라 다양한 자세를 통해 몸과 마음의 균형을 맞추는 운동입니다.','요가','유연성을 증진시키고 스트레칭 효과로 근육의 회복력을 높여, 달리기나 등산 후 몸의 긴장을 풀어줍니다.'),('2024-10-08 21:10:43.612355',9,1,'물속에서 음악에 맞춰 다양한 동작을 수행하는 에어로빅입니다.','수중 에어로빅','관절에 무리가 가지 않으면서 전신 근육을 사용해 심폐지구력을 향상시켜 수영 능력을 높입니다.'),('2024-10-08 21:10:43.613146',10,1,'주먹과 발차기를 사용하여 대련 또는 구 punches를 연습하는 운동입니다.','킥복싱','전신 근력을 강화하고, 스피드 및 민첩성을 향상시켜 복싱 및 다른 스포츠에 도움이 됩니다.'),('2024-10-08 21:10:51.350182',11,1,'바벨을 바닥에서 들어올리는 동작으로, 허리와 다리를 동시에 사용해 힘을 기릅니다.','데드리프트','데드리프트는 하체와 등 근육을 강화해 농구, 계단 오르기, 등산에서의 힘과 지구력을 높이는 데 도움을 줍니다.'),('2024-10-08 21:10:51.355444',12,1,'손과 발을 바닥에 대고 몸을 일직선으로 유지하며 팔을 굽혔다 펴는 운동입니다.','상체 푸쉬업','푸쉬업은 상체와 코어 근육을 강화해 복싱, 테니스에서의 스윙 및 힘 전달 능력을 향상시킵니다.'),('2024-10-08 21:10:51.356495',13,1,'음악에 맞춰 에너제틱한 춤을 추며 몸을 움직이는 그룹 운동입니다.','줌바','줌바는 유산소 운동으로, 다양한 댄스 동작이 포함되어 있어 에어로빅과 농구의 체력을 개선하고 스트레스를 해소하는 데 도움이 됩니다.'),('2024-10-08 21:10:51.357253',14,1,'특별한 기구나 매트를 이용해 체형 교정과 근력 강화를 하는 운동입니다.','필라테스','필라테스는 코어 근육을 강화함으로써 수영과 테니스에서의 몸의 안정성을 높이는 데 좋습니다.'),('2024-10-08 21:10:51.359366',15,1,'자전거를 타고 정해진 코스를 주행하며 심혈관 운동을 하는 방식입니다.','사이클링','사이클링은 다리 근력과 심폐 지구력을 키워 달리기와 자전거를 더욱 효과적으로 즐길 수 있게 해줍니다.'),('2024-10-08 21:32:44.632508',16,1,'서 있던 자세에서 스쿼트를 하고 팔을 바닥에 대고 점프, 다시 일어서는 동작을 반복합니다.','버피','전신 운동으로, 심폐 지구력을 기르고 근력을 강화하는 데 도움을 주며 농구나 복싱을 할 때 필요한 빠른 반응과 체력 향상에 기여합니다.'),('2024-10-08 21:32:44.636968',17,1,'덤벨이나 바벨을 들고 몸을 앞으로 기울이며 팔을 당겨 등 근육을 사용하는 운동입니다.','로우','등근육과 팔을 강화시켜 농구와 수영에서의 효율적인 팔 움직임을 개선합니다.'),('2024-10-08 21:32:44.638211',18,1,'복싱 기술과 킥을 결합한 훈련으로, 타격, 발차기 및 방어 기술을 연습합니다.','킥복싱','심폐 지구력을 높이고 반사신경을 향상시켜 복싱과 유사한 운동을 즐길 수 있기 때문입니다.'),('2024-10-08 21:32:44.639561',19,1,'신나는 음악에 맞춰 다양한 댄스 동작을 따라 하는 유산소 운동입니다.','댄스 카드io','다양한 비트를 따라 춤추며 심박수를 높이고 전신을 사용하여 에어로빅과 유사한 효과를 줍니다.'),('2024-10-08 21:32:44.641024',20,1,'실내 또는 야외의 클라이밍 벽을 올라가는 운동으로, 팔과 다리의 힘을 사용합니다.','클라이밍','근력과 지구력을 동시에 향상시켜 등산과 유사한 동작으로, 몸의 조정력도 강화할 수 있습니다.'),('2024-10-08 21:47:41.164904',21,1,'바에 매달린 후 팔을 굽혀 몸을 올린다.','풀업','전신에 근육을 사용하여 상체와 등 근육을 강화하는 데 도움을 주어, 농구와 복싱에서의 성능을 향상시킬 수 있습니다.'),('2024-10-08 21:47:41.166864',22,1,'바벨을 바닥에서 들어올리며 자세를 유지하는 운동이다.','데드리프트','하체와 코어를 강화하여 계단 오르기, 달리기 및 테니스와 같은 활동에서의 힘을 증가시킬 수 있습니다.'),('2024-10-08 21:47:41.168067',23,1,'다양한 운동을 조합하여 높은 강도로 시행하는 고강도 운동 프로그램이다.','크로스핏','체력과 순발력을 높여 농구와 복싱에서 필요한 강한 운동 능력을 개발하는 데 효과적입니다.'),('2024-10-08 21:47:41.169359',24,1,'스쿼트, 런지, 레그 프레스 등을 순차적으로 실시하는 운동이다.','하체 서킷','하체 근력을 강화하여 걷기, 계단 오르기, 등산 등의 운동 능력을 증진시킬 수 있습니다.'),('2024-10-08 21:47:41.175622',25,1,'빠른 비트의 음악에 맞춰 고강도 댄스 동작을 하는 운동이다.','줌바','유산소 운동을 통해 전체적인 체력과 민첩성을 높여 다양한 스포츠 활동에 도움이 됩니다.'),('2024-10-08 21:50:52.358404',26,1,'짧은 시간 동안 최대 강도로 운동하고, 그 다음 짧은 휴식을 반복하는 운동 방식입니다.','HIIT (고강도 인터벌 트레이닝)','농구와 복싱처럼 빠른 스피드와 민첩성을 필요로 하는 운동과 잘 어울리며, 체지방 감소와 심폐 지구력을 향상시킵니다.'),('2024-10-08 21:50:52.360753',27,1,'양손에 덤벨을 들고 상체를 앞으로 기울인 다음, 팔을 굽혀 덤벨을 배쪽으로 끌어올리는 운동입니다.','덤벨 로우','테니스나 농구처럼 상체의 힘과 안정성을 향상시켜 줍니다. 상체 근력을 키우는데 효과적입니다.'),('2024-10-08 21:50:52.362011',28,1,'줄을 이용해 반복적으로 뛰어오르는 운동으로, 리듬을 맞춰 주기적으로 하는 것이 특징입니다.','줄넘기','에어로빅이나 복싱처럼 유산소 운동을 재미있게 할 수 있으며, 전신 근육을 사용하는 운동입니다.'),('2024-10-08 21:50:52.363244',29,1,'두 명 이상의 참가자가 네트를 사이에 두고 셔틀콕을 치는 스포츠입니다.','배드민턴','테니스와 비슷한 운동으로, 반사 신경과 스피드를 향상시켜줍니다. 주의력을 높이고 재미를 더해줍니다.'),('2024-10-08 21:50:52.364317',30,1,'발차기를 추가한 복싱 운동으로, 다양한 운동 기술을 조합하여 수행하는 운동입니다.','킥복싱 (변형툭)','복싱과 많은 유사성을 가지면서 하체 근력을 추가로 강화하여 전반적인 체력 증진을 도와줍니다.'),('2024-10-08 22:04:12.891970',31,1,'로잉 머신에 앉아 발판에 발을 올리고 손잡이를 잡은 후 팔과 다리를 사용해 좌우로 당기며 운동합니다.','로잉 머신','농구, 수영 등에서 필요한 전신 근력과 지구력을 향상시켜줍니다.'),('2024-10-08 22:04:12.938659',32,1,'두 다리를 어깨너비로 벌리고 케틀벨을 두 손으로 잡은 뒤, 엉덩이를 뒤로 빼면서 스윙 운동을 합니다.','케틀벨 스윙','하체 근력과 코어를 강화하여 계단 오르기, 등산 등에서의 힘과 지구력을 증진시킵니다.'),('2024-10-08 22:04:12.941015',33,1,'다양한 킥과 펀치를 조합해서 빠른 템포로 수행하며 체력을 증진시킵니다.','킥복싱 (새로운 스타일)','기존의 킥복싱에서 더 다양한 스킬을 배워 흥미를 더하고, 유산소 운동 효과를 높입니다.'),('2024-10-08 22:04:12.942989',34,1,'자연 속에서 경치를 즐기며 다양한 경사를 오르내리는 운동입니다.','하이킹','등산 경험을 더욱 즐겁게하고, 다양한 지형에서의 운동 능력을 향상시킵니다.'),('2024-10-08 22:04:12.944512',35,1,'바닥이나 특수 장비에서 코어 근육을 사용하여 다양한 동작을 수행하는 운동입니다.','필라테스 (변형)','코어 근육을 강화하여 농구, 테니스의 스윙이나 움직임에 더 나은 안정성을 제공합니다.'),('2024-10-08 22:05:25.078325',36,1,'팔을 뻗고 점프한 후, 다리를 뒤로 보내 푸쉬업 자세를 만들고, 다시 제자리로 돌아오면서 점프합니다.','버피','버피는 전신 운동으로 유산소 능력을 향상시켜 주며, 농구와 달리기에서의 체력과 반응속도를 높이는 데 도움이 됩니다.'),('2024-10-08 22:05:25.080517',37,1,'발을 어깨 너비로 벌리고 바닥에서 발꿈치를 들어올려 종아리를 수축시킨 후 다시 내립니다.','스탠딩 칼프 레이즈','종아리 근육을 강화하여 등산과 계단 오르기를 더욱 수월하게 해줍니다.'),('2024-10-08 22:05:25.082127',38,1,'기본 킥과 스트라이크를 연습하며, 계속해서 움직이며 다양한 각도에서 공격을 합니다.','킥복싱 (기본 동작)','킥복싱은 빠른 발과 반사신경을 기르는데 도움을 주며, 농구와 테니스에서의 기민함을 크게 향상시킵니다.'),('2024-10-08 22:05:25.083514',39,1,'여러 종류의 음악에 맞춰 기본 동작을 따라하며 심박수를 높이는 동작을 반복합니다.','유산소 댄스','유산소 댄스는 심폐 지구력을 향상시키고, 에어로빅과 춤을 통해 즐거운 방법으로 운동할 수 있습니다.'),('2024-10-08 22:05:25.084890',40,1,'몸을 옆으로 눕히고 팔로 지지하며, 상체를 들어올려 옆으로 플랭크 자세를 유지합니다.','사이드 플랭크','코어 근육을 강화하여 복싱과 테니스의 회전력을 높이고, 자세를 유지하는 데 도움을 줍니다.'),('2024-10-08 22:06:04.964989',41,1,'두 손에 덤벨을 들고 양발을 어깨 너비로 벌리고, 무릎을 굽혀 앉았다 일어나는 동작입니다.','덤벨 스쿼트','덤벨 스쿼트는 하체 근력을 강화해 줍니다. 걷기, 계단 오르기, 런닝, 등산과 같은 하체 운동에 도움이 됩니다.'),('2024-10-08 22:06:04.967083',42,1,'팔을 어깨 넓이로 벌리고 복부를 긴장시킨 채 바닥에 몸을 내려서 다시 올리는 동작입니다.','푸쉬업','푸쉬업은 상체 근력을 강화하며, 농구, 복싱, 테니스와 같은 운동에서 팔과 상체의 힘을 필요한데 좋습니다.'),('2024-10-08 22:06:04.968363',43,1,'즉각적인 반응을 요구하는 격한 연습으로, 상대방과 몸을 움직이며 실전처럼 연습합니다.','킥복싱 스파링','킥복싱 스파링은 유연성과 반응속도를 기르며, 복싱 연습에 매우 효과적입니다.'),('2024-10-08 22:06:04.969587',44,1,'자연 환경 속에서 자전거를 타고 다양한 경사를 경험하며 운동합니다.','야외 사이클링','자전거 타기는 하체 근력을 강화하고 유산소 운동 효과도 얻을 수 있어 자전거를 좋아하는 사람에게 좋습니다.'),('2024-10-08 22:06:04.970858',45,1,'두 명 이상이 네트를 사이에 두고 셔틀콕을 치며 경기를 진행하는 스포츠입니다.','배드민턴','배드민턴은 단거리 스프린트와 민첩성을 요구하며, 테니스와 비슷한 기술을 필요로 하여 테니스 기술 향상에 도움을 줍니다.'),('2024-10-08 22:06:28.161164',46,1,'한쪽 다리를 앞에 두고 무릎을 굽혀 내려갔다가 다시 일어서는 동작을 번갈아 가며 수행합니다.','런지','여러 방향으로 다리 근육을 강화하여 농구 및 테니스와 같은 운동에서의 기동성 향상에 기여합니다.'),('2024-10-08 22:06:28.163183',47,1,'여러 가지 운동(푸쉬업, 버피, 점핑잭 등)을 짧은 시간 동안 고강도로 연속으로 수행하는 훈련입니다.','서킷 트레이닝','심폐 지구력과 전신 근력을 동시에 향상시켜 다양한 유산소 운동과 복싱에 유용합니다.'),('2024-10-08 22:06:28.164548',48,1,'구간을 따라 걷거나 오르는 활동으로 다양한 지형에서 진행할 수 있습니다.','하이킹','자연 속에서의 경치를 즐기며 심폐 기능과 하체 근력을 동시에 키울 수 있어 등산을 보완합니다.'),('2024-10-08 22:06:28.165991',49,1,'샌드백에 펀치를 날리고 다양한 조합을 반복하여 진행합니다.','복싱 샌드백 운동','강한 펀치력과 반사 신경을 키워 복싱 기술 향상에 도움이 되며, 스트레스 해소에도 효과적입니다.'),('2024-10-08 22:06:28.167222',50,1,'수영장 안에서 보조 기구를 사용하여 러닝 동작을 반복하는 운동입니다.','수중 러닝','관절에 부담을 덜 주면서 전신 운동을 할 수 있어 수영과 유사한 효과를 누릴 수 있습니다.'),('2024-10-08 22:07:23.474471',51,1,'일반 푸쉬업에서 손 위치나 다리 각도를 변화시켜 다양한 근육을 사용합니다.','푸쉬업 변형','팔과 어깨 근육을 강화하여 농구, 복싱, 테니스 같은 스포츠에서의 파워를 증가시킵니다.'),('2024-10-08 22:07:23.476509',52,1,'저항 밴드를 이용하여 다양한 저항 운동을 수행하여 전신 근육을 강화합니다.','저항 밴드 운동','다리와 상체 근육을 강화하여 걷기, 계단 오르기, 자전거 타기 같은 유산소 운동의 효율성을 높입니다.'),('2024-10-08 22:07:23.481234',53,1,'스텝과 잽, 훅 등 복싱 동작을 연습하며 운동합니다.','복싱 시뮬레이션 트레이닝','복싱의 기초 기술과 유산소 능력을 동시에 향상시켜 전반적인 체력을 증진시킵니다.'),('2024-10-08 22:07:23.482557',54,1,'댄스 동작과 필라테스 동작을 결합하여 진행하는 운동입니다.','댄스 필라테스','유연성을 향상시키고 코어 근육을 강화하여 다양한 스포츠 활동에 필요한 안정성을 제공합니다.'),('2024-10-08 22:07:23.483869',55,1,'바닥에 누워서 다리를 높이 들어올리고 천천히 아래로 내리는 운동입니다.','힙서기','코어와 하체 근육을 강화하여 등산 및 기타 활동에서 몸의 균형을 유지하는 데 도움을 줍니다.'),('2024-10-08 22:07:58.759654',56,1,'한 발씩 계단이나 높은 플랫폼에 올라섰다가 다시 내려오는 운동입니다.','스텝업','계단오르기와 유사한 동작으로 하체 근육을 강화하고 균형 감각을 향상시키는 데 도움을 줍니다.'),('2024-10-08 22:07:58.761539',57,1,'레그 프레스 기계에 앉아 발로 저항을 밀어내는 운동입니다.','레그 프레스','하체 근육을 집중적으로 강화하여 농구, 테니스, 복싱과 같은 운동에서 더 나은 힘과 속도를 발휘할 수 있게 도와줍니다.'),('2024-10-08 22:07:58.762832',58,1,'수영 중 하체를 이용하여 킥을 하는 운동입니다.','수영 킥','전신 근육을 사용하는 수영의 한 부분으로, 근지구력과 유연성을 향상시켜 달리기와 등산에 도움이 됩니다.'),('2024-10-08 22:07:58.764092',59,1,'음악에 맞춰 다양한 댄스 동작으로 구성된 유산소 운동입니다.','댄스 에어로빅','에어로빅의 요소를 포함하여 유산소 능력을 높이고, 복싱과 농구와 같은 기민한 움직임에 필요한 체력을 기르는 데 유익합니다.'),('2024-10-08 22:07:58.765288',60,1,'도로에서 자전거를 타며 다양한 경로와 조건에서 운동하는 방법입니다.','로드 사이클링','자전거 타기와 유사한 유산소 운동으로, 지구력을 높이고 하체 근력을 강화하는 데 효과적입니다.'),('2024-10-08 22:09:39.817500',61,1,'양 발을 어깨 너비로 벌리고, 무릎을 굽혀 엉덩이를 뒤로 빼며 내려갔다가 다시 일어나는 동작입니다.','체중 스쿼트','체중 스쿼트는 하체 근육을 강화하고 지구력을 향상시킵니다. 이는 계단 오르기와 농구, 등산 같은 활동에서 도움이 됩니다.'),('2024-10-08 22:09:39.819312',62,1,'기본 플랭크 자세에서 팔을 앞으로 뻗거나 옆으로 이동하며 코어를 유지하는 동작입니다.','플랭크 변형','플랭크 변형은 복근과 코어를 강화하여 복싱, 테니스, 농구에서의 안정성과 힘을 증가시킵니다.'),('2024-10-08 22:09:39.820544',63,1,'작은 코트에서 배드민턴 셔틀콕을 라켓으로 치며 상대방의 코트에 보내는 경기입니다.','배드민턴','배드민턴은 반사 신경과 유연성을 증가시키며, 테니스와 비슷한 운동을 통해 전신 운동 효과를 줍니다.'),('2024-10-08 22:09:39.821681',64,1,'음악에 맞춰 저강도의 반복 동작을 통해 신체를 움직이며 진행하는 운동입니다.','저강도 에어로빅','저강도 에어로빅은 심혈관 건강과 지구력 향상에 도움을 주며, 다양한 유산소 운동을 포함하여 즐길 수 있습니다.'),('2024-10-08 22:09:39.823821',65,1,'이중으로 나누어진 로프를 양 손으로 잡고 점프하며 회전시키는 동작입니다.','로프 점프','로프 점프는 심장 강화와 지구력 향상에 도움을 주며, 복싱과 농구의 민첩성에 도움이 됩니다.'),('2024-10-08 22:10:02.302779',66,1,'양손에 메디신 볼을 들고, 위로 들어 올린 후 빠르게 바닥으로 내리치며 힘을 쏟습니다.','메디신 볼 슬램','농구와 복싱에서 필요한 상체 힘을 키우고, 전신의 협응력을 향상시킵니다.'),('2024-10-08 22:10:02.304785',67,1,'두 발을 어깨 너비로 벌리고 케틀벨을 양손으로 잡고, 엉덩이를 뒤로 밀며 스윙합니다.','케틀벨 스윙','전신 운동으로, 하체와 코어의 강화를 도와줍니다. 등산과 달리기에서 필요한 근력을 길러줍니다.'),('2024-10-08 22:10:02.306044',68,1,'팔과 다리를 교차하며 땅에 닿게 하여 스트레칭합니다.','스파이더맨 스트레치','테니스와 복싱의 기동성을 향상시키며, 유연성을 높여 부상 예방에 효과적입니다.'),('2024-10-08 22:10:02.307199',69,1,'제자리에서 무릎을 높이 올리며 빠르게 뛰어 줍니다.','하이 니즈 (High Knees)','뛰면서 무릎을 높이 들어올리는 이 운동은 달리기와 에어로빅의 심폐지구력을 향상시킵니다.'),('2024-10-08 22:10:02.308233',70,1,'양팔과 다리를 동시에 벌려 점프한 후, 제자리로 돌아오는 동작을 반복합니다.','점핑 잭','유산소 운동으로 심폐 기능을 높이며, 전체적인 체력과 민첩성을 개선합니다. 농구와 복싱에서 유용합니다.'),('2024-10-08 22:42:31.537317',71,1,'TRX 스트랩을 사용해 몸을 수평으로 유지하며 몸을 당기는 운동입니다.','TRX 로우','상체 및 코어 근육을 강화하여 농구와 복싱에서의 움직임과 지구력을 향상시킵니다.'),('2024-10-08 22:42:31.542107',72,1,'바벨을 이용해 가슴 위에서 앞으로 눕고, 바벨을 가슴으로 내렸다가 다시 밀어 올리는 운동입니다.','벤치 프레스','상체 근육을 강화해 테니스와 복싱에서의 파워를 증대시킵니다.'),('2024-10-08 22:42:31.543605',73,1,'네트를 사이에 두고 상대방과 셔틀콕을 주고받는 라켓 스포츠입니다.','배드민턴','지구력과 반사 신경을 필요로 하며, 상대와의 경쟁을 통해 농구 및 테니스 기술을 향상시킬 수 있습니다.'),('2024-10-08 22:42:31.544867',74,1,'줄을 잡고 양발로 번갈아가며 줄을 넘으며 연속적으로 점프하는 운동입니다.','줄넘기','심혈관 지구력을 개선하고 발빠른 발 움직임을 위해 뛰는 능력을 향상시킵니다. 이는 달리기와 복싱에 도움이 됩니다.'),('2024-10-08 22:42:31.546257',75,1,'스위스 볼 위에 손을 놓고, 몸을 아래로 내렸다가 다시 밀어 올리는 강화 운동입니다.','스위스 볼 푸쉬업','불안정한 표면에서 코어를 키우며 전체 팔과 가슴 근육을 발달시킵니다. 이는 다양한 스포츠에서의 힘과 균형을 개선합니다.'),('2024-10-08 22:46:21.496940',76,1,'인공 벽이나 자연 암벽을 올라가며 힘과 기술을 사용합니다.','클라이밍','클라이밍은 근력과 지구력을 동시에 발달시켜 주어 농구와 등산 등 다양한 운동을 더 잘 할 수 있게 도와줍니다.'),('2024-10-08 22:46:21.501005',77,1,'덤벨을 양손에 쥐고 어깨 높이에서 시작하여 위로 밀어 올린 후 다시 내리는 운동입니다.','덤벨 숄더 프레스','어깨 및 상체 근력을 강화시켜 농구와 복싱에서의 스윙 동작과 샷을 개선해 줍니다.'),('2024-10-08 22:46:21.502293',78,1,'자연 환경 속에서 경사를 오르내리며 걷는 운동입니다.','하이킹','하이킹은 심폐 지구력을 키워주고 다리 근육을 강화시켜 등산과 걷기를 더 쉽게 할 수 있도록 도와줍니다.'),('2024-10-08 22:46:21.503437',79,1,'상대방과 서로의 발과 주먹을 사용해 싸우는 훈련입니다.','킥복싱 스파링','실제 상황에서의 킥복싱 스파링은 반사신경과 체력을 향상시켜 복싱 실력을 견고하게 하는 데 도움이 됩니다.'),('2024-10-08 22:46:21.504588',80,1,'줄을 양손으로 잡고 점프를 하며 회전시키는 운동입니다.','줄넘기','줄넘기는 전신 근육을 사용하면서 심박수를 높여 농구와 테니스 같은 빠른 움직임에 적응하는 데 효과적입니다.'),('2024-10-09 13:20:42.347222',81,3,'몸을 직선으로 유지하며 팔꿈치와 발끝으로 지지하는 자세로, 일정 시간 유지합니다.','플랭크','플랭크는 코어 근력을 강화하여 달리기와 탁구에서의 안정성을 높이는 데 도움이 됩니다.'),('2024-10-09 13:20:42.360916',82,3,'두 발을 어깨너비로 벌리고 무릎을 굽혀 앉는 자세에서 다시 일어나는 동작입니다.','스쿼트','스쿼트는 하체 근육을 강화하여 배드민턴과 테니스에서의 스윙 및 움직임을 개선합니다.'),('2024-10-09 13:20:42.362325',83,3,'다양한 자세를 차례대로 수행하여 근육을 늘리고 마음을 편안하게 합니다.','요가','요가는 유연성을 향상시키고 스트레스를 줄여 운동 후 회복에 도움이 됩니다.'),('2024-10-09 13:20:42.363783',84,3,'수영장을 이용해 다양한 수영 스타일로 체력을 기르는 운동입니다.','수영','수영은 전신 근육을 사용할 수 있어 부상의 위험 없이 체력을 키울 수 있습니다.'),('2024-10-09 13:20:42.365509',85,3,'주먹과 발을 이용해 상대방을 타격하는 동작을 포함하는 운동으로, 타격 기술과 유산소 운동이 결합된 훈련입니다.','킥복싱','킥복싱은 중강도 유산소 운동이며, 심폐 지구력을 키우고 스트레스를 해소하는 데 도움이 됩니다.'),('2024-10-09 13:24:37.957825',86,1,'설명: 서서 시작하여 스쿼트, 푸쉬업, 점프를 결합한 동작으로, 고강도 운동을 통해 심박수를 높입니다.','운동: 버피','이유: 버피는 전신 운동으로, 파워와 지구력을 동시에 향상시킬 수 있습니다. 농구, 복싱, 에어로빅과 같은 운동에서 필요한 체력을 기르는 데 도움이 됩니다.'),('2024-10-09 13:24:37.959618',87,1,'설명: 바벨을 바닥에서 어깨 높이까지 빠르게 들어올리는 운동으로, 다양한 근육군을 활성화합니다.','운동: 파워 클린','이유: 파워 클린은 전신의 근력을 강화하고 폭발적인 힘을 키우는 데 효과적입니다. 특히, 농구나 복싱처럼 빠른 반응과 파워가 필요한 운동과 잘 어울립니다.'),('2024-10-09 13:24:37.960670',88,1,'설명: 짧은 거리에서 최대한 빠르게 달리는 훈련으로, 전반적인 속도와 민첩성을 증가시킵니다.','운동: 스프린트 훈련','이유: 스프린트 훈련은 폭발적인 스피드를 요하는 달리기와 농구 등의 능력을 향상시키는 데 매우 중요한 요소입니다.'),('2024-10-09 13:24:37.961730',89,1,'설명: 고정 자전거 또는 실외에서 자전거를 타며 신체를 효과적으로 훈련합니다.','운동: 사이클링','이유: 사이클링은 하체 근력을 강화하고 심폐 지구력을 기르는 데 유용하며, 자전거와 같은 운동을 즐기는 분들에게 잘 맞습니다.'),('2024-10-09 13:24:37.962807',90,1,'설명: 스피드백과 다양한 패턴의 펀칭을 통해 힘과 정확성을 향상시키는 훈련입니다.','운동: 복싱 미트 훈련','이유: 복싱 미트 훈련은 반사 신경과 체력을 동시에 기르는 데 유리하며, 복싱 기술을 갈고닦는 데 도움을 줍니다.'),('2024-10-09 14:26:39.462587',91,7,'엎드린 자세에서 팔꿈치와 발끝으로 몸을 지탱하며 30초에서 1분 동안 유지합니다.','플랭크','코어 근육을 강화해 걷기와 농구에서의 안정성을 높이는 데 도움이 됩니다.'),('2024-10-09 14:26:39.464150',92,7,'발을 어깨너비로 벌리고, 무릎을 굽혀 엉덩이를 뒤로 빼며 앉아 똑바로 서는 동작을 반복합니다.','스쿼트','하체 근력과 지구력을 향상시켜 농구와 걷기에서의 수행력을 개선합니다.'),('2024-10-09 14:26:39.465153',93,7,'일정한 속도로 자전거를 타며, 30분 이상 지속하는 것을 목표로 합니다.','자전거 타기','저강도에서 중강도의 유산소 운동으로 심폐 지구력을 기르며 걷기와 농구의 체력을 보완합니다.'),('2024-10-09 14:26:39.466114',94,7,'다양한 자세(아사나)를 통해 몸의 긴장을 풀고 스트레스를 줄이는 운동입니다.','요가','부드러운 스트레칭과 호흡을 통해 유연성을 기르고 회복에 도움이 됩니다.'),('2024-10-09 14:26:39.467116',95,7,'20초 고강도 운동 후 10초 휴식을 반복하는 트레이닝으로, 여러 가지 운동을 조합하여 진행합니다.','HIIT (고강도 인터벌 트레이닝)','고강도 운동으로 체력과 근력을 동시에 키울 수 있어, 다른 운동의 성능 향상에 기여합니다.'),('2024-10-09 14:37:42.595860',96,3,'바벨을 바닥에서 수직으로 들어올리는 운동으로, 발을 어깨 너비로 벌리고 등을 곧게 편 상태에서 시작합니다.','데드리프트','데드리프트는 전신 근력 운동으로, 특히 하체와 코어를 강화하는 데 도움을 줍니다. 달리기 및 자전거와 같은 유산소 운동에 필요한 힘과 지구력을 향상시킬 수 있습니다.'),('2024-10-09 14:37:42.597777',97,3,'평평한 벤치에 누워 바벨을 가슴 위에서 들어올리는 운동입니다. 팔을 곧게 펴고 다시 내리는 동작을 반복합니다.','벤치프레스','벤치프레스는 상체 근력을 강화하는 데 효과적입니다. 테니스와 배드민턴에서의 스트로크에 필요한 팔의 힘과 안정성을 높여줍니다.'),('2024-10-09 14:37:42.598849',98,3,'줄을 잡고 양발로 번갈아 뛰어올르며 줄넘기를 하는 운동입니다.','줄넘기','줄넘기는 심폐 지구력을 향상시키고, 다양한 리듬감과 협응 능력을 길러줍니다. 이는 달리기와 에어로빅에서의 성능에 긍정적인 영향을 줄 수 있습니다.'),('2024-10-09 14:37:42.603025',99,3,'매트에서 다양한 움직임과 스트레칭을 통해 코어를 강화하고 유연성을 향상시키는 운동입니다.','필라테스','필라테스는 몸의 중심을 강화하고 유연성을 높여줍니다. 이는 테니스와 같은 스포츠에서의 움직임을 보다 효율적이고 부드럽게 만들어 줍니다.'),('2024-10-09 14:37:42.605095',100,3,'스텝박스 위에 올라가고 내려가는 동작을 반복하며 강도에 따라 다양한 변형 동작을 추가할 수 있습니다.','스텝 운동','스텝 운동은 다리와 엉덩이 근육을 강화하며, 심폐 지구력도 증진시켜 줍니다. 이는 배드민턴과 테니스에서의 민첩성을 향상시키는 데 도움이 됩니다.'),('2024-10-09 14:38:10.708015',101,3,'두 손으로 케틀벨을 잡고 엉덩이를 뒤로 밀며 무릎을 약간 구부린 상태에서 체중을 힙으로 이동한 후, 힘껏 케틀벨을 머리 위로 스윙하는 운동입니다.','케틀벨 스윙','케틀벨 스윙은 전신 근력을 강화하고, 스태미너를 향상시킵니다. 달리기와 배드민턴, 테니스를 할 때 필요한 체력을 기르는데 도움이 됩니다.'),('2024-10-09 14:38:10.711397',102,3,'바닥에 엎드린 자세에서 두 손으로 바닥을 지지하고 몸을 일으키며 팔을 굽혔다 펴는 운동입니다.','푸쉬업','푸쉬업은 상체 근력과 코어 강화를 돕습니다. 다양한 운동을 할 때, 특히 테니스와 탁구에서 상체의 힘이 중요하므로 유용합니다.'),('2024-10-09 14:38:10.712575',103,3,'줄넘기를 두 손으로 잡고 전후로 뛰면서 줄을 돌리는 운동입니다.','줄넘기','줄넘기는 심폐지구력을 향상시키고, 민첩성을 기르는 데 효과적입니다. 특히 에어로빅과 비슷한 운동 효과를 줄 수 있어 유익합니다.'),('2024-10-09 14:38:10.713697',104,3,'음악에 맞춰 다양한 동작을 하며 신체를 움직이는 활동입니다.','댄스','댄스는 유연성과 리듬 감각을 기르는 데 도움이 됩니다. 에어로빅과 비슷한 신체 활동을 늘려주어 즐겁게 운동할 수 있습니다.'),('2024-10-09 14:38:10.714969',105,3,'특정 기술이나 동작을 반복적으로 연습하여 스킬을 향상시키는 운동 방식입니다. 예를 들어, 스매시, 드롭샷 등을 연습합니다.','배드민턴 드릴','배드민턴 드릴은 반사 신경과 민첩성을 높이며, 근력을 사용하지 않고도 운동 효과를 극대화할 수 있습니다. 테니스와 배드민턴의 유사성을 살려 실력을 향상시키는데 좋습니다.'),('2024-10-09 14:53:36.789425',106,5,'바벨 또는 덤벨을 바닥에서 들어 올리는 운동으로, 다리와 엉덩이의 힘을 사용하여 체중을 지탱합니다.','데드리프트','데드리프트는 하체 및 코어 근육을 강화해 주어 걷기, 계단 오르기, 달리기에 도움을 줍니다.'),('2024-10-09 14:53:36.802080',107,5,'팔을 어깨 너비로 벌리고 몸을 곧게 유지하며 바닥에서 몸을 위아래로 움직이는 운동입니다.','푸시업','푸시업은 상체 근육을 강화하면서 농구를 할 때 필요한 팔과 어깨의 힘을 높여줍니다.'),('2024-10-09 14:53:36.803473',108,5,'줄을 털어내며 점프하는 운동으로, 이동성과 타이밍을 동시에 연습할 수 있습니다.','줄넘기','줄넘기는 심폐 지구력을 향상시켜 주며 달리기와 농구의 퍼포먼스를 더욱 개선해 줍니다.'),('2024-10-09 14:53:36.804728',109,5,'수영장이나 자연수역에서 다양한 스타일(자유형, 배영 등)로 물속에서 움직이는 운동입니다.','수영','수영은 전신 운동으로, 전반적인 체력을 키워 주며 산에서의 활동에도 큰 도움이 됩니다.'),('2024-10-09 14:53:36.806473',110,5,'일정 시간 동안 빠르게 달리거나 걷고, 그 후 짧은 휴식을 갖는 것을 반복하는 운동입니다.','트레드밀 인터벌 훈련','인터벌 훈련은 지구력을 향상시키고 급격한 운동 강도를 조절하여 달리기 능력을 증진시켜 줍니다.'),('2024-10-09 20:07:24.670123',111,7,'덤벨을 한 손에 들고, 무릎을 살짝 굽힌 상태에서 몸을 앞으로 기울인 후, 덤벨을 가슴 쪽으로 당기는 동작입니다.','덤벨 로우','이 운동은 상체 근력을 키워주어 농구와 같은 활동에서의 움직임을 향상시킵니다.'),('2024-10-09 20:07:24.674848',112,7,'레그 프레스 기계에 앉아 발판을 밀어내는 동작으로 하체 근육을 집중적으로 사용하는 운동입니다.','레그 프레스','하체 근력을 강화해 걷기 및 농구에서의 스피드와 민첩성을 높여줍니다.'),('2024-10-09 20:07:24.676070',113,7,'물속에서 자유롭게 움직이며 지속적으로 수영하는 운동입니다.','수영','저강도의 유산소 운동으로 전신 체력을 기르며 부상의 위험을 줄이고 회복에 도움을 줍니다.'),('2024-10-09 20:07:24.677200',114,7,'지면에서 매트에 누워 다양한 자세를 취하며 근력을 키우고 스트레칭을 진행합니다.','필라테스','코어 근육을 강화하고 유연성을 향상시켜 다양한 운동에서의 퍼포먼스를 높여줍니다.'),('2024-10-09 20:07:24.678275',115,7,'인공 암벽을 타고 올라가며 손과 발의 협응력을 요구하는 운동입니다.','클라이밍','중강도 운동으로, 전신 근력을 발달시키고 농구와 같은 스포츠에서의 몸의 조정력을 높여줍니다.'),('2024-10-09 20:08:28.004096',116,7,'기초 자세에서 점프 후 푸시업을 하고 다시 점프하여 일어서는 동작을 반복합니다.','버피','버피는 전신 운동으로 심혈관 능력과 근력을 동시에 향상시켜 농구와 같은 유산소 운동에 도움이 됩니다.'),('2024-10-09 20:08:28.005759',117,7,'한쪽 발을 앞으로 내딛고 무릎을 구부린 후 다시 원위치로 돌아오는 동작을 반복합니다.','런지','런지는 하체 근력과 균형을 향상시켜 걷기 및 농구와 같은 운동에서 더 나은 퍼포먼스를 발휘할 수 있게 합니다.'),('2024-10-09 20:08:28.006789',118,7,'고정된 자전거나 일반 자전거를 타며 심박수를 조절하고 지속적으로 자전거를 돌리는 운동입니다.','사이클링','자전거 타기와 유사하지만 다양한 환경에서 수업이나 실내에서 할 수 있어 저강도 유산소 운동으로 적합합니다.'),('2024-10-09 20:08:28.007796',119,7,'줄을 두 손으로 잡고 두 발로 발을 동작시키며 점프하는 운동입니다.','줄넘기','줄넘기는 유산소 능력과 발빠름을 향상시키고, 농구와의 연계 운동으로 매우 효과적입니다.'),('2024-10-09 20:08:28.008795',120,7,'자유롭게 음악에 맞춰 신나는 동작을 하며 심혈관 운동을 합니다.','춤','다양한 춤 동작은 유산소 운동과 협응력을 동시에 기를 수 있어 고강도 운동으로도 효과적입니다.'),('2024-10-09 20:13:01.838272',121,7,'팔을 어깨 너비로 벌리고 바닥에 엎드린 후, 팔꿈치를 굽혀 몸을 내려갔다가 다시 밀어 올립니다.','푸시업','푸시업은 상체 근육을 강화하고, 농구와 같은 운동에서 필요한 전신 힘과 지구력을 향상시킵니다.'),('2024-10-09 20:13:01.839933',122,7,'바벨을 바닥에서 올리며, 척추를 곧게 유지한 상태에서 엉덩이와 허벅지 힘을 이용하여 몸을 일으킵니다.','데드리프트','데드리프트는 하체와 코어 근력을 강화하여 걷기와 농구 시 필요한 힘을 증진시킵니다.'),('2024-10-09 20:13:01.841347',123,7,'일정한 속도로 30분 이상 이어서 뛰는 운동입니다.','조깅','조깅은 저강도 운동으로 심폐 지구력을 기르고 기본적인 체력을 유지하는 데 도움을 줍니다.'),('2024-10-09 20:13:01.846143',124,7,'저항 밴드를 발에 고정하고 팔과 다리를 다양한 방향으로 벌리며 스트레칭하고 강화를 동시에 진행합니다.','저항 밴드 운동','다양한 저항 밴드 운동은 전신 근력을 고르게 강화하며, 중강도 운동으로도 활용할 수 있습니다.'),('2024-10-09 20:13:01.847198',125,7,'느리고 부드러운 동작을 통해 몸과 마음을 집중시키며 운동을 진행합니다.','태극권','태극권은 저강도 운동으로 근력을 강화하고 유연성을 높여줍니다. 이는 걷기 및 농구 시 부상의 위험을 줄이는 데 도움을 줍니다.'),('2024-10-09 20:14:56.521690',126,7,'양팔로 바닥을 짚으면서 스쿼트 자세를 취한 뒤, 점프하여 발을 앞으로 이동하고, 다시 일어선다.','버피 (변형)','농구와 같은 동적인 운동에서 필요한 전신 근육 강화와 지구력을 높여줍니다.'),('2024-10-09 20:14:56.523790',127,7,'평범한 스쿼트 동작에서 점프를 추가하여 착지하면서 다시 스쿼트로 돌아가는 동작입니다.','플라이오메트릭 스쿼트','저강도부터 고강도까지의 운동에서 반응 속도와 유연성을 향상시키는 데 도움을 줍니다.'),('2024-10-09 20:14:56.524877',128,7,'기본 푸쉬업 자세에서 팔꿈치를 굽힐 때 한쪽 무릎을 옆으로 당기는 자세입니다.','푸쉬업 변형 (스파이더 푸쉬업)','상체와 코어 근육을 강화하면서, 농구와 같은 스포츠에서 필요한 체중 조절 능력을 키워줍니다.'),('2024-10-09 20:14:56.525890',129,7,'러닝 머신에서 빠른 속도로 달리기를 하고, 이후 천천히 걷기를 반복하는 방식입니다.','러닝 머신 인터벌 트레이닝','걷기와 조깅을 보완해주며, 심폐 능력을 향상시키는 데 효과적입니다.'),('2024-10-09 20:14:56.526913',130,7,'무게 없이 스쿼트를 하며, 짝으로 점프하여 방금까지의 스쿼트 자세에서 일어나는 움직임입니다.','크로스핏 에어 스쿼트','전신 근육을 강화하고, 다양한 강도의 운동을 제공하여 균형 잡힌 체력을 향상시킵니다.'),('2024-10-09 20:15:19.947422',131,7,'양발을 어깨너비로 벌리고 앉았다가 일어나는 동작을 반복합니다.','체중 스쿼트','저강도와 중강도 운동에 적합하며 하체 근력을 강화하고 긴 걷기나 농구에서의 움직임을 지원합니다.'),('2024-10-09 20:15:19.948993',132,7,'옆으로 누운 자세에서 팔꿈치로 지탱하고 몸을 일직선으로 유지하며 일정 시간 버팁니다.','플랭크 변형 (측면 플랭크)','코어 강화를 통해 걷기와 농구에서 안정성을 높여줍니다.'),('2024-10-09 20:15:19.950107',133,7,'자연 경관 속에서 다양한 경로를 따라 걷는 활동입니다.','하이킹','걷기와 비슷하지만 경사로 인한 저강도 운동으로 심폐 지구력을 향상시킵니다.'),('2024-10-09 20:15:19.951188',134,7,'음악에 맞춰 리듬에 맞게 신체를 움직이며 다양한 동작을 반복합니다.','에어로빅','중강도 운동으로 심박수를 높여줌으로써 유산소 지구력을 향상시킵니다.'),('2024-10-09 20:15:19.952312',135,7,'스트레칭 후 가벼운 발차기와 주먹질 동작으로 이루어진 유산소 운동입니다.','킥복싱','고강도 운동으로 전신을 사용하는 동시에 스트레스를 해소하며 재미를 더해줍니다.'),('2024-10-09 20:20:02.891113',136,7,'20초 동안 최대한의 강도로 운동하고 10초 휴식하는 식으로 8세트를 반복합니다.','타바타 운동','다양한 강도의 운동이 포함되어 있어 농구와 기타 중고강도 운동의 폭발적인 체력 향상에 도움을 줍니다.'),('2024-10-09 20:20:02.892705',137,7,'양손에 덤벨을 들고 누운 자세에서 팔을 곧게 펴고 천천히 내려주는 운동입니다.','덤벨 프레스','상체 근력을 강화하여 농구에서의 저항력 향상 및 샷의 파워를 증가시킬 수 있습니다.'),('2024-10-09 20:20:02.893949',138,7,'체중을 이용한 다양한 운동을 빠르게 돌리는 30분짜리 운동으로, 주로 전신 운동이 포함됩니다.','부트캠프 운동','다양한 체중 운동이 포함되어 있어 전체적인 체력과 지구력을 향상시킬 수 있으며, 농구와 걷기에 좋습니다.'),('2024-10-09 20:20:02.895111',139,7,'다양한 요가 자세로 몸의 긴장을 풀고 유연성을 기르는 운동입니다.','페럴렛 (요가)','유연성을 높이고 중심근육을 강화하여 걷기 및 저강도 운동의 부상 위험을 줄여줍니다.'),('2024-10-09 20:20:02.896132',140,7,'빠른 속도로 걷는 운동으로, 평지나 경사에서 수행합니다.','스피드 워킹','걷기와 비슷하지만 운동 강도를 높여서 심폐 지구력과 체력을 향상시킵니다.'),('2024-10-09 20:50:17.846870',141,7,'바벨이나 원판을 바닥에서 머리 위로 빠르게 들어 올리는 동작입니다.','원판 스내치','전신 근력 운동으로, 농구와 같은 전반적인 체력 향상에 도움이 됩니다. 특히 하체와 코어 근육을 강화하는 데 효과적입니다.'),('2024-10-09 20:50:17.851671',142,7,'두 손으로 벤치에 놓고 몸을 낮췄다가 다시 올리는 운동입니다.','트라이셉스 딥','상체 근력을 강화하는 데 유용하며, 농구와 같은 스포츠에서 필요로 하는 푸시 힘을 향상시킵니다.'),('2024-10-09 20:50:17.853534',143,7,'일정한 속도로 걷는 운동으로, 짧은 거리를 빠르게 걷습니다.','스피드 워킹','저강도 유산소 운동으로 전반적인 체력을 유지하고, 걷기와 유사한 감각으로 편안하게 운동할 수 있습니다.'),('2024-10-09 20:50:17.854790',144,7,'춤 동작에 맞춰 리듬에 따라 몸을 흔드는 운동입니다.','유산소 댄스','다양한 음악에 맞춰 몸을 움직이는 저강도의 유산소 운동으로 즐겁게 땀을 흘릴 수 있습니다.'),('2024-10-09 20:50:17.856029',145,7,'짧은 거리(예: 100m)를 최대한 빠르게 달리고, 그 후 회복을 위해 걷거나 천천히 달리는 것을 반복합니다.','스프린트 인터벌 훈련','고강도 운동으로 심폐지구력을 향상시켜, 고강도 운동을 더 잘 수행할 수 있도록 해줍니다.'),('2024-10-09 21:10:24.836150',146,3,'양발을 어깨너비로 벌리고 한쪽 다리를 앞으로 내디디며 무릎을 구부려 앉았다 일어나는 동작을 반복합니다.','런지','런지는 달리기 및 배드민턴과 같은 스포츠에서 하체 근력을 강화하는 데 도움이 됩니다. 이는 추진력을 증가시키고 부상의 위험을 줄이는 데 기여합니다.'),('2024-10-09 21:10:24.840619',147,3,'TRX 스트랩을 이용해 몸을 뒤로 기울이고 팔을 굽혀 몸을 당기는 동작을 수행합니다.','TRX 로우','TRX 로우는 상체 근력을 강화하고 테니스와 같은 라켓 스포츠에서 필요한 안정성과 힘을 향상시킵니다.'),('2024-10-09 21:10:24.841814',148,3,'고정 자전거 또는 야외에서 자전거를 타며 페달을 밟는 운동입니다.','사이클링','사이클링은 무릎에 무리를 주지 않으면서 심폐지구력을 키우고 자전거와 달리기를 보완하는 체력을 향상시킵니다.'),('2024-10-09 21:10:24.843199',149,3,'다양한 기구 또는 바닥에서 진행되는 코어 중심의 운동으로 근력을 키우고 유연성을 증가시킵니다.','필라테스','필라테스는 코어 근육을 강화하고 유연성을 높여 유도 및 기타 운동에서의 균형 감각을 향상시킵니다.'),('2024-10-09 21:10:24.844291',150,3,'리듬에 맞춰 몸을 움직이며 여러 가지 춤 동작을 수행하는 유산소 운동입니다.','댄스 운동','댄스 운동은 심혈관 건강을 개선하고 다양한 움직임을 통해 전신의 유연성과 리듬 감각을 키우는 데 도움을 줍니다. 이는 에어로빅과 같은 운동을 보완합니다.'),('2024-10-09 21:12:34.314484',151,7,'양 발을 어깨 너비만큼 벌리고 바벨을 어깨에 지고, 무릎을 구부리며 몸을 낮췄다가 일어서는 동작입니다.','바벨 스쿼트','바벨 스쿼트는 하체 근력을 강화하는 데 도움을 주며, 농구의 점프 및 움직임에 필요한 폭발력을 기르는 데 유용합니다.'),('2024-10-09 21:12:34.316177',152,7,'일반 푸시업 자세에서 시작해 바닥에서 몸을 밀어내며 손을 바닥에서 떼는 동작입니다.','플라이오메트릭 푸시업','이 운동은 상체 근력을 강화하여 푸시업의 변형을 다각화할 수 있으며, 고강도 운동인 농구에서의 빠른 반응속도를 향상시킵니다.'),('2024-10-09 21:12:34.317248',153,7,'도로에서 자전거를 타며 속도와 강도를 조절하여 일정시간 주행하는 것입니다.','로드바이크','자전거 타기와 유사하지만, 로드바이크는 더 다양한 스피드와 경사를 통해 하체 근력을 단련하고 지구력을 기르는 데 도움을 줍니다.'),('2024-10-09 21:12:34.318296',154,7,'여러 가지 자세를 통해 호흡과 스트레칭을 결합하는 운동입니다.','연구중인 요가','다양한 종류의 요가는 유연성을 개선하고, 체중 감소 및 재활운동에도 효과적이며, 저강도 운동을 선호하는 분들에게 적합합니다.'),('2024-10-09 21:12:34.319322',155,7,'다양한 장애물을 설정하고 이를 넘어가는 운동 조합을 반복 수행하는 훈련입니다.','장애물 코스 훈련','중강도 및 고강도 운동으로서 다양한 장애물을 극복하며 전신 근력과 지구력을 동시에 강화할 수 있습니다. 농구에서의 기민함을 기르는 데도 효과적입니다.'),('2024-10-09 21:23:11.543214',156,3,'양손에 바벨을 들고 허리를 약간 굽힌 상태에서 바벨을 복부 쪽으로 당기는 운동입니다.','바벨 로우','엉덩이와 등 근육을 강화하여 테니스와 배드민턴에서의 스윙 및 움직임에 도움이 됩니다.'),('2024-10-09 21:23:11.596702',157,3,'덤벨을 양손에 들고 팔을 양옆으로 펼친 후 다시 모으는 운동입니다.','플라이','가슴 근육을 강화해 달리기와 기타 운동 시 상체의 안정성을 높입니다.'),('2024-10-09 21:23:11.599069',158,3,'한쪽 발로 서서 반대쪽 다리를 높이 차올리는 동작을 반복합니다.','하이킥','유도와 같은 격투기에서의 유연성과 반응 속도를 개선합니다.'),('2024-10-09 21:23:11.600558',159,3,'공을 스틱으로 다루며 민첩하게 방향을 전환하면서 뛰는 연습입니다.','필드 하키 드릴','민첩성과 협응력을 높여 탁구와 테니스와 같은 빠른 반응이 필요한 운동에 도움이 됩니다.'),('2024-10-09 21:23:11.602069',160,3,'상대방과 가벼운 세기로 킥과 펀치를 주고받으며 실전감을 느낄 수 있습니다.','킥복싱 스파링','심혈관 지구력을 높이고 전신 근력도 함께 발달시킵니다.'),('2024-10-09 21:30:44.763105',161,3,'서서 시작한 후, 빠르게 스쿼트 자세로 내려가고, 팔을 뻗어 바닥에 손을 대고 점프 후 푸쉬업을 진행한 뒤 다시 일어나는 동작입니다.','버피','전신 근력과 지구력을 향상시키며, 달리기나 에어로빅과 함께 유산소 운동 능력을 증가시킵니다.'),('2024-10-09 21:30:44.764927',162,3,'덤벨을 양손에 들고, 팔을 상하로 움직이며 로프처럼 흔드는 운동입니다.','덤벨 로프','상체 근력을 키우면서 균형감과 코어 안정성을 증가시키며, 탁구, 테니스와 같은 운동에 필요한 스윙 근육을 강화하는 데 도움이 됩니다.'),('2024-10-09 21:30:44.766068',163,3,'편안한 속도로 달리거나 걷는 운동으로, 다양한 환경에서 쉽게 실시할 수 있습니다.','조깅','강도를 조절할 수 있어 중강도 운동으로 적극 활용되며, 달리기와 유사한 효과로 심장 건강과 지구력을 향상시킵니다.'),('2024-10-09 21:30:44.767199',164,3,'한 발로 스텝박스나 발판에 올라가고 다시 내려오는 동작을 반복합니다.','스텝업','하체 근육을 강화하여 배드민턴, 테니스에서의 민첩함과 힘을 증가시킵니다.'),('2024-10-09 21:30:44.768318',165,3,'다양한 킥과 스트라이크 동작을 조합하여 빠르게 진행하는 운동입니다.','킥복싱 드릴','전신을 사용하는 유산소 운동으로, 중강도의 대체 운동으로서 에어로빅이나 킥복싱을 좋아하는 사람에게 적합합니다.'),('2024-10-09 21:49:20.131689',166,1,'양손에 덤벨을 들고 어깨 높이에서 시작하여 팔을 머리 위로 올라가게 합니다.','스탠딩 오버헤드 프레스','다양한 운동을 할 때 필요한 상체 근력을 강화하는 데 도움이 되며, 농구와 복싱에서의 팔 힘을 향상시키는 데 유용합니다.'),('2024-10-09 21:49:20.180931',167,1,'다리를 구부려 발뒤꿈치를 엉덩이 쪽으로 당기며 무릎을 구부리는 운동입니다.','레그 컬','하체 근력과 근지구력을 향상시켜 달리기, 등산 및 자전거 타기와 같은 운동에서의 퍼포먼스를 높입니다.'),('2024-10-09 21:49:20.182977',168,1,'기계 위에서 스키를 타는 것처럼 양팔과 양다리를 동시에 움직이며 운동합니다.','크로스 컨트리 스키 머신','전신 유산소 운동으로 유산소 능력을 향상시키며, 수영 및 자전거 타기와 유사한 심폐지구력을 기릅니다.'),('2024-10-09 21:49:20.184520',169,1,'두 명의 플레이어가 서로 번갈아가며 셔틀콕을 치는 팀 경기 방식입니다.','배드민턴 복식 경기','반사 신경과 민첩성을 향상시켜 테니스와 같은 라켓 스포츠의 기술과 체력을 높입니다.'),('2024-10-09 21:49:20.185957',170,1,'짧은 거리를 최대한 빠르게 달리는 훈련으로, 최대한의 속도로 달리고 회복 기간을 갖습니다.','스프린터 훈련','빠른 속도와 폭발적인 힘을 기르는데 효과적이며, 농구와 달리기 기술을 개선하는 데 도움이 됩니다.'),('2024-10-09 21:49:24.846767',171,1,'덤벨, 바벨 등을 활용하여 여러 부위의 근육을 집중적으로 강화하는 운동입니다.','근력 트레이닝 (Strength Training)','다양한 운동에 필요한 전반적인 근육 발달을 도와주며, 체력이 향상되어 농구, 복싱 등에서 더 좋은 성과를 내게 합니다.'),('2024-10-09 21:49:24.848788',172,1,'저항 밴드를 사용하여 다양한 근육군을 타겟팅하는 운동입니다.','저항 밴드 운동 (Resistance Band Exercises)','심박수를 높이고 근력을 기르는 동시에 부상의 위험을 줄여주며, 계단 오르기, 증가한 활동량에 적합한 운동입니다.'),('2024-10-09 21:49:24.854055',173,1,'샌드백을 타격하면서 다양한 복싱 기술을 연습하며, 힘과 스피드를 동시에 기르는 운동입니다.','복싱 샌드백 운동 (Heavy Bag Training)','기본적인 복싱 기술과 스피드를 향상시키며, 전신 유산소 운동으로도 효과적입니다.'),('2024-10-09 21:49:24.855776',174,1,'기본 푸쉬업 또는 다양한 변형을 통해 상체를 강화하는 운동입니다.','푸쉬업 변형 (Push-up Variations)','상체 근육을 강화하는 데 효과적이며, 복싱 및 테니스와 같은 운동의 성능을 향상시키는 데 도움을 줍니다.'),('2024-10-09 21:49:24.857126',175,1,'전신을 사용하여 수직으로 당기는 운동으로, 강한 근육을 발달시키는 동시에 심폐 기능을 개선합니다.','로잉 머신 (Rowing Machine)','전신 근력을 기르고 심폐 지구력도 향상시켜, 달리기와 자전거 타기와 같은 유산소 운동을 보완합니다.'),('2024-10-09 21:50:25.926077',176,1,'발을 어깨 너비로 벌리고 하강한 후 점프하여 최대한 높이 뛰어오르는 운동입니다.','점핑 스쿼트','폭발적인 하체 힘과 근력 향상에 도움을 주며, 달리기와 농구에서의 민첩성을 키우는 데 유리합니다.'),('2024-10-09 21:50:25.928008',177,1,'바에 매달려 몸을 위로 끌어당기는 운동으로, 등과 팔근육을 강화할 수 있습니다.','체중 트랙션','상체 근력을 강화하고, 복싱과 펜싱의 기술적 능력을 높이는 데 도움이 됩니다.'),('2024-10-09 21:50:25.929244',178,1,'킥과 펀치를 조합한 운동으로, 기술 훈련과 유산소 운동을 동시에 할 수 있습니다.','킥복싱 드릴','복싱 기술을 발전시키는 데 적합하며, 유산소 운동 효과도 있어 전반적인 체력을 cải thiện합니다.'),('2024-10-09 21:50:25.930478',179,1,'스텝 플랫폼 위에서 다양한 리듬으로 올라가고 내려오는 운동입니다.','스텝퍼 에어로빅','스텝을 이용하여 심폐 지구력과 하체 힘을 기르는 데 효과적이며, 계단 오르기와 유사한 방식으로 예쁜 스타일을 유지하는 데 도움을 줍니다.'),('2024-10-09 21:50:25.931706',180,1,'여러 가지 운동을 짧은 시간 내 반복적으로 수행하는 방식으로, 체력을 고루 향상시킬 수 있습니다.','크로스핏 서킷','전신 근력과 지구력을 동시에 강화할 수 있는 프로그램으로, 다양한 운동이 포함되어 있어 여러 운동을 즐기는 데 유리합니다.'),('2024-10-09 22:33:09.262648',181,1,'두 발로 바닥을 밀어내며 최대한 높이 점프한 후 부드럽게 착지합니다.','플라이오메트릭 점프','점프를 포함한 움직임은 농구와 복싱에서의 폭발적인 힘과 민첩성을 향상시켜줍니다.'),('2024-10-09 22:33:09.267162',182,1,'덤벨을 바닥에서 한 손으로 들어, 수직으로 위로 쭉 뻗어 올립니다.','덤벨 스내치','전신 운동으로, 힘과 민첩성을 동시에 요구하며 등산과 자전거 타기에서의 지구력을 극대화합니다.'),('2024-10-09 22:33:09.268408',183,1,'발을 높이 들어 몸을 뒤집어 반전된 자세를 유지합니다.','하이 인버전 스트레칭','운동 후 근육 이완과 유연성을 높여주며, 수영과 테니스에서의 운동 범위를 개선합니다.'),('2024-10-09 22:33:09.269477',184,1,'톱니바퀴처럼 발을 빠르게 움직이며 여러 방향으로 이동합니다.','복싱 풋워크','발의 민첩성과 균형 감각을 향상시켜 농구 및 복싱의 게임 능력을 강화합니다.'),('2024-10-09 22:33:09.270488',185,1,'바닥에 누워 다리를 곧게 펴고 천천히 들어올렸다가 내립니다.','라잉 레그 레이즈','하체 근력을 강화하여 계단 오르기나 등산에서의 성능을 향상시킵니다.'),('2024-10-10 00:28:49.568600',211,2,'팔꿈치와 발끝을 바닥에 대고 몸을 곧게 펴서 유지합니다.','플랭크','코어 근력을 강화하여 걷기와 계단 오르기에서의 안정성을 높여줍니다.'),('2024-10-10 00:28:49.569902',212,2,'발을 어깨 너비로 벌리고, 무릎이 발끝을 넘지 않도록 하면서 앉았다 일어납니다.','스쿼트','하체 근력을 키워 산행과 복싱에서의 운동 능력을 향상시킵니다.'),('2024-10-10 00:28:49.570752',213,2,'다양한 아사나(자세)를 통해 몸과 마음의 균형을 맞추는 운동입니다.','요가','근육의 유연성과 균형을 향상시켜 등산 시 도움이 됩니다.'),('2024-10-10 00:28:49.571540',214,2,'실내 자전거나 도로에서 자전거를 타며 지속적으로 움직입니다.','자전거 타기','심혈관 지구력을 향상시켜 걷기와 복싱에 도움이 되는 유산소 운동입니다.'),('2024-10-10 00:28:49.572368',215,2,'발을 벌리고 팔을 위로 올리면서 동시에 점프한 후 다시 원위치로 돌아옵니다.','점핑 잭','전신 근육을 사용하고 지구력을 향상시켜 복싱과 걷기 운동을 보완합니다.'),('2024-10-10 00:36:03.114731',216,2,'한 발을 앞으로 내딛고 무릎을 굽혀 앉았다가 다시 원래 위치로 돌아오는 동작을 반복합니다.','런지','런지는 하체 근력을 강화하는 데 효과적이며, 걷기, 계단 오르기, 등산과 같은 운동에 도움이 됩니다.'),('2024-10-10 00:36:03.116088',217,2,'팔을 어깨 너비로 벌리고 몸을 평행하게 유지하며 팔꿈치를 구부려 몸을 바닥에 가깝게 내렸다가 다시 일어나는 동작입니다.','푸시업','푸시업은 상체 근력과 코어 안정성을 강화해 복싱과 같은 운동에서의 퍼포먼스를 향상시켜 줍니다.'),('2024-10-10 00:36:03.116925',218,2,'줄을 잡고 발을 가볍게 뛰어올리며 줄이 발 아래를 지나가도록 하는 운동입니다.','줄넘기','줄넘기는 심혈관 운동을 포함하여 복싱과 비슷한 리듬감과 민첩성을 요구하므로 복싱과 잘 어울립니다.'),('2024-10-10 00:36:03.117769',219,2,'두 사람 이상으로 네트에서 셔틀콕을 치며 경기를 하는 운동입니다.','배드민턴','배드민턴은 반응 속도와 민첩성을 높여 복싱 기술 향상에 도움이 됩니다. 활동성을 유지할 수 있습니다.'),('2024-10-10 00:36:03.118906',220,2,'물속에서 몸을 이동시키며 다양한 수영 스타일(자유형, 배영, 평영 등)을 사용하여 운동합니다.','수영','수영은 전신을 사용하여 근력과 지구력을 동시에 키울 수 있으며, 걷기 및 등산으로 이미 훈련된 하체 근육을 보완해 줍니다.'),('2024-10-10 09:16:57.226273',221,7,'두 손으로 케틀벨을 잡고 두 다리를 어깨 너비로 벌린 뒤, 무릎과 엉덩이를 굽혀 케틀벨을 아래로 내린 후, 엉덩이를 앞으로 밀어 케틀벨을 가슴 높이까지 스윙합니다.','케틀벨 스윙','케틀벨 스윙은 전신 운동으로, 강도 높은 운동을 포함하여 체력과 근력을 동시에 향상시킬 수 있습니다.농구와 같은 팀 스포츠에서의 기민성을 높이는 데 도움을 줄 수 있습니다.'),('2024-10-10 09:16:57.231626',222,7,'바에 매달린 후, 팔을 사용하여 몸을 위로 끌어올려 턱이 바 위로 올라오게 합니다.','풀업','풀업은 상체와 코어를 강화하는 데 효과적이며, 농구와 같은 스포츠에서도 필요한 상체 힘을 기르는 데 유리합니다.'),('2024-10-10 09:16:57.232696',223,7,'스텝밀 기계에 올라가서 발판을 밟고 체중을 실어 위아래로 오르는 형태로 운동합니다.','스텝밀','스텝밀 운동은 저강도 및 중강도 운동을 모두 소화할 수 있으며, 걷기와 비슷한 동작으로 하체 근력을 키울 수 있습니다.'),('2024-10-10 09:16:57.233540',224,7,'다양한 음악에 맞춰 몸을 움직이며, 유산소 운동 효과를 주는 댄스 동작을 반복합니다.','댄스 워크아웃','댄스 워크아웃은 유산소 운동으로, 즐거운 분위기에서 운동 강도를 조절할 수 있어 저강도 및 중강도 운동에 적합합니다.'),('2024-10-10 09:16:57.234334',225,7,'저항 밴드를 발에 고정하고 두 손으로 잡아당겨 팔꿈치를 몸쪽으로 끌어당기는 형식으로 운동합니다.','저항 밴드 로우 변형','기존에 추천 받은 저항 밴드 운동의 변형으로, 상체 근력을 더욱 강조할 수 있으며, 중강도 강도의 훈련이 가능합니다.'),('2024-10-10 09:18:53.960370',226,7,'버터플라이 머신에 앉아 팔을 앞으로 밀어내어 가슴 근육을 강화하는 운동입니다.','버터플라이 머신','상체와 하체의 안정성을 높이며, 농구와 저강도 운동 후의 전반적인 근육 회복에 도움이 됩니다.'),('2024-10-10 09:18:53.961719',227,7,'험준한 오프로드에서 자전거를 타며 경사진 길과 장애물을 극복하는 운동입니다.','산악 자전거 타기','중강도의 심장 강화 운동으로서, 자전거 타기에서 변화를 주어 상체와 하체의 조화로운 발달을 도와줍니다.'),('2024-10-10 09:18:53.962490',228,7,'두 팀이 공을 가지고 목표 지점에 넣기 위해 경쟁하는 팀 스포츠입니다.','필드 하키','집중력과 팀워크를 요구하는 운동으로 농구와 유사한 게임 형태로 유산소 운동을 강화할 수 있습니다.'),('2024-10-10 09:18:53.963305',229,7,'두 손으로 줄을 잡고 좌우로 점프하며 줄을 넘는 운동입니다.','줄넘기','유산소 운동으로서 저강도부터 고강도까지 조절 가능하며, 전신을 사용하여 운동의 재미를 더합니다.'),('2024-10-10 09:18:53.964603',230,7,'두 팀이 각각의 끝을 잡고 직선으로 이동하며 상대 팀을 끌어당기는 운동입니다.','줄다리기','그룹 운동으로 근력과 협동력을 동시에 키울 수 있으며, 전신 근육을 활용합니다.'),('2024-10-10 09:29:27.461531',231,1,'실내 자전거에서 일정한 속도로 페달을 밟거나 저항을 조절하여 훈련합니다.','사이클링 (실내 자전거)','자전거 타기를 즐기고 계신 점을 고려하여 유산소 능력을 향상시키고 하체 근력을 강화할 수 있습니다.'),('2024-10-10 09:29:27.462956',232,1,'벤치 또는 평평한 표면에 앉아 손으로 지탱하고 몸을 아래로 내리며 팔을 구부려 다시 올라옵니다.','벤치 딥','상체 근력을 강화할 수 있으며, 농구와 복싱에서 필요로 하는 팔과 어깨 근육을 발달시킬 수 있습니다.'),('2024-10-10 09:29:27.463874',233,1,'저항 장비를 이용하여 스프린트 연습을 하며, 짧은 거리에서 빠른 속도로 달립니다.','하이 저항 스프린트 훈련','달리기와 농구에서의 스프린트 능력을 향상시키며, 빠른 발 동작과 지구력을 지원합니다.'),('2024-10-10 09:29:27.464683',234,1,'일반 푸시업 동작을 하면서 주먹으로 바닥을 친 후 다시 올라옵니다.','복싱 푸시업','복싱의 기본 동작과 함께 상체 근력을 동시에 키울 수 있어 유용합니다.'),('2024-10-10 09:29:27.465466',235,1,'짐볼을 등 뒤에 두고 서서 무릎을 굽혀 앉았다가 일어나는 동작을 반복합니다.','짐볼 스쿼트','하체 근력과 균형을 동시에 강화할 수 있는 운동으로, 등산과 농구에서 필요한 근력을 키울 수 있습니다.'),('2024-10-10 09:48:32.410375',236,5,'음악에 맞춰 다양한 춤 동작을 하며 빠르게 움직이는 운동입니다.','유산소 댄스','유산소 댄스는 심폐지구력을 향상시키고 즐거운 분위기에서 운동할 수 있어 걷기와 달리기를 보완합니다.'),('2024-10-10 09:48:32.411724',237,5,'고정식 자전거 또는 야외에서 자전거를 타며 일정한 속도로 페달을 밟는 운동입니다.','사이클링','사이클링은 하체 근육을 강화하고 심폐 기능을 개선하여 계단 오르기와 농구에 도움이 됩니다.'),('2024-10-10 09:48:32.412529',238,5,'발과 주먹을 활용해 다양한 펀치와 킥 동작을 연습하며 상대방과의 대결을 통해 운동합니다.','킥복싱','킥복싱은 전신 운동으로 힘과 체력을 키우며, 심장 건강에 좋고 농구와 체력 요구되는 스포츠에 도움이 됩니다.'),('2024-10-10 09:48:32.413339',239,5,'매트 위에서 다양한 자세와 운동기구를 활용하여 신체의 균형과 유연성을 향상시키는 운동입니다.','필라테스','필라테스는 코어 근육을 강화하여 걷기와 등산 시의 자세를 개선시켜 줍니다.'),('2024-10-10 09:48:32.414086',240,5,'산이나 자연 지역에서 경사를 따라 천천히 걷는 운동입니다.','하이킹','하이킹은 등산과 유사한 운동으로, 다양한 경로를 따라 걷도 보며 자연을 즐길 수 있습니다.'),('2024-10-10 10:16:36.975164',241,6,'엎드린 자세에서 팔꿈치와 발끝으로 몸을 지탱하고, 몸이 일직선을 이루도록 유지합니다. 30초에서 1분까지 유지합니다.','플랭크','코어 근력을 강화하여 달리기와 수영에서의 자세와 안정성을 개선하는 데 도움이 됩니다.'),('2024-10-10 10:16:36.979894',242,6,'어깨너비로 발을 벌리고 무릎을 굽혀 엉덩이를 뒤로 빼면서 앉는 자세를 취합니다. 다시 일어났다가 반복합니다.','스쿼트','하체 근육을 강화하여 등산과 달리기에서의 힘과 지구력을 높이는 데 기여합니다.'),('2024-10-10 10:16:36.981208',243,6,'자전거를 타고 일정한 속도로 페달을 밟으며 가능한 한 오랜 시간 동안 지속합니다.','사이클링','유산소 운동으로서 달리기와 비슷한 효과를 주며 하체 근력을 강화할 수 있습니다.'),('2024-10-10 10:16:36.982306',244,6,'다양한 자세를 통해 호흡에 집중하며 스트레칭과 근력 운동을 결합합니다.','요가','유연성을 개선하고 전반적인 몸의 밸런스를 잡아 등산과 헬스 운동 후의 회복에 도움을 줍니다.'),('2024-10-10 10:16:36.983315',245,6,'특정 기구나 매트를 사용해 근육을 조절하며 체형을 교정하는 운동입니다.','필라테스','코어 안정성을 높이고 관절의 건강을 지켜 헬스 및 스윔에 긍정적인 영향을 미칩니다.'),('2024-10-10 10:17:38.422730',246,6,'팔 또는 가슴을 바닥에 대고 스쿼트 자세에서 점프하고 일어나는 운동입니다.','버피','전신 근육을 사용하고 유산소 운동 효과도 있어 달리기와 수영을 보완할 수 있습니다.'),('2024-10-10 10:17:38.424533',247,6,'바를 잡고 몸을 끌어올리는 운동으로, 상체와 등 근육을 강화하는 데 효과적입니다.','풀업','상체 근육을 강화하며 헬스 운동과의 연계를 통해 전체적인 힘을 키울 수 있습니다.'),('2024-10-10 10:17:38.425796',248,6,'트레드밀에서 빠른 속도와 느린 속도를 번갈아 가며 달리는 운동입니다.','트레드밀 인터벌','달리기의 강도를 다양화하여 지구력을 향상시키는데 도움을 줍니다.'),('2024-10-10 10:17:38.426872',249,6,'다양한 경사와 거리를 가진 자연환경에서 산을 걷는 운동입니다.','하이킹','등산의 변형으로 자연 속에서 운동하며 유산소 능력을 증가시키는 데 도움을 줍니다.'),('2024-10-10 10:17:38.431265',250,6,'수중에서 음악에 맞춰 다양한 동작을 하며 운동하는 프로그램입니다.','수중 에어로빅','수영과 유사하게 전신을 사용하며 관절에 부담을 줄여줍니다.'),('2024-10-10 10:38:15.757384',251,7,'한 손으로 케틀벨을 바닥에서 쥐고 몸을 곧게 펴며 수직으로 올린 후, 다른 손으로 스위칭하여 반복합니다.','케틀벨 스내치','유산소 운동과 근력 운동의 결합으로, 고강도 훈련을 즐기는 사람에게 적합합니다.'),('2024-10-10 10:38:15.761672',252,7,'양손에 덤벨을 쥐고 무릎을 구부린 자세에서 덤벨을 바닥에 대고 일으켜 세우며 올립니다.','덤벨 스내치','전신 운동으로 근력 강화와 함께 자세 조절 능력을 향상시키는 데 도움이 됩니다.'),('2024-10-10 10:38:15.762812',253,7,'기본적인 스트레칭부터 고급 체조 동작까지 포함하여 몸을 풀고 균형을 강화합니다.','체조','다양한 움직임을 통해 유연성을 높이고 저강도 운동을 즐길 수 있습니다.'),('2024-10-10 10:38:15.764059',254,7,'가벼운 걷기, 느긋한 요가 등을 통해 몸을 이완시키고 회복을 돕습니다.','액티브 리커버리 (활동적인 회복)','다른 운동에 대한 회복 시간을 가지면서 저강도로 몸을 풀어줘서 에너지를 회복하게 합니다.'),('2024-10-10 10:38:15.765581',255,7,'누운 자세에서 두 다리를 동시에 움직이며 몸을 비틀어 크런치를 실시합니다.','이중 자전거 크런치','코어 근력 강화를 통해 다양한 운동에서의 안정성을 높여줍니다.'),('2024-10-10 10:44:49.092761',256,6,'바벨을 발 앞쪽에 두고, 발을 어깨너비로 벌린 후 허리를 펴고 바벨을 바닥에서 들어올립니다.','데드리프트','등산과 헬스에서 하체 힘과 코어 강화를 돕기 때문에 추천합니다.'),('2024-10-10 10:44:49.095057',257,6,'양팔을 어깨너비로 벌리고, 몸을 곧게 유지하며 팔꿈치를 굽혀 가슴을 바닥에 가깝게 내립니다.','푸쉬업','상체의 근력을 강화하여 수영의 팔 힘과 헬스 리프팅에 도움이 됩니다.'),('2024-10-10 10:44:49.096546',258,6,'일정한 거리를 빠르게 달리고, 그 후 느린 속도로 회복하는 패턴을 반복합니다.','조깅 대간격 훈련','달리기의 지구력을 향상시키고 심폐 기능을 강화하여 더 나은 러닝을 돕습니다.'),('2024-10-10 10:44:49.097730',259,6,'높은 스텝이나 벤치에 한 발을 올리고, 그 발로 힘을 주어 몸을 올린 후 내려옵니다.','스텝업','하체 근력과 안정성을 높여 등산을 더욱 효율적으로 할 수 있게 해줍니다.'),('2024-10-10 10:44:49.098980',260,6,'수중에서 발을 사용해 조깅하는 동작으로, 물의 저항을 활용해 운동합니다.','아쿠아 조깅','수영과 비슷한 효과를 주면서 관절에 미치는 압력을 줄여줍니다.'),('2024-10-10 10:53:23.619046',261,1,'한쪽 손에 케틀벨을 잡고, 스쿼트에서 일어나는 동작과 함께 머리 위로 빠르게 올리는 운동입니다.','케틀벨 스내치','복싱과 농구 등 빠른 움직임과 전신 조정을 필요로 하는 운동을 보완하며, 힘과 지구력을 동시에 키울 수 있습니다.'),('2024-10-10 10:53:23.620747',262,1,'덤벨을 양손에 들고, 누운 상태에서 팔을 양쪽으로 벌렸다가 다시 모으는 운동입니다.','덤벨 플라이','상체의 근력을 강화해 농구와 복싱 시 필요한 힘을 높이는 데 도움을 줄 수 있습니다.'),('2024-10-10 10:53:23.622101',263,1,'실내 자전거를 고정하고, 일정한 속도와 저항으로 페달을 밟는 운동입니다.','실내 자전거 타기','자전거, 달리기 등의 유산소 운동과 연결되어 심혈관 건강을 증진시키며, 저-impact 옵션으로 관절에 부담을 줄일 수 있습니다.'),('2024-10-10 10:53:23.623202',264,1,'약간의 높이가 있는 박스나 계단 위에 한 발씩 올리고 내리는 운동입니다.','스텝박스 운동','계단 오르기와 비슷한 동작으로 하체를 강화시키고 균형 감각을 기르는 데 유익합니다.'),('2024-10-10 10:53:23.624213',265,1,'다양한 음악에 맞춰 신나는 춤을 추면서 유산소 운동을 하는 것입니다.','줌바 댄스','유산소 운동과 즐거운 댄스 요소가 결합되어 에너지를 발산하며, 테니스와 에어로빅과 같은 재미 요소를 제공합니다.'),('2024-10-10 10:53:38.272826',266,1,'땅에 누워서 한쪽 팔로 케틀벨을 들고 일어나며 여러 단계를 거쳐 완전히 서는 동작입니다.','케틀벨 터키쉬 겟업','근력과 안정성을 동시에 향상시킬 수 있으며, 전반적인 근육 발달과 균형 감각을 기르는 데 도움이 됩니다.'),('2024-10-10 10:53:38.274819',267,1,'양발을 어깨 너비로 벌리고 바벨을 어깨 높이에서 위로 밀어 올리는 운동입니다.','스탠딩 바벨 프레스','상체 근력을 키우고 안정성을 향상시키며, 농구와 복싱 등에서 필요한 팔과 어깨 힘을 강화해줍니다.'),('2024-10-10 10:53:38.275934',268,1,'복싱 글러브를 착용하고 파트너와 모의 경기를 하며 다양한 공격과 방어 기술을 연습합니다.','킥복싱 스파링','체력과 반사신경을 기르는 동시에 카디오 운동 효과가 뛰어나며, 복싱의 기술을 연습하는 데에 유용합니다.'),('2024-10-10 10:53:38.276957',269,1,'클럽벨을 두 손으로 쥐고 다리 사이에서 스윙 올리는 동작을 반복하며 하체와 코어를 활성화합니다.','클럽벨 스윙','하체와 코어의 근력 및 지구력을 향상시키고, 유산소 운동 요소도 가미되어 전반적인 체력 증진에 기여합니다.'),('2024-10-10 10:53:38.278102',270,1,'라켓과 탁구공을 사용해 네트를 사이에 두고 상대방과 스트로크를 주고받는 게임입니다.','탁구','민첩성, 반사신경, 집중력 향상에 도움을 주며, 즐거운 경쟁을 통해 꾸준하게 운동할 수 있는 기회를 제공합니다.'),('2024-10-10 10:53:49.492327',271,1,'발을 앞으로 내디뎌 무릎을 구부리고 뒤쪽 무릎을 바닥 가까이 낮추는 운동.','런지','여러 다리 근육을 강화하고 균형 감각을 발전시킬 수 있어 농구와 테니스에 도움이 됩니다.'),('2024-10-10 10:53:49.494482',272,1,'박스나 안정적인 플랫폼 앞에서 두 발로 점프하여 올라가는 운동.','플라이오메트릭 박스 점프','폭발적인 힘과 민첩성을 기를 수 있어 복싱 및 농구에 유리합니다.'),('2024-10-10 10:53:49.496643',273,1,'네트를 중앙에 두고 두 팀이 셔틀콕을 주고받는 라켓 스포츠.','배드민턴','빠른 움직임과 반사 신경을 키울 수 있어 테니스와 복싱에 좋은 보완 운동입니다.'),('2024-10-10 10:53:49.498033',274,1,'다양한 펀치와 킥 기본 동작을 연습하는 킥복싱 체조.','킥복싱 (기본 동작)','전신 운동으로 지구력을 기르고 스트레스 해소에도 도움을 줍니다.'),('2024-10-10 10:53:49.499163',275,1,'주기적으로 발을 밟으며 이동하는 움직임으로 유산소 운동을 하는 머신 운동.','일립티컬 머신','하체 근육을 강화하고 유산소 운동을 통해 지구력을 높이는 데 좋습니다.'),('2024-10-10 10:54:06.933681',276,1,'바닥에 발가락과 손을 대고 체중을 이용해 몸을 수직으로 밀어내는 운동입니다.','푸쉬업','복싱, 테니스와 같이 상체 힘과 체력, 지구력이 필요한 운동을 보완해줍니다.'),('2024-10-10 10:54:06.935285',277,1,'벤치에 눕고 양손에 덤벨을 들고 가슴 위로 밀어올리는 운동입니다.','덤벨 벤치 프레스','등산과 농구처럼 상체 근력을 강화하여 더 나은 퍼포먼스를 발휘할 수 있게 도와줍니다.'),('2024-10-10 10:54:06.936898',278,1,'한 발을 스텝 위에 올려놓고 다른 발을 따라 올라가며 수행하는 운동입니다.','스텝업','계단 오르기와 걷기와 비슷한 운동으로 하체 근력과 균형을 강화하는 데 유용합니다.'),('2024-10-10 10:54:06.937935',279,1,'팔을 지지대 삼아 몸을 낮추고, 교대로 무릎을 가슴 쪽으로 끌어당기는 운동입니다.','마운틴 클라이머','달리기처럼 심폐 지구력을 높일 수 있으며, 복싱에도 필요한 민첩성과 체력 향상에 도움이 됩니다.'),('2024-10-10 10:54:06.939279',280,1,'수영장에서 강사의 지도 아래 다양한 수영 스타일과 기술을 배우는 운동입니다.','스위밍 클래스','수영을 통해 유산소 운동과 근육 강화 효과를 동시에 얻을 수 있어 여러 운동을 보완해줍니다.'),('2024-10-10 10:58:04.143349',281,1,'덤벨을 들고 스쿼트를 한 후, 일어설 때 덤벨을 머리 위로 밀어 올리는 운동입니다.','덤벨 스쿼트 프레스','걷기, 달리기, 자전거와 같은 하체 운동을 보완하고, 상체의 근력을 동시에 기를 수 있어 전신 운동 효율이 높습니다.'),('2024-10-10 10:58:04.163192',282,1,'다리를 곧게 유지하며 허리 아래로 덤벨을 내리는 동작을 반복합니다.','스티프 레그 데드리프트','등산과 같은 하체 전반에 필요한 근력을 강화하고, 햄스트링과 척추 안정성을 기르는 데 도움을 줍니다.'),('2024-10-10 10:58:04.164917',283,1,'경쾌한 음악에 맞춰 댄스 동작을 따라하는 유산소 운동입니다.','줌바 댄스','에어로빅, 테니스, 농구와 같은 유산소 운동 효과를 높이면서 즐겁게 운동할 수 있는 요소를 제공합니다.'),('2024-10-10 10:58:04.175575',284,1,'고정된 자전거를 타면서 다양한 속도와 저항으로 운동하는 유산소 운동입니다.','스피닝','자전거 타기와 비슷한 운동으로 하체 근력을 기르고 체지방 감소에 효과적입니다.'),('2024-10-10 10:58:04.177129',285,1,'다양한 방향으로 빠르게 이동하며 복싱 스타일로 발을 옮기는 훈련입니다.','복싱 풋워크 드릴','복싱과 농구에서 필요한 민첩성과 빠른 발 움직임을 개선하는 데 도움이 됩니다.'),('2024-10-10 11:23:44.977060',286,1,'점프, 푸쉬업, 스쿼트를 결합한 전신 운동입니다.','버피','다양한 근육을 사용하며 유산소 운동의 효과가 높아 농구, 복싱 등과 같은 민첩성과 반응 속도가 필요한 스포츠에 도움이 됩니다.'),('2024-10-10 11:23:44.981478',287,1,'두 발로 뛰어올라 공중에서 무릎을 가슴 쪽으로 당기고 착지하는 운동입니다.','플라이오메트릭 점프','폭발적인 힘을 기르는데 효과적이며 농구의 점프 능력 향상에 기여합니다.'),('2024-10-10 11:23:44.982533',288,1,'로잉 머신에 앉아 발로 밀어내며 팔을 사용해 젖꼭지를 당기는 동작을 반복합니다.','로잉 머신','전신 근육을 사용하는 유산소 운동으로, 달리기 및 수영과 유사한 효과를 제공하며 심폐 지구력을 향상시킵니다.'),('2024-10-10 11:23:44.983720',289,1,'상대방과의 격돌을 통해 복싱의 기본 동작과 기술을 연습하며 스파링을 진행합니다.','킥복싱 스파링','공격성과 방어 능력을 향상시킬 수 있으며, 복싱과 격술의 타격 동작을 통해 전반적인 체력을 증진시킵니다.'),('2024-10-10 11:23:44.985023',290,1,'덤벨을 양손에 들고 어깨 높이에서 시작하여 위로 밀어내기를 반복합니다.','덤벨 숄더 프레스','상체 근력을 강화하고, 농구와 테니스에서 필요로 하는 팔 힘을 향상시킬 수 있습니다.'),('2024-10-10 11:45:22.675285',291,1,'두 손으로 케틀벨을 잡고 하체의 힘으로 스윙을 하여 몸의 중심에서부터 발끝까지 힘을 폭발적으로 전달합니다.','케틀벨 스윙','전신 근력과 심폐 지구력을 동시에 향상시켜 주며 달리기 및 농구 같은 강도 높은 운동의 효과를 높여줍니다.'),('2024-10-10 11:45:22.677178',292,1,'두 손으로 벤치나 평평한 표면을 잡고 팔꿈치를 굽혀 몸을 내려갔다가 다시 올립니다.','체중 딥','상체 근력을 강화하여 농구, 복싱 등의 플레이에서 필요한 힘과 안정성을 증가시켜 줍니다.'),('2024-10-10 11:45:22.678591',293,1,'샌드백이나 미트를 사용하여 연속적으로 발차기 및 주먹질을 하며 연습합니다.','킥복싱 백 드릴','유산소 능력을 향상시키고 킥복싱의 기술적인 부분을 더욱 강화할 수 있습니다.'),('2024-10-10 11:45:22.679867',294,1,'험준한 지형에서 자전거를 타며 다양한 오르막과 내리막을 포함하여 달리는 방식입니다.','산악 자전거 타기','하체 근력과 심폐 지구력을 동시에 향상시키면서 자전거와 하이킹을 좋아하는 사람에게 적합합니다.'),('2024-10-10 11:45:22.680959',295,1,'두 팀으로 나누어 모래사장에서 네트 너머로 공을 보내며 플레이하는 운동입니다.','비치발리볼','팀워크와 반사 신경을 요구하며 농구와 같은 구기 종목의 기술적 요소를 연습할 수 있습니다.'),('2024-10-10 11:58:16.293168',296,1,'밸런스 보드 위에 서거나 다양한 동작을 수행하여 균형과 코어 근육을 강화합니다.','밸런스 보드 트레이닝','다양한 운동에서의 균형 감각을 향상시키고 주요 근육군을 안정적으로 발달시킬 수 있습니다.'),('2024-10-10 11:58:16.294912',297,1,'무릎을 대고 스틸리티 볼을 앞쪽으로 굴리며 몸을 늘려 코어를 조이면서 다시 돌아옵니다.','스틀리 커터 (Stability Ball Rollout)','복부 및 전체 코어 근육 강화에 탁월하며, 뷰익스운동 (Boxing) 및 농구에서 필요한 코어 힘을 기르는 데 도움을 줍니다.'),('2024-10-10 11:58:16.295855',298,1,'자전거를 타고 다양한 지형이나 거리에서 운동하여 심폐 기능을 증진합니다.','로드 사이클링','자전거를 통한 유산소 운동으로 하체 근육을 강화하고 지구력을 높여 주며, 뛰기와 하이킹과 연계할 수 있습니다.'),('2024-10-10 11:58:16.296913',299,1,'산이나 경치 좋은 장소에서 걷거나 오르내리며 운동하는 것을 뜻합니다.','하이킹','자연 속에서 진행되는 하이킹은 정신적 안정감을 주며, 등산과 유사한 근육을 사용해 하체 및 심폐 지구력을 기릅니다.'),('2024-10-10 11:58:16.298051',300,1,'다양한 시나리오에 맞춰 몸을 움직이며 근력과 지구력을 함께 키우는 훈련입니다.','큐브 피트니스','상체와 하체 근력을 동시에 사용할 수 있으며, 복싱 같은 빠른 반응 속도를 기르는 데 큰 도움을 줍니다.'),('2024-10-10 12:10:28.629841',301,1,'서서 시작하여 스쿼트를 하며 손을 지면에 대고, 발을 뒤로 뛰어내려 플랭크 자세를 취한 후 다시 스쿼트로 돌아와 점프하는 동작입니다.','버피','유산소 운동과 전신 근력 강화를 동시에 할 수 있어 농구, 복싱, 테니스와 같은 스포츠에 도움을 줍니다.'),('2024-10-10 12:10:28.631616',302,1,'두 손으로 케틀벨 손잡이를 잡고, 무릎을 약간 구부린 상태에서 엉덩이를 뒤로 빼면서 케틀벨을 다리 사이로 보내고, explosively 엉덩이를 앞으로 밀어 케틀벨을 어깨 높이까지 들어올리는 동작입니다.','케틀벨 스윙','하체와 코어 근력을 강화하고, 유연성을 향상시켜 다양한 운동에서 전반적인 운동 성능을 높이는 데 도움을 줍니다.'),('2024-10-10 12:10:28.632483',303,1,'두 발을 모으고 서서 시작, 팔을 옆으로 벌리며 동시에 두 발을 옆으로 벌리는 동작을 반복합니다.','점핑 잭','전신을 사용하는 유산소 운동으로, 테니스나 농구 등의 체력을 기르는 데 도움이 됩니다.'),('2024-10-10 12:10:28.633428',304,1,'일정한 높이의 박스를 사용해, 박스 위로 오르내리는 동작을 통해 다리와 코어를 동시에 강화합니다.','퀸스 박스 피라미드','지구력과 근력이 결합된 운동으로, 운동의 다양성을 높여줍니다. 등산과 같은 피로감도 줄여줍니다.'),('2024-10-10 12:10:28.634258',305,1,'스쿼트 자세에서 시작하여, 최대한 높이 점프한 후 착지해 다시 스쿼트 자세로 돌아오는 동작입니다.','점프 스쿼트','하체 근력 강화와 폭발적인 힘을 기르는 데 도움을 주어, 달리기와 농구 수행능력을 향상시킵니다.'),('2024-10-10 13:12:13.756611',306,1,'두 발을 어깨너비로 벌리고, 허리를 곧게 펴며 엉덩이를 뒤로 빼면서 무릎을 굽혀 앉았다가 다시 일어섭니다.','체중 스쿼트','체중 스쿼트는 하체 강화와 균형 감각을 향상시키는 데 도움을 주어 걷기, 계단 오르기, 등산과 같은 활동의 성능을 높일 수 있습니다.'),('2024-10-10 13:12:13.793350',307,1,'안정적인 박스 앞에 서서, 두 발을 사용해 점프하여 박스 위에 착지한 후 다시 내려옵니다.','플라이오메트릭 박스 점프','이 운동은 폭발적인 힘과 민첩성을 향상시켜 농구, 복싱 및 테니스와 같은 고강도 스포츠에 유리합니다.'),('2024-10-10 13:12:13.795450',308,1,'여러 가지 동작(버피, 점프 스쿼트, 푸쉬업 등)을 설정된 시간 동안 연속으로 수행합니다.','크로스핏 서킷','다양한 운동을 결합하여 심폐 지구력과 근력을 동시에 향상시키므로, 에어로빅 및 HIIT 운동을 좋아하는 사람에게 적합합니다.'),('2024-10-10 13:12:13.796952',309,1,'도로에서 자전거를 타고 일정 거리를 빠르게 주행합니다.','로드 사이클링','아름다운 풍경을 감상하며 유산소 운동을 할 수 있어 자전거 타기를 즐기는 여러 사람들에게 매력적입니다.'),('2024-10-10 13:12:13.798372',310,1,'댄스 리듬에 맞춰 필라테스 동작을 수행하며 몸의 긴장을 풀고, 유연성을 높입니다.','댄스 필라테스','유연성과 코어 근육 강화를 동시에 할 수 있어 다양한 운동에 필요한 기초 체력을 기르는 데 좋습니다.'),('2024-10-10 13:19:52.892042',311,1,'두 손으로 케틀벨을 잡고, 허리 높이에서 시작하여 무릎을 약간 굽히며 케틀벨을 뒤로 Swing한 후 앞쪽으로 힘 있게 휘두르며 몸 앞쪽으로 올립니다.','케틀벨 스윙','에너지 소모가 크고 하체와 코어를 강화하는데 도움이 되며, 달리기와 복싱에서 필요한 폭발적인 힘을 기를 수 있습니다.'),('2024-10-10 13:19:52.893918',312,1,'덤벨을 두 손에 들고 무릎을 굽혀 몸을 앞으로 기울인 후, 팔을 아래로伸ば하였다가 팔꿈치를 들어 올리며 덤벨을 몸 쪽으로 끌어올립니다.','덤벨 로우','상체 근육을 강화하고, 농구와 복싱에서의 움직임을 더욱 효율적으로 만들어 줍니다.'),('2024-10-10 13:19:52.895102',313,1,'일정한 거리(예: 100m)를 최대한 빠르게 달린 후, 걷기나 느리게 달리기를 통해 회복하는 사이클을 반복합니다.','스프린트 인터벌','유산소 운동의 강도를 높여달리기 능력을 향상시키고, 다양한 스포츠(농구, 복싱 등)에서의 스피드를 증가시킵니다.'),('2024-10-10 13:19:52.896210',314,1,'일정한 시간 동안 빠르게 페달을 밟고, 그 후 느리게 회복하는 식으로 인터벌을 진행합니다.','사이클링 (인터벌)','심폐 지구력을 기르고 하체 근력을 강화하는데 매우 효과적이며, 자전거를 즐기는 당신에게 적합합니다.'),('2024-10-10 13:19:52.897300',315,1,'스텝박스에 한 발을 올리고, 그 발로 몸을 위로 밀어 올리며 반대편 다리를 들어올립니다. 이는 반복적으로 진행합니다.','스텝박스 운동','하체 근육을 강화하고 균형감각을 향상시키며, 농구와 테니스에서의 발놀림을 개선시킵니다.'),('2024-10-10 14:22:56.277015',316,3,'바벨이나 덤벨을 어깨 높이에서 시작하여 위로 밀어 올리며 팔을 펴는 운동입니다.','푸쉬 프레스','어깨와 상체의 근력 향상에 도움을 주며, 달리기와 배드민턴과 같은 유산소 운동 시 안정적인 자세를 유지하는 데 기여합니다.'),('2024-10-10 14:22:56.298664',317,3,'긴 의자나 패러럴 바 사이에 팔을 놓고 몸을 내렸다가 올리는 운동입니다.','패러럴 바 딥스','삼두근과 가슴 근육을 강화하여 테니스와 유도에서의 힘과 저항력을 높이는 데 도움이 됩니다.'),('2024-10-10 14:22:56.300430',318,3,'음악에 맞춰 다양한 킥과 펀치를 수행하는 유산소 운동입니다.','태보','유산소 운동으로서 심폐 기능을 향상시키고, 킥복싱과 유도의 발차기 기술을 강화하는 데 유용합니다.'),('2024-10-10 14:22:56.303108',319,3,'다양한 음악에 맞춰 팀원들과 함께 춤을 추며 운동하는 형태입니다.','댄스 에어로빅','재미와 함께 전신 근육을 사용하며, 에어로빅과 결합해 유산소 운동의 효과를 극대화할 수 있습니다.'),('2024-10-10 14:22:56.304849',320,3,'여러 종류의 강도 높은 운동을 짧은 시간 동안 반복하는 운동입니다.','하이 인텐시티 인터벌 트레이닝 (HIIT)','짧은 시간 안에 효과적으로 체력을 기르고, 중강도 운동을 선호하는 데 적합한 체계적인 운동 방식입니다.'),('2024-10-10 14:23:01.628759',321,3,'두 발로 땅을 밀고 점프하여 최대한 높이 뛰어오른 후, 부드럽게 착지합니다.','플라이오메트릭 점프','이 운동은 민첩성과 폭발력을 향상시켜 달리기와 배드민턴, 테니스와 같은 스포츠에서의 퍼포먼스를 높여줄 수 있습니다.'),('2024-10-10 14:23:01.630944',322,3,'바닥에 앉아 무릎을 구부리고 발을 바닥에 두고, 엉덩이를 들어올려 힙을 최대한 높이는 운동입니다.','힙 쓰러스트','하체 근육을 강화하고 안정성을 높여 주어 달리기와 자전거 타기에 도움이 됩니다.'),('2024-10-10 14:23:01.632212',323,3,'한쪽 다리를 앞으로 높이 차올려 발끝을 최대한 높이 유지하는 동작입니다.','하이킥','유연성과 근력을 동시에 개선할 수 있어 테니스와 탁구에서의 기동성을 발달시킵니다.'),('2024-10-10 14:23:01.633461',324,3,'두 손으로 줄을 잡고, 발로 쉽게 바닥을 터치하며 줄넘기를 합니다.','줄넘기','심박수를 높이고 전반적인 체력을 향상시켜 달리기와 에어로빅 운동에 좋습니다.'),('2024-10-10 14:23:01.634712',325,3,'다양한 방향으로 빠르게 스프린트하거나 사이드 스텝을 하는 운동입니다.','하체 드릴','하체 근육 발달과 민첩성을 기르는 데 도움을 주어 배드민턴과 탁구에서의 반응 속도를 높입니다.'),('2024-10-10 14:31:42.054937',326,3,'저항 밴드를 이용해 머리 위로 밀어 올리는 운동입니다. 앉거나 서서 수행할 수 있습니다.','밴드 밀리터리 프레스','상체 근력과 안정성을 키울 수 있어 테니스와 배드민턴의 스윙 동작을 보완합니다.'),('2024-10-10 14:31:42.056608',327,3,'바벨을 바닥에서 머리 위로 한 번에 올리는 운동으로, 빠른 속도로 수행합니다.','바벨 스내치','전신 근력을 향상시키며 달리기, 자전거와 같은 유산소 운동의 체력을 증진시킵니다.'),('2024-10-10 14:31:42.057782',328,3,'스텝박스 위로 점프하여 올라갔다가 다시 내려오는 운동입니다.','스텝박스 점프','하체의 폭발적인 힘과 민첩성을 길러 배드민턴과 탁구의 움직임에 유리합니다.'),('2024-10-10 14:31:42.058967',329,3,'다양한 방향으로 빠르게 이동하며 드리블하거나 스프린트하는 훈련입니다.','스피드 드릴','운동 능력과 반응 속도를 향상시켜 테니스와 배드민턴의 빠른 움직임에 도움이 됩니다.'),('2024-10-10 14:31:42.059967',330,3,'로우 머신을 사용하여 앉아서 로우 동작을 하며 유산소 운동을 병행합니다.','복합기구 유산소 운동 (예: 로우 머신)','전체 체력 증진과 동시에 다양한 근육을 사용하여 중강도 운동에 적합합니다.'),('2024-10-10 14:54:13.439113',331,5,'양발을 어깨너비로 벌리고 엉덩이를 뒤로 보내면서 무릎을 굽히고 앉는 자세를 취한 뒤, 다시 일어나는 동작을 반복합니다.','방항 스쿼트','하체 근력을 강화하고 균형 감각을 향상시켜 걷기와 계단오르기에 도움이 됩니다.'),('2024-10-10 14:54:13.440996',332,5,'양손으로 벤치나 의자를 잡고, 무릎을 굽히거나 다리를 편 상태에서 팔의 힘으로 몸을 아래로 내렸다가 위로 올리는 운동입니다.','벤치 딥','상체와 삼두근을 강화하여 농구와 달리기의 움직임을 보다 원활하게 만들 수 있습니다.'),('2024-10-10 14:54:13.442002',333,5,'발과 주먹을 사용하여 다양한 킥과 펀치를 조합하며 주어진 리듬에 맞춰 움직입니다.','킥복싱','체력과 유산소 능력을 향상시키며 스트레스 해소에도 좋고, 전신 운동으로 인해 농구와 달리기에 긍정적인 영향을 미칩니다.'),('2024-10-10 14:54:13.442995',334,5,'양손에 줄넘기를 잡고, 발을 번갈아 가며 줄을 넘는 동작을 반복합니다.','줄넘기','심박수를 높이고 하체 근력을 강화하여 계단 오르기 및 달리기에 도움이 됩니다.'),('2024-10-10 14:54:13.444035',335,5,'장애물이나 지형을 활용하여 점프, 달리기, 기어가기 등의 동작을 반복하며 경로를 통과합니다.','파크르','순발력과 유연성을 기르고 전신을 사용하는 운동으로, 등산과 같은 복잡한 지형에서도 도움이 됩니다.'),('2024-10-10 17:30:08.022964',336,3,'바벨을 바닥에서 들어올리는 운동으로, 등을 곧게 펴고 엉덩이와 무릎을 굽혀 바벨을 잡습니다. 허리를 사용해 바벨을 위로 들어올립니다.','데드리프트 변형','달리기와 자전거처럼 하체 근력을 키우는 데 도움이 되며, 전체적인 근육 발달과 코어 안정성을 높여줍니다.'),('2024-10-10 17:30:08.027722',337,3,'바를 잡고 매달린 후, 팔을 사용하여 몸을 위로 끌어올려 턱이 바를 넘길 때까지 올라갑니다.','턱걸이','상체와 팔의 근력을 강화하여 테니스와 배드민턴의 타격력 향상에 기여합니다.'),('2024-10-10 17:30:08.028885',338,3,'다양한 복싱 또는 킥복싱의 기술을 연습하며 주먹을 치고, 발을 움직여 체력을 높이는 훈련입니다.','복싱 또는 킥복싱 드릴','중강도 유산소 운동으로 심폐 지구력을 향상시키고, 스트레스 해소에 도움을 주며, 다른 스포츠와의 체력 향상에 기여합니다.'),('2024-10-10 17:30:08.029944',339,3,'로잉 머신에 앉아 발판에 발을 고정하고, 팔과 다리를 사용하여 손잡이를 앞으로 당겼다 밀면서 운동합니다.','로잉','전신을 사용하여 균형 잡힌 체력과 근육 발달을 도와주며, 유산소 능력을 향상시키는 데 좋습니다.'),('2024-10-10 17:30:08.031042',340,3,'네트를 기준으로 공을 주고받는 훈련, 다양한 기술 (드라이브, 드롭샷 등)을 연습하여 게임 실력을 높입니다.','배드민턴 드릴','배드민턴 기술 향상을 위한 다양한 드릴을 통해 반사 신경과 민첩성을 높이고, 재미를 더해줍니다.'),('2024-10-10 17:45:10.909737',341,3,'일정한 거리(예: 100m)를 전속력으로 달린 후, 짧은 회복 시간을 가지며 반복하는 훈련입니다.','스프린트 인터벌','달리기를 좋아하기 때문에, 스프린트 인터벌은 심폐지구력을 향상시키고, 빠른 속도로 달리는 능력을 키울 수 있습니다.'),('2024-10-10 17:45:10.911229',342,3,'바벨이나 덤벨을 바닥에서 어깨까지 들어 올린 후, 머리 위로 눕혀서 내리는 동작을 수행합니다.','클린 앤드 프레스','중강도 전신 운동으로 근력을 강화하고, 다른 운동(특히 배드민턴과 테니스)에서의 파워를 향상시킵니다.'),('2024-10-10 17:45:10.912144',343,3,'스틱과 공을 사용하여 다양한 드릴을 수행하며, 드리블 및 슈팅 연습을 포함합니다.','필드 하키 드릴','반사신경과 민첩성을 향상시켜 탁구와 배드민턴에서의 경기력을 높여줄 수 있습니다.'),('2024-10-10 17:45:10.913060',344,3,'거울 앞에서 킥복싱 동작을 연습하거나, 기본 동작을 상상하며 수행하는 훈련입니다.','킥복싱 샤도우','킥복싱의 기본 동작을 통해 체력을 향상시킬 수 있으며, 다른 운동과의 조합에서 유연성을 높일 수 있습니다.'),('2024-10-10 17:45:10.913892',345,3,'일정 시간 동안 빠르게 페달을 밟고, 그 후 느린 속도로 회복하는 사이클링 훈련입니다.','자전거 인터벌','자전거와 조합하여 심폐 지구력을 향상시키고, 근력과 스태미너를 동시에 기를 수 있습니다.'),('2024-10-10 17:57:33.932551',346,7,'팔을 뒤로 젖히고 가슴을 바닥에 가깝게 하여 몸을 낮춘 후, 엉덩이를 들어올리며 팔꿈치를 다시 펴는 동작을 반복합니다.','체중 푸시업 변형 (다이버 푸시업)','저강도, 중강도 및 고강도의 다양한 운동과 함께 상체 근력과 안정성을 강화할 수 있습니다. 농구와 같은 팀 스포츠에서도 뛰어난 효과를 볼 수 있습니다.'),('2024-10-10 17:57:33.934581',347,7,'몸을 플랭크 자세로 유지하고, 양 팔과 다리를 번갈아가며 앞으로 뻗는 동작을 반복합니다.','벌레 푸시업','코어 근력과 전체적인 체력을 향상시켜 걷기나 농구와 같은 운동 시 도움이 됩니다. 전신 운동으로 유산소와 근력 훈련을 동시에 합니다.'),('2024-10-10 17:57:33.935598',348,7,'단단한 스텝 위에 발을 올리고 반복적으로 올라가고 내려오는 동작을 수행합니다.','스태퍼 운동','저강도 및 중강도 유산소 운동으로 심폐지구력과 하체 근력을 동시에 강화할 수 있습니다. 저강도 운동을 통해 긴 시간 동안 지속할 수 있습니다.'),('2024-10-10 17:57:33.936459',349,7,'두 사람이 네트를 사이에 두고 라켓으로 shuttlecock을 치고 받는 운동입니다.','배드민턴','농구와 비슷한 전방향 빠른 움직임을 필요로 하며, 반사 신경과 유산소 능력을 향상시킬 수 있습니다.'),('2024-10-10 17:57:33.937286',350,7,'상체, 하체, 척추의 다양한 근육을 늘려주는 동작을 수행하여 몸의 긴장을 풀어줍니다.','스트레칭 루틴','모든 운동 후 근육 회복과 유연성을 향상시킴으로써 부상 예방 및 운동의 효과를 극대화할 수 있습니다. 특히 고강도 운동 후에는 필수입니다.'),('2024-10-10 17:58:04.921048',351,7,'양손에 케틀벨을 들고 어깨 높이에서 시작한 후, 머리 위로 천천히 밀어올립니다.','케틀벨 프레스','케틀벨 프레스는 상체와 코어를 강화하는 데 도움을 주며, 이전 추천 운동인 덤벨 프레스와 비슷한 효과를 제공하면서 운동의 다양성을 더해줍니다.'),('2024-10-10 17:58:04.922750',352,7,'바벨을 양손으로 잡고 무릎을 살짝 굽힌 상태에서 상체를 앞으로 기울인 후, 바벨을 배 쪽으로 끌어당깁니다.','바벨 로우','바벨 로우는 등 근육을 강화하고 자세를 개선하는 데 효과적이며, 고강도 운동을 즐기는 사람에게 필요한 힘과 안정성을 제공합니다.'),('2024-10-10 17:58:04.923666',353,7,'가벼운 공을 가지고 천천히 걷는 동시에 공을 바닥에서 튕겨서 바닥에 떨어지지 않도록 합니다.','바운스 워킹','저강도 운동을 선호하는 사람에게 적합하며, 걷기와 결합되어 유산소 운동 효과를 높이고 반동을 통해 즐거움을 더합니다.'),('2024-10-10 17:58:04.924632',354,7,'손을 바닥에 놓고 다리를 뒤로 뻗어 시작한 후, 한쪽 다리를 높이 들고 다른 다리도 번갈아가며 가볍게 움직입니다.','스트랫짐','스트랫짐은 체중을 사용한 다양한 동작으로 코어와 하체의 균형과 안정성을 향상시키면서도 중강도 운동의 느낌을 제공합니다.'),('2024-10-10 17:58:04.925535',355,7,'패들 보드에 서서 수평을 유지하고 패들을 사용하여 보드를 앞으로 추진합니다.','패들 보드','저강도이면서도 균형 감각과 코어 힘을 동시에 키울 수 있는 운동으로, 물에서 진행되기 때문에 스트레스 해소에도 좋습니다.'),('2024-10-11 00:15:58.965453',356,5,'로우잉 머신에 앉아 손잡이를 잡고 몸을 앞으로 두고 시작하여, 팔과 다리를 사용해 몸을 뒤로 젖히며 당겨옵니다.','로우잉 머신','걷기와 달리기로 강화된 심폐 지구력을 further develop하며, 전신 근육을 발달시키는 데도 도움이 됩니다.'),('2024-10-11 00:15:58.969263',357,5,'두 발을 어깨 너비로 벌리고 한 발을 앞으로 내딛어 무릎을 굽힙니다. 그런 다음 원위치로 돌아와 반대 쪽도 반복합니다.','런지','계단 오르기와 농구에서 필요한 하체 근력을 강화하고, 균형 감각도 향상시켜 줍니다.'),('2024-10-11 00:15:58.970242',358,5,'양손에 덤벨을 들고 팔을 구부려 덤벨을 어깨 쪽으로 올렸다가 천천히 내립니다.','프리웨이트 운동 (덤벨 컬)','농구 및 등산에 필요한 팔 근력을 강화하고, 전반적인 체력 향상에 기여합니다.'),('2024-10-11 00:15:58.971170',359,5,'다양한 동작으로 리듬에 맞춰 진행하는 유산소 운동으로, 팀과 함께 할 수도 있습니다.','에어로빅','걷기와 계단 오르기에서 얻는 유산소 효과를 지속할 수 있으며, 즐거운 음악과 함께 운동할 수 있는 점이 매력적입니다.'),('2024-10-11 00:15:58.972119',360,5,'카약을 타고 물 위를 항해하며 팔, 어깨, 등이 강화되는 운동입니다.','카약','등산과 비슷한 자연 속에서의 활동감을 주며, 전신 근육을 사용하는 동시에 심폐 지구력도 향상시킵니다.'),('2024-10-11 00:44:35.666282',361,2,'양손에 덤벨을 들고 허리를 약간 굽힌 자세에서 팔을 몸쪽으로 당겼다가 다시 내리는 동작을 반복합니다.','덤벨 로우','이 운동은 상체의 근력을 강화하며, 복싱의 움직임에 필요한 등의 근육을 발달시키는 데 도움을 줍니다.'),('2024-10-11 00:44:35.667750',362,2,'두 덤벨을 양쪽에서 모았다가 다시 바깥쪽으로 펼쳐 가슴을 자극하는 동작을 반복합니다.','플라이','가슴과 어깨 근육을 강화하여 복싱의 공격력을 높이는 데 도움을 줍니다.'),('2024-10-11 00:44:35.668697',363,2,'다양한 스트레칭 및 근력 운동을 통해 코어 근육을 강화하고 유연성을 증진합니다.','필라테스','유연성과 균형 감각을 향상시켜 걷기, 등산, 복싱 등에 필요한 전반적인 신체 조절 능력을 강화합니다.'),('2024-10-11 00:44:35.669646',364,2,'복싱 동작에 킥을 추가하여 체중 이동과 발리지를 연습하며 강도를 높입니다.','킥복싱','복싱에서의 스킬을 발전시키고 체력을 증진시키는 훈련으로, 전신 운동 효과가 뛰어납니다.'),('2024-10-11 00:44:35.670482',365,2,'산이나 공원 등에서 경치를 즐기며 천천히 또는 빠르게 걷는 운동입니다.','하이킹','이미 등산을 즐기고 있으므로, 다양한 경로와 속도로 걷기를 통해 체력과 지구력을 더 향상시킬 수 있습니다.'),('2024-10-11 03:00:13.744541',366,3,'롤러를 사용해 긴장된 근육에 압력을 가하며 부드럽게 마사지해 줍니다.','롤링 (Foam Rolling)','다양한 운동 후에 근육 회복을 도와주고 유연성을 향상시켜 더욱 능률적인 운동을 가능하게 합니다.'),('2024-10-11 03:00:13.749557',367,3,'두 손으로 케틀벨을 바닥에서 들어 올리며 몸의 위로 스내치하는 동작을 반복합니다.','케틀벨 스내치','전신 근력과 파워를 강화하며, 운동 속도를 높이고, 유산소 능력을 키워 여러 스포츠 활동에 도움이 됩니다.'),('2024-10-11 03:00:13.751143',368,3,'고정된 자전거나 실외 자전거를 타고 지속적으로 페달을 밟습니다.','싸이클링','유산소 운동의 좋은 조합으로 하체 힘을 더욱 강하게 하고 심폐 지구력을 키워줍니다.'),('2024-10-11 03:00:13.752558',369,3,'다양한 음악에 맞춰 스텝과 동작을 반복하며 진행하는 운동입니다.','에어로빅 댄스','리듬에 맞춰 전신을 움직이며 심폐 기능을 향상시키고 재미 요소를 추가할 수 있습니다.'),('2024-10-11 03:00:13.753821',370,3,'다양한 타격 기술과 이동 방법을 연습하는 훈련입니다.','배드민턴 전술 훈련','빠른 반사 신경과 민첩성을 향상시키며 배드민턴 기술을 더욱 정교하게 발전시킬 수 있습니다.'),('2024-10-11 10:14:36.417863',371,3,'손을 어깨 너비로 벌리고 바닥을 눌러 몸을 낮추었다가 다시 밀어 올리는 운동입니다.','푸쉬 업 변형','푸쉬업은 상체와 코어 근력을 강화하는 데 도움을 주며, 달리기와 스포츠 활동에서 몸의 안정성을 향상시킬 수 있습니다.'),('2024-10-11 10:14:36.421775',372,3,'덤벨을 양손에 들고, 한 발을 스텝 박스에 올린 후 반대 발을 따라 올리는 운동입니다.','덤벨 스텝 업','스텝 업은 하체 근력을 강화하고 균형 감각을 향상시키는 데 좋으며, 배드민턴과 테니스와 같은 스포츠에서 필요한 기초 체력을 제공합니다.'),('2024-10-11 10:14:36.422907',373,3,'다양한 댄스 스타일에 맞춰 리듬에 맞춰 몸을 움직이는 운동입니다.','댄스 운동 (다양한 스타일)','댄스 운동은 유산소 운동의 좋은 예로, 에어로빅과 함께 전신 운동을 통해 심폐 기능을 개선하고 재미를 더할 수 있습니다.'),('2024-10-11 10:14:36.424052',374,3,'짧은 거리에서 전속력으로 달린 후, 회복 구간을 가지며 반복하는 운동입니다.','스프린트 훈련','스프린트는 빠른 속도로 달리는 운동으로, 달리기 속도와 지구력을 향상시키며, 테니스와 탁구와 같은 스포츠에서 필요한 순간적인 힘을 개발하는 데 효과적입니다.'),('2024-10-11 10:14:36.424953',375,3,'저항 밴드를 발목 주위에 두르고 측면으로 걸어가는 운동입니다.','밴드 레터럴 워크','이 운동은 엉덩이 및 허벅지 외측 근육을 강화하여 균형과 협응력을 향상시키며, 다양한 스포츠 활동에서의 부상 예방에 도움을 줍니다.'),('2024-10-11 10:43:13.059147',376,3,'바에 매달린 상태에서 팔과 어깨의 힘을 이용하여 몸을 위로 끌어올리는 운동.','풀업','달리기와 테니스와 같은 전신 운동에 도움이 되며, 상체와 코어 강화를 통해 더 나은 균형과 힘을 제공합니다.'),('2024-10-11 10:43:13.063326',377,3,'양손에 덤벨을 쥐고 어깨 높이에서 시작해 위로 밀어 올리는 운동.','덤벨 오버헤드 프레스','중강도의 다양한 운동에서 사용하는 어깨 근육을 강화하여 상체의 안정성을 높이며, 테니스 및 배드민턴에서의 스윙 동작에 도움을 줍니다.'),('2024-10-11 10:43:13.064413',378,3,'점프 로프를 사용하여 리드미컬하게 점프하면서 하체와 코어를 강화하는 운동.','킥복싱 점프 로프','유산소 운동과 조정 능력을 동시에 키울 수 있으며, 다른 운동들의 지구력 향상에 기여합니다.'),('2024-10-11 10:43:13.065621',379,3,'발판이나 벤치에 발을 올리고 크고 빠른 스텝으로 올라갔다 내리는 운동.','스텝 밀리터리','다리의 힘과 전체적인 유산소 능력을 향상시키며, 배드민턴과 테니스에서 필요한 스피드와 민첩성을 키워줍니다.'),('2024-10-11 10:43:13.066777',380,3,'다양한 체중 운동(푸쉬업, 스쿼트 등)을 조합하여 구성된 훈련 프로그램.','캘리퍼스 훈련 (Calisthenics)','자기 체중을 이용한 운동으로 근력을 기르며, 전체적인 체력을 증가시킬 수 있습니다. 이는 달리기나 다양한 중강도 운동에도 긍정적인 영향을 미칩니다.'),('2024-10-11 11:31:18.361952',381,1,'바에 양손을 잡고 몸을 끌어올리는 운동으로, 팔과 어깨의 근력을 키웁니다.','턱걸이','상체와 팔 근력을 강화하며, 복싱과 농구에도 도움이 됩니다.'),('2024-10-11 11:31:18.366263',382,1,'발을 한 발짝 앞에 두고 올라가 내려오는 운동입니다.','스텝업','하체 강화와 균형 향상에 좋으며, 계단 오르기와 유사한 효과를 냅니다.'),('2024-10-11 11:31:18.367526',383,1,'음악에 맞춰 다양한 동작을 섞어가며 춤추는 운동입니다.','줌바','유산소 운동으로 지구력을 키워주며, 에어로빅을 즐기는 당신에게 적합합니다.'),('2024-10-11 11:31:18.368692',384,1,'탁구 라켓으로 공을 쳐서 상대의 테이블 쪽으로 보내는 스포츠입니다.','탁구','반사신경과 민첩성을 키워 주며, 친구와의 운동 또한 격려합니다.'),('2024-10-11 11:31:18.369932',385,1,'다양한 자세를 통해 심신의 안정과 균형을 찾는 운동입니다.','요가','유연성을 향상시키고 스트레스를 줄여주는 효과가 있어 다양한 운동에 도움이 됩니다.'),('2024-10-11 11:31:31.341567',386,3,'바에 매달린 상태에서 팔을 이용해 몸을 위로 끌어올리는 운동입니다.','풀업','풀업은 상체 근력을 향상시키고 다양한 운동과 조화를 이루며, 특히 테니스와 배드민턴에서의 상체 발달에 도움이 됩니다.'),('2024-10-11 11:31:31.343442',387,3,'양손에 덤벨을 들고 상체를 숙여 팔을 쭉 뻗고 다시 위로 끌어당기는 운동입니다.','덤벨 로우','덤벨 로우는 등 근육을 강화하여 체중을 지탱하고 균형을 향상시키며, 자전거와 테니스에서의 퍼포먼스에 긍정적인 영향을 줍니다.'),('2024-10-11 11:31:31.344850',388,3,'스피닝 자전거를 이용해 다양한 세기와 페이스로 운동하는 방법입니다.','스피닝','자전거와 달리기와 유사한 유산소 운동으로, 심폐지구력을 향상시키고 하체 근육을 강화하며 재미를 더할 수 있습니다.'),('2024-10-11 11:31:31.345951',389,3,'일정 거리를 설정하고, 정해진 페이스로 달리는 훈련 방식입니다.','하프 마라톤 훈련','지속적인 달리기를 통해 지구력을 키우고, 달리기 외에 다른 종목에서도 유산소 능력을 향상시킬 수 있습니다.'),('2024-10-11 11:31:31.347217',390,3,'음악에 맞춰 다양한 유산소 및 근력 동작을 결합해 진행하는 운동입니다.','차게니 운동','에어로빅과 유사하지만 보다 다양한 동작을 통해 유연성과 전신 근력을 함께 키울 수 있어 다양한 운동에서의 퍼포먼스를 증진시킬 수 있습니다.');
/*!40000 ALTER TABLE `RecommendedExercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RefreshToken`
--

DROP TABLE IF EXISTS `RefreshToken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RefreshToken` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `expiration` varchar(255) DEFAULT NULL,
  `refresh` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RefreshToken`
--

LOCK TABLES `RefreshToken` WRITE;
/*!40000 ALTER TABLE `RefreshToken` DISABLE KEYS */;
INSERT INTO `RefreshToken` VALUES (2,'Sat Oct 12 11:25:56 KST 2024','eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Imtha2FvIDM3MTI5NjU5MjkiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODYxMzU1NiwiZXhwIjoxNzI4Njk5OTU2fQ.RZN5ZIlSuU-OL1RmbA1L235TI_Vd06FBPQWHr7F0viE','kakao 3712965929'),(4,'Sat Oct 12 11:30:31 KST 2024','eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Imtha2FvIDM3MzQ0MDAxNDQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODYxMzgzMSwiZXhwIjoxNzI4NzAwMjMxfQ.uiJiOTL9ufa0TFXC6c_fiHvyx0VG8-82OQRBRDSWjlw','kakao 3734400144'),(6,'Sat Oct 12 11:33:17 KST 2024','eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Imtha2FvIDM3MzQ0MDAxNDQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODYxMzk5NywiZXhwIjoxNzI4NzAwMzk3fQ.bbb7PI1EXEcG-Y499NFHyVxCpgNT312egEZSDwa_NQk','kakao 3734400144'),(8,'Sat Oct 12 11:36:24 KST 2024','eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Imtha2FvIDM3MzQ0MDAxNDQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODYxNDE4NCwiZXhwIjoxNzI4NzAwNTg0fQ.jL7igL7tE20SYRscQBfUdt0cyAz7fQgTi-8Gga4MLDw','kakao 3734400144'),(10,'Sat Oct 12 11:40:36 KST 2024','eyJhbGciOiJIUzI1NiJ9.eyJjYXRlZ29yeSI6InJlZnJlc2giLCJ1c2VybmFtZSI6Imtha2FvIDM3MzQ0MDAxNDQiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyODYxNDQzNiwiZXhwIjoxNzI4NzAwODM2fQ.SeNNwQsHduW9GdCS24Of6kRBeuULLAfcgJJa3klFPUM','kakao 3734400144');
/*!40000 ALTER TABLE `RefreshToken` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SnackCalories`
--

DROP TABLE IF EXISTS `SnackCalories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SnackCalories` (
  `calories` int NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `frequency` enum('NEVER','OFTEN','RARELY','VERY_OFTEN') NOT NULL,
  `type` enum('DRINK','SNACK') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SnackCalories`
--

LOCK TABLES `SnackCalories` WRITE;
/*!40000 ALTER TABLE `SnackCalories` DISABLE KEYS */;
INSERT INTO `SnackCalories` VALUES (0,1,'NEVER','SNACK'),(50,2,'RARELY','SNACK'),(100,3,'OFTEN','SNACK'),(166,4,'VERY_OFTEN','SNACK'),(0,5,'NEVER','DRINK'),(50,6,'RARELY','DRINK'),(83,7,'OFTEN','DRINK'),(133,8,'VERY_OFTEN','DRINK');
/*!40000 ALTER TABLE `SnackCalories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `User`
--

DROP TABLE IF EXISTS `User`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `User` (
  `birthday` date DEFAULT NULL,
  `coin` int NOT NULL,
  `dailyCaloricIntake` int DEFAULT NULL,
  `surveyCompleted` bit(1) NOT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deviceToken` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `profileImage` varchar(255) DEFAULT NULL,
  `sso` varchar(255) NOT NULL,
  `gender` enum('MAN','WOMAN') DEFAULT NULL,
  `role` enum('USER') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKcdd273rg61diywe30f4k0t5mo` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` VALUES ('1999-12-01',750,1449,_binary '','2024-10-07 14:53:34.123726',1,'e65LIAtcYoogEZmmj5As7j:APA91bHs6aaD52oCnzQaXEF4fmOMzi8J3-R8yv6JvbuAIJJV7b-tUrs0QGSq3DDkxYCbyVmbvkf8_kLq932yIntmnyEhTB1mKN6D2nVFfGZLauVorNREWPkEoE3mC-aLUIArnmFTDq37',NULL,'김민영','유씨시주녁이',NULL,'kakao 3734400144','WOMAN','USER'),('1234-12-05',1400,2583,_binary '','2024-10-07 14:55:02.646332',2,'eyeKB2LRCWs69wtdBQsdfd:APA91bHsyBOnKsKvXCXEWJFrJLGL38nvkIGB1zgIM-Dpr4RTy4wu-hfqLDO516KS-Fi4p03R_O6_FtFCPNZ3TM7NTLC5bbjpv_oZUhpRE2V_1sed8VNXRZqzse7Nuo28b-EtCLyWAfYc',NULL,'인호현','123',NULL,'kakao 3726130306','MAN','USER'),('1999-09-01',600,2450,_binary '','2024-10-07 14:58:12.717559',3,'dPwnLWo81XDPhqFNV7v10f:APA91bG1VWDhRkJ1J3fDaOfYM2n6k-WZpJ01wqQCy94xMJGTlN7idKk_Hs0Q7oEJDabUZhYoGz-dXmvRCckJ276gaqXiGv02h9NrZAVFC1IKzzxBbWxLKm45tH3-nh2Xx2urdkaFgmrc',NULL,'송준혁','지구한바퀴',NULL,'kakao 3712965929','MAN','USER'),('1999-04-10',100150,1700,_binary '','2024-10-07 17:05:13.316722',5,'d077Y18qW0wAu-3sytCaQ0:APA91bExZ2eucK-B3Q0LR4HKr-HJ3ZNVFEKkWVGfy6s-3KPrmt1sU2u0jQQ70rPutYJeZ-fESHHjQi1gDB9GtYkpsYfqDa6OlHgVxP-VQRDy3DFzR4qx0z3hmy3G6ICm6hY0HJN2Dfp8',NULL,'박지응','지응이',NULL,'kakao 3698809905','MAN','USER'),('1997-06-04',1400,1500,_binary '','2024-10-08 14:54:57.331452',6,'eFZixgdvGBJqE3eIx8dXPW:APA91bH3y5YB-UMAm7AXTXz30rzgaYBs_P8c4DEkRj_6itzJ8ced-ts9D9QilSmHv2E19Bnc-unF0AS5E7BfMQXIxulBtmSDszNkrQNjd4A5cfQCZK9Xh1G-igZVEzFD0jB99VAFnk2H',NULL,'Mincheol Park','박민철123',NULL,'kakao 3738127922','MAN','USER'),('2000-11-05',97749,1500,_binary '','2024-10-08 15:26:38.795135',7,NULL,NULL,'김민주','Mj',NULL,'kakao 3732314386','MAN','USER'),('1973-10-05',100,1700,_binary '','2024-10-10 14:31:16.807904',11,'dV6F7G975dEYrggj2M1S-a:APA91bGRwmItDYAHKDOLL0FKqb46i6poI7LbrTAxDfIREp115kz7BZiOUZkN9Zuz-vxq1UJYO-0Xi-YqkCM149ozlvnFl4I_nmDmFZy2KY6SVD8ikV1LLWeLSemYGI5ZBfUoWvAE2__C',NULL,'서정빈','하하호호',NULL,'kakao 3741648063','MAN','USER'),('1998-09-13',100,2400,_binary '','2024-10-10 19:43:42.952656',12,NULL,NULL,'김훈민','vtz',NULL,'kakao 3742296463','MAN','USER'),(NULL,100,NULL,_binary '\0','2024-10-10 19:44:37.060611',13,NULL,'inhohyun36@gmail.com','인호현',NULL,NULL,'google 106050180300419507959',NULL,'USER'),('1997-06-10',100,1500,_binary '','2024-10-10 22:28:02.713953',14,NULL,'shoostar0611@gmail.com','D Park','민철1234',NULL,'google 110436420577045699456','MAN','USER'),(NULL,0,2500,_binary '','2024-10-11 10:39:33.860128',15,'ekn4_fzWNxYA6ypZNkbePh:APA91bFhxx5GYBAoRYuEv5fxOwdq3FmRa5sExkYm42pKMOJUWJ0HJ9KrBy-GSqgazfXMQSX-V4S89Gp3bqnd1B9IkH0jtPMIXy3Zq_083aCBPqOCci5E7aLNmAQBTsALZva4G_p9FgPs',NULL,'윤하연',NULL,NULL,'kakao 3740532059',NULL,'USER');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserCrew`
--

DROP TABLE IF EXISTS `UserCrew`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserCrew` (
  `activityScore` float DEFAULT NULL,
  `basicScore` float DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `crew_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint DEFAULT NULL,
  `role` enum('LEADER','MEMBER','NOT_REGISTERED') NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`),
  KEY `idx_crew_id` (`crew_id`),
  CONSTRAINT `FKhv4ej01nkb30fueksc5e09ah` FOREIGN KEY (`crew_id`) REFERENCES `Crew` (`id`),
  CONSTRAINT `FKrionoufqcol2kcxnp7hf99hu6` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserCrew`
--

LOCK TABLES `UserCrew` WRITE;
/*!40000 ALTER TABLE `UserCrew` DISABLE KEYS */;
INSERT INTO `UserCrew` VALUES (0,3.8745,'2024-10-08 21:20:21.227463',1,1,7,'LEADER'),(0,0,'2024-10-08 21:30:05.438292',2,2,7,'LEADER'),(0,3.8745,'2024-10-09 14:27:58.203878',23,4,7,'LEADER'),(500,400,'2024-10-09 14:45:09.000000',3,5,5,'LEADER'),(100,200,'2024-10-09 15:35:46.000000',4,6,1,'LEADER'),(200,300,'2024-10-09 15:35:46.000000',5,7,2,'LEADER'),(300,200,'2024-10-09 15:35:46.000000',6,8,3,'LEADER'),(400,300,'2024-10-09 15:35:46.000000',7,9,6,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',8,10,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',9,11,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',10,12,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',11,13,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',12,14,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',13,15,5,'LEADER'),(0,41.3,'2024-10-09 15:48:36.000000',14,16,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',15,17,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',16,18,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',17,19,5,'LEADER'),(0,0,'2024-10-09 15:48:36.000000',18,20,5,'LEADER'),(0,0,'2024-10-09 15:48:37.000000',19,21,5,'LEADER'),(0,0,'2024-10-09 15:48:37.000000',20,22,5,'LEADER'),(0,0,'2024-10-09 15:48:37.000000',21,23,5,'LEADER'),(0,0,'2024-10-09 15:48:37.000000',22,24,5,'LEADER'),(0,0,'2024-10-09 18:02:24.036679',24,25,7,'LEADER'),(0,1.50675,'2024-10-09 20:46:09.314252',25,26,7,'LEADER'),(0,0,'2024-10-10 12:11:35.241916',26,27,1,'LEADER'),(0,0,'2024-10-10 22:44:14.000000',6,28,2,'MEMBER'),(0,0,'2024-10-10 22:44:14.000000',6,29,5,'MEMBER'),(0,0,'2024-10-10 22:44:14.000000',6,30,6,'MEMBER'),(0,0,'2024-10-10 22:44:14.000000',6,31,7,'MEMBER'),(0,0,'2024-10-11 09:08:33.000000',2,32,1,'MEMBER');
/*!40000 ALTER TABLE `UserCrew` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UserQuest`
--

DROP TABLE IF EXISTS `UserQuest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserQuest` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) DEFAULT NULL,
  `status` enum('COMPLETED','CREATED','FINISHED') NOT NULL,
  `quest_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK34u9d3jnj0kxkm03jjclt43le` (`quest_id`),
  KEY `FKgjcjnk4fsw9vcf26xv705hefh` (`user_id`),
  CONSTRAINT `FK34u9d3jnj0kxkm03jjclt43le` FOREIGN KEY (`quest_id`) REFERENCES `Quest` (`id`),
  CONSTRAINT `FKgjcjnk4fsw9vcf26xv705hefh` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserQuest`
--

LOCK TABLES `UserQuest` WRITE;
/*!40000 ALTER TABLE `UserQuest` DISABLE KEYS */;
INSERT INTO `UserQuest` VALUES (1,'2024-10-11 11:25:04.845952','COMPLETED',1,1),(2,'2024-10-11 11:25:04.920538','CREATED',1,2),(3,'2024-10-11 11:25:04.923182','COMPLETED',1,3),(4,'2024-10-11 11:25:04.925555','CREATED',1,5),(5,'2024-10-11 11:25:04.927662','CREATED',1,6),(6,'2024-10-11 11:25:04.929583','CREATED',1,7),(7,'2024-10-11 11:25:04.932001','CREATED',1,11),(8,'2024-10-11 11:25:04.934266','CREATED',1,12),(9,'2024-10-11 11:25:04.936655','CREATED',1,13),(10,'2024-10-11 11:25:04.938589','CREATED',1,14),(11,'2024-10-11 11:25:04.940377','CREATED',1,15),(12,'2024-10-11 11:25:04.942167','CREATED',2,1),(13,'2024-10-11 11:25:04.944022','CREATED',2,2),(14,'2024-10-11 11:25:04.945659','COMPLETED',2,3),(15,'2024-10-11 11:25:04.947420','CREATED',2,5),(16,'2024-10-11 11:25:04.949510','CREATED',2,6),(17,'2024-10-11 11:25:04.951426','CREATED',2,7),(18,'2024-10-11 11:25:04.953098','CREATED',2,11),(19,'2024-10-11 11:25:04.954707','CREATED',2,12),(20,'2024-10-11 11:25:04.956401','CREATED',2,13),(21,'2024-10-11 11:25:04.958097','CREATED',2,14),(22,'2024-10-11 11:25:04.959987','CREATED',2,15),(23,'2024-10-11 11:25:05.053111','CREATED',3,1),(24,'2024-10-11 11:25:05.054926','CREATED',3,2),(25,'2024-10-11 11:25:05.056327','CREATED',3,3),(26,'2024-10-11 11:25:05.057635','CREATED',3,5),(27,'2024-10-11 11:25:05.058992','CREATED',3,6),(28,'2024-10-11 11:25:05.060484','CREATED',3,7),(29,'2024-10-11 11:25:05.061979','CREATED',3,11),(30,'2024-10-11 11:25:05.063449','CREATED',3,12),(31,'2024-10-11 11:25:05.064921','CREATED',3,13),(32,'2024-10-11 11:25:05.066321','CREATED',3,14),(33,'2024-10-11 11:25:05.067895','CREATED',3,15);
/*!40000 ALTER TABLE `UserQuest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `gender` tinyint NOT NULL,
  `bodyType_id` bigint DEFAULT NULL,
  `createdAt` datetime(6) DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `characterFile` varchar(255) DEFAULT NULL,
  `characterImage` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKel73a96shnshrwwn938g0xaam` (`bodyType_id`),
  CONSTRAINT `FKel73a96shnshrwwn938g0xaam` FOREIGN KEY (`bodyType_id`) REFERENCES `BodyType` (`id`),
  CONSTRAINT `characters_chk_1` CHECK ((`gender` between 0 and 1))
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (0,1,'2024-10-02 10:48:56.790227',1,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B1.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b1.png'),(0,2,'2024-10-02 10:50:08.710493',2,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B2.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b2.png'),(0,3,'2024-10-02 10:51:37.003303',3,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B3.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b3.png'),(0,4,'2024-10-02 10:52:21.084247',4,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B4.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b4.png'),(0,5,'2024-10-02 10:53:35.754361',5,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B5.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b5.png'),(0,6,'2024-10-02 10:55:37.460023',6,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B6.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b6.png'),(0,7,'2024-10-02 10:56:16.266934',7,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B7.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b7.png'),(0,8,'2024-10-02 10:57:01.952301',8,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B8.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b8.png'),(0,9,'2024-10-02 10:57:52.272951',9,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B9.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b9.png'),(0,10,'2024-10-02 10:58:36.217379',10,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B10.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/b10.png'),(1,11,'2024-10-02 11:00:58.839297',11,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G1.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g1.png'),(1,12,'2024-10-02 11:01:31.897943',12,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G2.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g2.png'),(1,13,'2024-10-02 11:02:08.182531',13,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G3.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g3.png'),(1,14,'2024-10-02 11:02:36.524882',14,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G4.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g4.png'),(1,15,'2024-10-02 11:02:55.937648',15,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G5.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g5.png'),(1,16,'2024-10-02 11:03:31.374061',16,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G6.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g6.png'),(1,17,'2024-10-02 11:04:14.132268',17,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G7.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g7.png'),(1,18,'2024-10-02 11:04:37.820698',18,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G8.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g8.png'),(1,19,'2024-10-02 11:05:00.817644',19,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G9.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g9.png'),(1,20,'2024-10-02 11:05:21.661379',20,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/G10.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/chracter_image/g10.png'),(0,1,'2024-10-03 15:04:23.477041',21,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B1pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/1dcdedd7-77e5-4b26-ac52-b8c2e7cdb98c.png'),(0,2,'2024-10-03 15:04:41.794381',22,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B2pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/282b9163-2092-4d3a-ac62-548c4250e565.png'),(0,3,'2024-10-03 15:04:54.618306',23,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B3pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/4bdec464-9eb4-47c4-9e69-b4aeea456fc4.png'),(0,4,'2024-10-03 15:05:08.136157',24,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B4pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/6ca31801-434f-4a44-b8b2-8de7050bb835.png'),(0,5,'2024-10-03 15:21:01.684200',25,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B5pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/73e7ba47-cb3c-4aff-9b31-2700f048b8f5.png'),(0,6,'2024-10-03 15:21:17.233137',26,'https://c106-chaun.s3.ap-northeast-2.amazonaws.com/character_model/B6pants.glb','https://c106-chaun.s3.ap-northeast-2.amazonaws.com/7c42b780-458d-4527-8ae1-fdc5aef3dae5.png');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 11:53:13
