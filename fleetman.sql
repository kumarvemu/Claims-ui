-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               8.0.22 - MySQL Community Server - GPL
-- Server OS:                    Win64
-- HeidiSQL Version:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table fleetman.employee
CREATE TABLE IF NOT EXISTS `employee` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fleetman.employee: ~2 rows (approximately)
INSERT INTO `employee` (`id`, `name`, `location`) VALUES
	(7, 'Sally', 'USA'),
	(8, 'Matt', 'FRA');

-- Dumping structure for table fleetman.employee_vehicles
CREATE TABLE IF NOT EXISTS `employee_vehicles` (
  `employee_id` int NOT NULL,
  `vehicles_id` int NOT NULL,
  UNIQUE KEY `UK_a0ch7owah9ap18ukasl3d0kv6` (`vehicles_id`),
  KEY `FKlngm5ts99ahskotjeam5g2xjg` (`employee_id`),
  CONSTRAINT `FKdbiv52ga71nl0xxnfdv9mf7o9` FOREIGN KEY (`vehicles_id`) REFERENCES `vehicle` (`id`),
  CONSTRAINT `FKlngm5ts99ahskotjeam5g2xjg` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fleetman.employee_vehicles: ~4 rows (approximately)
INSERT INTO `employee_vehicles` (`employee_id`, `vehicles_id`) VALUES
	(7, 10),
	(7, 11),
	(8, 12),
	(8, 13);

-- Dumping structure for table fleetman.vehicle
CREATE TABLE IF NOT EXISTS `vehicle` (
  `id` int NOT NULL AUTO_INCREMENT,
  `make` varchar(255) DEFAULT NULL,
  `model` varchar(255) DEFAULT NULL,
  `driver_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKkmhvv0bvdvwnit7ttmyx0k01u` (`driver_id`),
  CONSTRAINT `FKkmhvv0bvdvwnit7ttmyx0k01u` FOREIGN KEY (`driver_id`) REFERENCES `employee` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fleetman.vehicle: ~4 rows (approximately)
INSERT INTO `vehicle` (`id`, `make`, `model`, `driver_id`) VALUES
	(10, 'Renault', 'Clio', 7),
	(11, 'Citroen', 'Berlingo', 7),
	(12, 'Nissan', 'Qashquai', 8),
	(13, 'Renault', 'Megane', 8);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
