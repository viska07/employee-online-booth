-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: employee_online_booth
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts_employeeprofile`
--

DROP TABLE IF EXISTS `accounts_employeeprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_employeeprofile` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `department` varchar(30) NOT NULL,
  `position` varchar(30) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` int NOT NULL,
  `nik` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  UNIQUE KEY `nik` (`nik`),
  CONSTRAINT `accounts_employeeprofile_user_id_c9163851_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_employeeprofile`
--

LOCK TABLES `accounts_employeeprofile` WRITE;
/*!40000 ALTER TABLE `accounts_employeeprofile` DISABLE KEYS */;
INSERT INTO `accounts_employeeprofile` VALUES (1,'IT','INTERN','2026-08-31 15:14:35.500435','2026-08-31 15:14:35.500448',12,'123456');
/*!40000 ALTER TABLE `accounts_employeeprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_systemsetting`
--

DROP TABLE IF EXISTS `accounts_systemsetting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_systemsetting` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `company_description` longtext,
  `company_logo` varchar(100) DEFAULT NULL,
  `default_audience` varchar(20) NOT NULL,
  `booth_per_page` int unsigned NOT NULL,
  `announcement_per_page` int unsigned NOT NULL,
  `featured_limit` int unsigned NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `show_featured_booth` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `accounts_systemsetting_chk_1` CHECK ((`booth_per_page` >= 0)),
  CONSTRAINT `accounts_systemsetting_chk_2` CHECK ((`announcement_per_page` >= 0)),
  CONSTRAINT `accounts_systemsetting_chk_3` CHECK ((`featured_limit` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_systemsetting`
--

LOCK TABLES `accounts_systemsetting` WRITE;
/*!40000 ALTER TABLE `accounts_systemsetting` DISABLE KEYS */;
INSERT INTO `accounts_systemsetting` VALUES (1,'FILTRONA DIGITAL EXHIBITON','Digital information booth for employee information and learning.','settings/images-removebg-preview_6.png','EMPLOYEE',10,10,5,'2026-08-19 11:39:34.864004',0);
/*!40000 ALTER TABLE `accounts_systemsetting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements_announcement`
--

DROP TABLE IF EXISTS `announcements_announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements_announcement` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `category` varchar(20) NOT NULL,
  `target_audience` varchar(50) NOT NULL,
  `attachment` varchar(100) DEFAULT NULL,
  `start_date` datetime(6) NOT NULL,
  `end_date` datetime(6) DEFAULT NULL,
  `is_important` tinyint(1) NOT NULL,
  `is_published` tinyint(1) NOT NULL,
  `send_email` tinyint(1) NOT NULL,
  `send_whatsapp` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `email_recipient_mode` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements_announcement`
--

LOCK TABLES `announcements_announcement` WRITE;
/*!40000 ALTER TABLE `announcements_announcement` DISABLE KEYS */;
INSERT INTO `announcements_announcement` VALUES (2,'Safety Meeting June 2026','Mandatory safety meeting for all employees.','SAFETY','ALL','','2026-07-13 07:49:26.000000','2026-12-31 13:00:00.000000',1,1,1,0,'2026-06-22 07:49:44.398689','2026-07-20 09:26:29.308467','SELECTED'),(3,'Production Training Schedule','New training schedule for production employees.','HR','PRODUCTION','','2026-07-20 07:50:52.000000','2026-07-30 07:50:58.000000',0,1,0,0,'2026-06-22 07:51:10.463620','2026-07-13 12:02:02.078069','AUDIENCE');
/*!40000 ALTER TABLE `announcements_announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements_announcement_selected_email_recipients`
--

DROP TABLE IF EXISTS `announcements_announcement_selected_email_recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements_announcement_selected_email_recipients` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `announcement_id` bigint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `announcements_announceme_announcement_id_user_id_649b0426_uniq` (`announcement_id`,`user_id`),
  KEY `announcements_announ_user_id_014641a5_fk_auth_user` (`user_id`),
  CONSTRAINT `announcements_announ_announcement_id_4990767c_fk_announcem` FOREIGN KEY (`announcement_id`) REFERENCES `announcements_announcement` (`id`),
  CONSTRAINT `announcements_announ_user_id_014641a5_fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements_announcement_selected_email_recipients`
--

LOCK TABLES `announcements_announcement_selected_email_recipients` WRITE;
/*!40000 ALTER TABLE `announcements_announcement_selected_email_recipients` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements_announcement_selected_email_recipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements_announcementactivity`
--

DROP TABLE IF EXISTS `announcements_announcementactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements_announcementactivity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(255) NOT NULL,
  `user_email` varchar(254) NOT NULL,
  `action` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `announcement_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_announcement_activity` (`announcement_id`,`user_email`,`action`),
  CONSTRAINT `announcements_announ_announcement_id_20dc6833_fk_announcem` FOREIGN KEY (`announcement_id`) REFERENCES `announcements_announcement` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements_announcementactivity`
--

LOCK TABLES `announcements_announcementactivity` WRITE;
/*!40000 ALTER TABLE `announcements_announcementactivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `announcements_announcementactivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',3,'add_permission'),(6,'Can change permission',3,'change_permission'),(7,'Can delete permission',3,'delete_permission'),(8,'Can view permission',3,'view_permission'),(9,'Can add group',2,'add_group'),(10,'Can change group',2,'change_group'),(11,'Can delete group',2,'delete_group'),(12,'Can view group',2,'view_group'),(13,'Can add user',4,'add_user'),(14,'Can change user',4,'change_user'),(15,'Can delete user',4,'delete_user'),(16,'Can view user',4,'view_user'),(17,'Can add content type',5,'add_contenttype'),(18,'Can change content type',5,'change_contenttype'),(19,'Can delete content type',5,'delete_contenttype'),(20,'Can view content type',5,'view_contenttype'),(21,'Can add session',6,'add_session'),(22,'Can change session',6,'change_session'),(23,'Can delete session',6,'delete_session'),(24,'Can view session',6,'view_session'),(25,'Can add user',7,'add_user'),(26,'Can change user',7,'change_user'),(27,'Can delete user',7,'delete_user'),(28,'Can view user',7,'view_user'),(29,'Can add booth',8,'add_booth'),(30,'Can change booth',8,'change_booth'),(31,'Can delete booth',8,'delete_booth'),(32,'Can view booth',8,'view_booth'),(33,'Can add booth activity',9,'add_boothactivity'),(34,'Can change booth activity',9,'change_boothactivity'),(35,'Can delete booth activity',9,'delete_boothactivity'),(36,'Can view booth activity',9,'view_boothactivity'),(37,'Can add announcement',10,'add_announcement'),(38,'Can change announcement',10,'change_announcement'),(39,'Can delete announcement',10,'delete_announcement'),(40,'Can view announcement',10,'view_announcement'),(41,'Can add booth content',11,'add_boothcontent'),(42,'Can change booth content',11,'change_boothcontent'),(43,'Can delete booth content',11,'delete_boothcontent'),(44,'Can view booth content',11,'view_boothcontent'),(45,'Can add employee profile',12,'add_employeeprofile'),(46,'Can change employee profile',12,'change_employeeprofile'),(47,'Can delete employee profile',12,'delete_employeeprofile'),(48,'Can view employee profile',12,'view_employeeprofile'),(49,'Can add announcement activity',13,'add_announcementactivity'),(50,'Can change announcement activity',13,'change_announcementactivity'),(51,'Can delete announcement activity',13,'delete_announcementactivity'),(52,'Can view announcement activity',13,'view_announcementactivity'),(53,'Can add system setting',14,'add_systemsetting'),(54,'Can change system setting',14,'change_systemsetting'),(55,'Can delete system setting',14,'delete_systemsetting'),(56,'Can view system setting',14,'view_systemsetting');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$1200000$ut0Q1c9OwcEsaEh3qdISFk$7ai4+6nT2Y0OWlMTy6SDMh2TxhROJPRND/NMOFxxw+s=','2026-08-31 15:04:40.359857',1,'admin','','','admin@gmail.com',1,1,'2026-06-19 03:53:53.186694'),(12,'pbkdf2_sha256$1200000$BVIDTUIVnZj1rIJqX9Hyuo$p7tOQ/6vqY6rnOG+x01QJLd39DlW4i1JjQdsB90FHrc=',NULL,0,'089512476417','Viska','','',0,1,'2026-08-31 15:14:35.000770');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booths_booth`
--

DROP TABLE IF EXISTS `booths_booth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booths_booth` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `thumbnail` varchar(100) DEFAULT NULL,
  `author_name` varchar(100) DEFAULT NULL,
  `published_at` datetime(6) NOT NULL,
  `view_count` int unsigned NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `display_order` int unsigned NOT NULL,
  `is_featured` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `booths_booth_chk_1` CHECK ((`view_count` >= 0)),
  CONSTRAINT `booths_booth_chk_2` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booths_booth`
--

LOCK TABLES `booths_booth` WRITE;
/*!40000 ALTER TABLE `booths_booth` DISABLE KEYS */;
INSERT INTO `booths_booth` VALUES (1,'Safety Week 2026','Informasi kegiatan Safety Week 2026','','Admin','2026-06-19 04:05:55.271643',3,1,'2026-06-19 04:05:55.271674','2026-08-28 08:21:48.101244',0,0),(9,'Safety Alert','Safety Alert','',NULL,'2026-07-24 13:14:39.014030',4,1,'2026-07-24 13:14:39.014095','2026-08-21 11:11:41.064511',0,0),(10,'Safety Update','Safety Update','',NULL,'2026-07-24 13:16:48.964086',3,1,'2026-07-24 13:16:48.964154','2026-08-18 10:31:52.992525',0,0),(11,'Safety Campaign','Safety Campaign','',NULL,'2026-07-24 13:22:01.328657',1,1,'2026-07-24 13:22:01.328805','2026-08-18 10:32:46.378652',0,0),(12,'HSE Month','HSE Month','booths/thumbnails/2026-07-24_5.png',NULL,'2026-07-24 14:09:41.197480',5,1,'2026-07-24 14:09:41.197600','2026-08-28 08:23:46.115296',0,0);
/*!40000 ALTER TABLE `booths_booth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booths_boothactivity`
--

DROP TABLE IF EXISTS `booths_boothactivity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booths_boothactivity` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) NOT NULL,
  `user_email` varchar(254) NOT NULL,
  `action` varchar(20) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `booth_id` bigint NOT NULL,
  `content_id` bigint DEFAULT NULL,
  `hidden_by_user` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booths_boothactivity_booth_id_0ba30f96_fk_booths_booth_id` (`booth_id`),
  KEY `booths_boothactivity_content_id_b25714f7_fk_booths_bo` (`content_id`),
  CONSTRAINT `booths_boothactivity_booth_id_0ba30f96_fk_booths_booth_id` FOREIGN KEY (`booth_id`) REFERENCES `booths_booth` (`id`),
  CONSTRAINT `booths_boothactivity_content_id_b25714f7_fk_booths_bo` FOREIGN KEY (`content_id`) REFERENCES `booths_boothcontent` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booths_boothactivity`
--

LOCK TABLES `booths_boothactivity` WRITE;
/*!40000 ALTER TABLE `booths_boothactivity` DISABLE KEYS */;
/*!40000 ALTER TABLE `booths_boothactivity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `booths_boothcontent`
--

DROP TABLE IF EXISTS `booths_boothcontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `booths_boothcontent` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` longtext,
  `type` varchar(20) NOT NULL,
  `file` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `booth_id` bigint NOT NULL,
  `external_url` varchar(200) DEFAULT NULL,
  `source_type` varchar(20) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `target_audience` varchar(30) NOT NULL,
  `display_order` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `booths_boothcontent_booth_id_52147c77_fk_booths_booth_id` (`booth_id`),
  CONSTRAINT `booths_boothcontent_booth_id_52147c77_fk_booths_booth_id` FOREIGN KEY (`booth_id`) REFERENCES `booths_booth` (`id`),
  CONSTRAINT `booths_boothcontent_chk_1` CHECK ((`display_order` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `booths_boothcontent`
--

LOCK TABLES `booths_boothcontent` WRITE;
/*!40000 ALTER TABLE `booths_boothcontent` DISABLE KEYS */;
INSERT INTO `booths_boothcontent` VALUES (8,'OPL MAY25-IE-00001 PPE for CIL Update','','DOCUMENT','contents/OPL_MAY25-IE-00001_PPE_for_CIL_Update.pdf','2026-07-24 13:11:12.473134',1,NULL,'UPLOAD','2026-07-24 13:11:12.473203','EMPLOYEE',0),(9,'OPL SEP25-IE-00002 Cover Drum Capsule','','DOCUMENT','contents/OPL_SEP25-IE-00002_Cover_Drum_Capsule.pdf','2026-07-24 13:12:20.209583',1,NULL,'UPLOAD','2026-07-24 13:12:20.209634','PUBLIC',0),(10,'SAfety Alert-Knife house smoke_Hungary','','DOCUMENT','contents/SAfety_Alert-Knife_house_smoke_Hungary.pdf','2026-07-24 13:15:17.574687',9,NULL,'UPLOAD','2026-07-24 13:15:17.574723','EMPLOYEE',0),(11,'Risk Reduction and Performance Update Slide - P06 - Updated Format','','DOCUMENT','contents/Risk_Reduction_and_Performance_Update_Slide_-_P06_-_Updated_Format.pdf','2026-07-24 13:18:54.326212',10,NULL,'UPLOAD','2026-07-24 13:18:54.326250','EMPLOYEE',0),(12,'Golden Rules','Golden Rules','VIDEO','contents/WhatsApp_Video_2026-07-24_at_13.21.07.mp4','2026-07-24 13:23:57.507812',11,NULL,'UPLOAD','2026-07-24 13:23:57.507854','EMPLOYEE',0),(13,'FILTRONA HSE MONTH 2026','','VIDEO','contents/FILTRONA_HSE_MONTH_2026.mp4','2026-07-24 14:10:28.165932',12,NULL,'UPLOAD','2026-07-24 14:10:28.165948','PUBLIC',0);
/*!40000 ALTER TABLE `booths_boothcontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2026-06-19 04:05:55.273324','1','Safety Week 2026',1,'[{\"added\": {}}]',8,1),(2,'2026-06-19 07:26:25.157194','1','Meeting Safety Week',1,'[{\"added\": {}}]',10,1),(3,'2026-06-19 07:59:13.434437','1','Meeting Safety Week',2,'[{\"changed\": {\"fields\": [\"Is important\", \"Send email\", \"Send whatsapp\"]}}]',10,1),(4,'2026-06-19 08:08:04.131076','1','Meeting Safety Week',2,'[]',10,1),(5,'2026-06-19 08:09:08.609422','1','Meeting Safety Week',2,'[{\"changed\": {\"fields\": [\"Start date\", \"End date\"]}}]',10,1),(6,'2026-06-19 08:09:50.558826','1','Meeting Safety Week',3,'',10,1),(7,'2026-06-19 08:12:46.718253','1','Safety Week 2026',2,'[]',8,1),(8,'2026-06-22 07:49:44.439764','2','Safety Meeting June 2026',1,'[{\"added\": {}}]',10,1),(9,'2026-06-22 07:51:10.468630','3','Production Training Schedule',1,'[{\"added\": {}}]',10,1),(10,'2026-06-23 03:18:08.423433','1','Safety Week 2026',2,'[{\"changed\": {\"fields\": [\"Is featured\"]}}]',8,1),(11,'2026-06-23 03:20:35.633595','2','Engineering Innovation',1,'[{\"added\": {}}]',8,1),(12,'2026-06-23 03:21:35.981791','3','Production Excellence',1,'[{\"added\": {}}]',8,1),(13,'2026-06-23 03:21:59.054178','4','Employee Development',1,'[{\"added\": {}}]',8,1),(14,'2026-06-23 03:22:33.724057','5','Sustainability Journey',1,'[{\"added\": {}}]',8,1),(15,'2026-06-23 05:50:33.342615','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"Thumbnail\"]}}]',8,1),(16,'2026-06-23 05:51:10.232741','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"Thumbnail\"]}}]',8,1),(17,'2026-06-23 05:52:46.624050','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(18,'2026-06-23 05:52:54.976886','5','Sustainability Journey',2,'[]',8,1),(19,'2026-06-23 05:53:29.666055','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"Thumbnail\"]}}]',8,1),(20,'2026-06-23 07:43:39.777130','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(21,'2026-06-23 07:44:57.399270','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(22,'2026-06-23 07:52:39.690705','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(23,'2026-06-23 07:52:56.235332','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(24,'2026-06-24 02:41:47.209957','1','Leadership Training 2026',1,'[{\"added\": {}}]',11,1),(25,'2026-06-26 04:22:54.259325','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(26,'2026-06-26 04:23:53.229042','2','a',1,'[{\"added\": {}}]',11,1),(27,'2026-06-26 06:31:21.643026','3','b',1,'[{\"added\": {}}]',11,1),(28,'2026-06-26 06:42:10.055319','5','Sustainability Journey',2,'[{\"changed\": {\"fields\": [\"File\"]}}]',8,1),(29,'2026-07-01 14:54:26.936421','2','atalia',3,'',4,1),(30,'2026-07-02 09:30:03.310449','3','Viska',3,'',4,1),(31,'2026-07-02 09:38:46.031979','4','caca',3,'',4,1),(32,'2026-07-27 14:08:15.492309','3','a',3,'',12,1),(33,'2026-07-31 14:21:01.471921','7','Atalia',3,'',4,1),(34,'2026-07-31 14:42:11.434151','8','Atalia',3,'',4,1),(35,'2026-08-03 09:58:28.655688','9','Atalia',3,'',4,1),(36,'2026-08-03 10:03:35.997958','5','Viska',3,'',4,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (12,'accounts','employeeprofile'),(14,'accounts','systemsetting'),(7,'accounts','user'),(1,'admin','logentry'),(10,'announcements','announcement'),(13,'announcements','announcementactivity'),(2,'auth','group'),(3,'auth','permission'),(4,'auth','user'),(8,'booths','booth'),(9,'booths','boothactivity'),(11,'booths','boothcontent'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'accounts','0001_initial','2026-06-19 03:49:42.312711'),(2,'contenttypes','0001_initial','2026-06-19 03:49:42.358569'),(3,'auth','0001_initial','2026-06-19 03:49:42.802015'),(4,'admin','0001_initial','2026-06-19 03:49:42.903764'),(5,'admin','0002_logentry_remove_auto_add','2026-06-19 03:49:42.909135'),(6,'admin','0003_logentry_add_action_flag_choices','2026-06-19 03:49:42.914339'),(7,'contenttypes','0002_remove_content_type_name','2026-06-19 03:49:42.996933'),(8,'auth','0002_alter_permission_name_max_length','2026-06-19 03:49:43.043515'),(9,'auth','0003_alter_user_email_max_length','2026-06-19 03:49:43.060778'),(10,'auth','0004_alter_user_username_opts','2026-06-19 03:49:43.067099'),(11,'auth','0005_alter_user_last_login_null','2026-06-19 03:49:43.115132'),(12,'auth','0006_require_contenttypes_0002','2026-06-19 03:49:43.117214'),(13,'auth','0007_alter_validators_add_error_messages','2026-06-19 03:49:43.122892'),(14,'auth','0008_alter_user_username_max_length','2026-06-19 03:49:43.172032'),(15,'auth','0009_alter_user_last_name_max_length','2026-06-19 03:49:43.219587'),(16,'auth','0010_alter_group_name_max_length','2026-06-19 03:49:43.233543'),(17,'auth','0011_update_proxy_permissions','2026-06-19 03:49:43.239897'),(18,'auth','0012_alter_user_first_name_max_length','2026-06-19 03:49:43.320811'),(19,'booths','0001_initial','2026-06-19 03:49:43.393780'),(20,'sessions','0001_initial','2026-06-19 03:49:43.420075'),(21,'booths','0002_alter_booth_file','2026-06-19 04:03:49.189373'),(22,'announcements','0001_initial','2026-06-19 04:23:02.687951'),(23,'booths','0003_booth_display_order_booth_is_featured','2026-06-22 02:13:38.620980'),(24,'booths','0004_boothcontent','2026-06-24 02:33:02.748245'),(25,'booths','0005_alter_boothactivity_action','2026-06-24 03:43:45.202518'),(26,'booths','0006_remove_booth_file_remove_booth_type','2026-06-29 06:29:28.313952'),(27,'booths','0007_boothactivity_content','2026-06-30 10:13:12.132068'),(28,'accounts','0002_employeeprofile','2026-07-01 15:26:49.127826'),(29,'accounts','0003_remove_employeeprofile_full_name','2026-07-02 09:01:43.124308'),(30,'booths','0008_boothcontent_external_url_boothcontent_source_type_and_more','2026-07-08 12:01:16.698058'),(31,'announcements','0002_announcementactivity','2026-07-13 09:32:34.815519'),(32,'announcements','0003_alter_announcement_target_audience','2026-07-13 13:04:34.943288'),(33,'announcements','0004_announcement_email_recipient_mode_and_more','2026-07-14 09:42:41.880842'),(34,'announcements','0005_alter_announcement_target_audience','2026-07-20 11:17:39.124943'),(35,'booths','0009_boothcontent_target_audience','2026-07-20 11:17:39.224299'),(36,'accounts','0004_delete_user','2026-07-28 09:33:56.677455'),(37,'booths','0010_boothcontent_display_order','2026-07-28 09:33:56.797852'),(38,'accounts','0005_employeeprofile_nik','2026-07-31 13:06:44.566733'),(39,'booths','0011_boothactivity_hidden_by_user','2026-08-06 15:17:41.859529'),(40,'accounts','0006_systemsetting','2026-08-10 09:41:18.058384'),(41,'accounts','0007_systemsetting_show_featured_booth','2026-08-19 10:44:06.848592');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('2tws9brdvmkvg6trnkv7uzy97qhrrlgr','.eJxVjDsOwjAQBe_iGllex7-lpOcM1trr4ABypDipEHeHSCmgfTPzXiLStta49bLEicVZgDj9bonyo7Qd8J3abZZ5busyJbkr8qBdXmcuz8vh_h1U6vVbexMyenCMxWhmVGFQCryzroygjA1Aipgw8JBL1j7RGLJhDR4MWtTi_QHCMjcc:1x0x0S:FInnF5FnIc-Ua-ZX4tPJEDiOZ-nlWDy2XTnlgWyjSrg','2026-09-14 15:04:40.365973'),('ncmb2gn8rsmppegvwtn7en6uk7bk7qm0','.eJxVjDsOwjAQBe_iGllex7-lpOcM1trr4ABypDipEHeHSCmgfTPzXiLStta49bLEicVZgDj9bonyo7Qd8J3abZZ5busyJbkr8qBdXmcuz8vh_h1U6vVbexMyenCMxWhmVGFQCryzroygjA1Aipgw8JBL1j7RGLJhDR4MWtTi_QHCMjcc:1we3N5:HFvwZ6AjHEUBUjqfAcVIKY_Li9itc-5bLYtNsLMElaU','2026-07-13 04:13:23.632104'),('ymqf3a0icjvsu49oiaadlxsbqq1ml557','.eJxVjDsOwjAQBe_iGllex7-lpOcM1trr4ABypDipEHeHSCmgfTPzXiLStta49bLEicVZgDj9bonyo7Qd8J3abZZ5busyJbkr8qBdXmcuz8vh_h1U6vVbexMyenCMxWhmVGFQCryzroygjA1Aipgw8JBL1j7RGLJhDR4MWtTi_QHCMjcc:1woFQs:7CCcYjq2467u4oU3n3Mjy1VUB1w5gIFf3S-2P1vJPiA','2026-08-10 14:07:26.812411');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-31 15:46:02
