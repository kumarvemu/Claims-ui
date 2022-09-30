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

-- Dumping structure for table claims.claim_master
CREATE TABLE IF NOT EXISTS `claim_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `affected_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `amount_paid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `animal_breed` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `animal_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `any_further_details` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `claim_reason` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `claim_started_date` date DEFAULT NULL,
  `created_date` date DEFAULT NULL,
  `customer_first_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `customer_surname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `estimated_claim_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `incident_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `make` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `model_year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `policy_number` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `related_claim_date` date DEFAULT NULL,
  `insurance_type_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  `related_incident_date` date DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK3rcvibs0e4hx5hw91qrxsq3g` (`insurance_type_id`) USING BTREE,
  KEY `FKfkypqix42u6j9uj5a1kq2428n` (`status_id`) USING BTREE,
  CONSTRAINT `FK3rcvibs0e4hx5hw91qrxsq3g` FOREIGN KEY (`insurance_type_id`) REFERENCES `insurance_type` (`id`),
  CONSTRAINT `FKfkypqix42u6j9uj5a1kq2428n` FOREIGN KEY (`status_id`) REFERENCES `claim_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_master: ~20 rows (approximately)
INSERT INTO `claim_master` (`id`, `affected_address`, `amount_paid`, `animal_breed`, `animal_type`, `any_further_details`, `claim_reason`, `claim_started_date`, `created_date`, `customer_first_name`, `customer_surname`, `estimated_claim_value`, `incident_description`, `make`, `model`, `model_year`, `policy_number`, `related_claim_date`, `insurance_type_id`, `status_id`, `related_incident_date`) VALUES
	(1, 'allfred street', '99', NULL, NULL, NULL, 'break', '2021-08-26', '2021-08-26', 'TestCustomer1', 'one', '106', 'something Breaks failed', 'Toyota', 'Yaris', '2013', '1234567890', '2021-08-26', 1, 1, NULL),
	(2, 'alfred street1', NULL, 'poodle', 'dog', NULL, 'test claim', '2021-08-27', '2021-08-27', 'TestCustomer2', 'Two', '8', 'test incident', NULL, NULL, NULL, '7723142610', NULL, 3, 2, NULL),
	(3, 'alfred street2', '10', 'Affenpinscher', 'dog', NULL, NULL, '2021-09-03', '2021-09-03', 'TestCustomer3', 'Three', '50', 'Injured', NULL, NULL, NULL, '7721341251', NULL, 3, 4, NULL),
	(4, 'alfred street2', '20', 'Aidi', 'dog', NULL, NULL, '2021-09-04', '2021-09-04', 'TestCustomer4', 'Four', NULL, 'Injured', NULL, NULL, NULL, '7721411111', NULL, 3, 1, NULL),
	(5, 'City Center', NULL, NULL, NULL, 'na', 'Test Claim Reason', '1987-11-10', '2022-09-04', 'TestCustomer5', 'five', '130', 'this is descirption', NULL, NULL, NULL, '111111111', NULL, 1, 1, NULL),
	(6, 'alffred street', NULL, NULL, NULL, 'na', 'test claim', '2022-08-10', '2022-09-05', 'TestCustomer6', 'six', '10', 'test Incident', NULL, NULL, NULL, '7777777777', NULL, 1, 1, NULL),
	(7, NULL, NULL, NULL, NULL, 'NA', 'Motor Claim', '2022-08-06', '2022-09-06', 'TestCustomer7', 'seven', '11', 'Test Motor Claim', 'Audi', 'A3', '2014', '888888888', NULL, 2, 2, '2022-08-12'),
	(8, 'alfred sytreet 12', '20', NULL, NULL, 'na', 'Test Claim Reason', '2022-08-10', '2022-09-06', 'TestCustomer8', 'eight', '120', 'test incident', NULL, NULL, NULL, '2222222222', NULL, 1, 4, NULL),
	(9, NULL, '188.88', NULL, NULL, 'na', 'new claim ', '2021-08-12', '2022-09-07', 'TestCustomer9', 'nine', '200.39', 'breakdown', 'Toyota', 'sienna', '2016', '999999999', NULL, 2, 4, NULL),
	(10, NULL, '99.99', 'stacker', 'dog', 'na', 'testClaim', '2021-08-13', '2022-09-07', 'TestCustomer10', 'ten', '99.99', 'test incident', NULL, NULL, NULL, '121212121', NULL, 3, 4, NULL),
	(11, 'alfredstreet', NULL, NULL, NULL, 'na', 'testclaim', '2022-09-07', '2022-09-07', 'TestCustomer11', 'testpro', '10.00', 'test Incident', NULL, NULL, NULL, '1234567891', NULL, 1, 1, NULL),
	(12, NULL, NULL, NULL, NULL, 'NA', 'testClaim', '2022-09-08', '2022-09-08', 'TestCustomer12', 'nine', '10', 'test incident', 'Audi', 'A3', '2013', '3333333333', NULL, 2, 1, NULL),
	(13, NULL, NULL, NULL, NULL, 'na', 'motor claim', '2021-07-08', '2022-09-08', 'TestCustomer13', 'nameone', '8', 'incident  test', 'audi', 'A3', '2017', '4444444442', NULL, 2, 1, NULL),
	(14, NULL, NULL, NULL, NULL, '', 'testing claim', '2022-09-24', '2022-09-24', 'TestCustomer14', 'testthree', '2', 'test incident', 'Audi', 'A3', '2016', '1212121212', NULL, 2, 1, '2022-09-23'),
	(15, 'alfred4street', NULL, NULL, NULL, '', 'test reason', '2022-09-15', '2022-09-24', 'TestCustomer15', 'Six', '2', 'test incident', NULL, NULL, NULL, '1213146453', NULL, 1, 1, NULL),
	(16, NULL, NULL, NULL, NULL, '', 'test', '2022-09-28', '2022-09-25', 'TestCustomer16', 'ferry', '76', 'kjmklj', 'Audi', 'A3', '2016', '345544555', NULL, 2, 1, NULL),
	(17, 'alfred stareet', NULL, NULL, NULL, '', 'Test Claim Reason', '2022-09-07', '2022-09-25', 'TestCustomer17', 'test', '2', 'test incident', NULL, NULL, NULL, '1313131313', NULL, 1, 1, NULL),
	(18, NULL, NULL, NULL, NULL, '', 'test reason', '2022-09-28', '2022-09-27', 'TestCustomer18', 'SurFive', '10', 'Test incident', 'Audi', 'A5', '2019', '8787878787', NULL, 2, 1, NULL),
	(19, 'alfred street', NULL, NULL, NULL, '', 'test prop claim', '2022-09-28', '2022-09-27', 'TestCustomer19', 'prop', '10', 'test incident', NULL, NULL, NULL, '9898989898', NULL, 1, 1, NULL),
	(20, NULL, NULL, NULL, NULL, '', 'test  Motor claim', '2022-09-21', '2022-09-27', 'TestCustomer20', 'mot', '10', 'test motor Incident', 'Toyota', 'yaris', '2017', '345345345', NULL, 2, 1, NULL),
	(21, NULL, NULL, 'stacker', 'dog', '', 'pet Claim', '2022-09-28', '2022-09-27', 'TestCustomer21', 'Pet', '2', 'pet', NULL, NULL, NULL, '7878787878', NULL, 3, 1, NULL),
	(22, NULL, NULL, NULL, NULL, 'NA', 'test claim', '2022-09-14', '2022-09-29', 'TestName', 'name', '99', 'test incident', 'Audi', 'A3', '2016', '78787878', NULL, 2, 1, NULL);

-- Dumping structure for table claims.claim_master_notes
CREATE TABLE IF NOT EXISTS `claim_master_notes` (
  `claim_id` int NOT NULL,
  `notes_id` int NOT NULL,
  UNIQUE KEY `UK_pcqbfdikai5ltiaeq84cfthm7` (`notes_id`),
  KEY `FK1an3rvmq9e82u9ahdm3v8g3vo` (`claim_id`),
  CONSTRAINT `FK1an3rvmq9e82u9ahdm3v8g3vo` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`),
  CONSTRAINT `FKm0tle4ntxg5erk68xaid5iqxv` FOREIGN KEY (`notes_id`) REFERENCES `note` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_master_notes: ~21 rows (approximately)
INSERT INTO `claim_master_notes` (`claim_id`, `notes_id`) VALUES
	(1, 1),
	(1, 10),
	(2, 2),
	(3, 5),
	(4, 4),
	(4, 15),
	(4, 16),
	(5, 17),
	(5, 18),
	(5, 19),
	(5, 20),
	(6, 7),
	(7, 8),
	(8, 9),
	(8, 24),
	(9, 11),
	(9, 12),
	(10, 13),
	(13, 14),
	(13, 21),
	(13, 22),
	(13, 23);

-- Dumping structure for table claims.claim_master_tasks
CREATE TABLE IF NOT EXISTS `claim_master_tasks` (
  `claim_id` int NOT NULL,
  `tasks_id` int NOT NULL,
  UNIQUE KEY `UK_13rj57c0c9iruat326l6cl9it` (`tasks_id`),
  KEY `FK7gs68imj8ddn4pd3dxbxcpfd4` (`claim_id`),
  CONSTRAINT `FK7gs68imj8ddn4pd3dxbxcpfd4` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`),
  CONSTRAINT `FKimj1n7eyt1s4jtvh6jb53kwll` FOREIGN KEY (`tasks_id`) REFERENCES `task` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_master_tasks: ~20 rows (approximately)
INSERT INTO `claim_master_tasks` (`claim_id`, `tasks_id`) VALUES
	(1, 1),
	(2, 2),
	(4, 11),
	(4, 12),
	(6, 4),
	(7, 5),
	(8, 6),
	(8, 21),
	(9, 7),
	(9, 8),
	(10, 9),
	(11, 18),
	(11, 19),
	(11, 20),
	(13, 10),
	(13, 13),
	(13, 14),
	(13, 15),
	(13, 16),
	(13, 17);

-- Dumping structure for table claims.claim_notes
CREATE TABLE IF NOT EXISTS `claim_notes` (
  `claim_id` int NOT NULL,
  `notes_id` int NOT NULL,
  UNIQUE KEY `UK_82igwe1rlv5xc87aaem2q1k7n` (`notes_id`) USING BTREE,
  KEY `FKjgf0og4bccsbaadua89crt9wg` (`claim_id`) USING BTREE,
  CONSTRAINT `FK5yvn865t9wux22g4mm39i89y6` FOREIGN KEY (`notes_id`) REFERENCES `note` (`id`),
  CONSTRAINT `FKjgf0og4bccsbaadua89crt9wg` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_notes: ~0 rows (approximately)
INSERT INTO `claim_notes` (`claim_id`, `notes_id`) VALUES
	(1, 1);

-- Dumping structure for table claims.claim_status
CREATE TABLE IF NOT EXISTS `claim_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `open` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_status: ~6 rows (approximately)
INSERT INTO `claim_status` (`id`, `detail`, `open`) VALUES
	(1, 'Awaiting Assessment', b'1'),
	(2, 'In Progress', b'1'),
	(3, 'Awaiting Payment', b'1'),
	(4, 'Accepted & Paid', b'0'),
	(5, 'Transferred to Main Claims', b'0'),
	(6, 'Rejected', b'0');

-- Dumping structure for table claims.claim_tasks
CREATE TABLE IF NOT EXISTS `claim_tasks` (
  `claim_id` int NOT NULL,
  `tasks_id` int NOT NULL,
  UNIQUE KEY `UK_efltpho19w9ntex6whxdhbuwg` (`tasks_id`) USING BTREE,
  KEY `FKr5w7r11owqswpxh606vwiv17v` (`claim_id`) USING BTREE,
  CONSTRAINT `FK6axkwghk4tipfxd5ho0glc6n` FOREIGN KEY (`tasks_id`) REFERENCES `task` (`id`),
  CONSTRAINT `FKr5w7r11owqswpxh606vwiv17v` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.claim_tasks: ~0 rows (approximately)
INSERT INTO `claim_tasks` (`claim_id`, `tasks_id`) VALUES
	(1, 1);

-- Dumping structure for table claims.insurance_type
CREATE TABLE IF NOT EXISTS `insurance_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.insurance_type: ~2 rows (approximately)
INSERT INTO `insurance_type` (`id`, `detail`, `value`) VALUES
	(1, 'Property', 1),
	(2, 'Motor', 2),
	(3, 'Pet', 3);

-- Dumping structure for table claims.note
CREATE TABLE IF NOT EXISTS `note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `claim_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FKgp8sdghls60mhf980038id8j8` (`claim_id`) USING BTREE,
  CONSTRAINT `FKgp8sdghls60mhf980038id8j8` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.note: ~23 rows (approximately)
INSERT INTO `note` (`id`, `date`, `detail`, `claim_id`) VALUES
	(1, '2012-08-27', 'All Good', 1),
	(2, '2021-09-03', 'New Note 1', 1),
	(3, '2021-09-04', 'NewNote2', 2),
	(4, '2021-09-04', 'New Note3', 2),
	(5, '2021-09-05', 'New Note 4', 3),
	(6, '2021-09-03', 'Newnote 5', 3),
	(7, '2022-09-06', 'get  more details from the customer', 6),
	(8, '2022-09-06', 'get  more details from the customer', 7),
	(9, '2022-09-06', 'test note', 8),
	(10, '2022-09-06', 'second note', 1),
	(11, '2022-09-07', 'estimated from repairer', 9),
	(12, '2022-09-07', 'amount paid', 9),
	(13, '2022-09-07', 'new policy created', 10),
	(14, '2022-09-08', 'test note', 13),
	(15, '2022-09-26', 'New Note 4', 4),
	(16, '2022-09-26', 'New Note 5', 4),
	(17, '2022-09-27', 'test', 5),
	(18, '2022-09-27', 'Second Note', 5),
	(19, '2022-09-27', 'Third Note', 5),
	(20, '2022-09-27', 'Fourth Note', 5),
	(21, '2022-09-27', 'Second Note', 13),
	(22, '2022-09-27', 'Third Note', 13),
	(23, '2022-09-27', 'fourth Note', 13),
	(24, '2022-09-29', 'SECOND NOTED ADDED TO CLAIM', 8);

-- Dumping structure for table claims.task
CREATE TABLE IF NOT EXISTS `task` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `claim_id` int DEFAULT NULL,
  `status_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK8vw47q48mi8uthh8ku3od6p2d` (`claim_id`) USING BTREE,
  KEY `FKhbyh5kk1fpobspep796vg5psq` (`status_id`) USING BTREE,
  CONSTRAINT `FK8vw47q48mi8uthh8ku3od6p2d` FOREIGN KEY (`claim_id`) REFERENCES `claim_master` (`id`),
  CONSTRAINT `FKhbyh5kk1fpobspep796vg5psq` FOREIGN KEY (`status_id`) REFERENCES `task_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.task: ~21 rows (approximately)
INSERT INTO `task` (`id`, `date`, `detail`, `claim_id`, `status_id`) VALUES
	(1, '2021-02-27', 'Need to Progress', 1, 1),
	(2, '2021-09-03', 'Check with Customer', 2, 1),
	(3, '2021-09-03', 'decision taken', 3, 2),
	(4, '2022-09-06', 'get  more details from the customer', 6, 1),
	(5, '2022-09-06', 'get  more details from the customer', 7, 1),
	(6, '2022-09-06', 'add test tyask', 8, 2),
	(7, '2022-09-07', 'contacted customer', 9, 2),
	(8, '2022-09-07', 'all  good  to close', 9, 2),
	(9, '2022-09-07', 'policy confirmed', 10, 2),
	(10, '2022-09-08', 'test note', 13, 1),
	(11, '2022-09-26', 'new task added', 4, 1),
	(12, '2022-09-26', 'another task added', 4, 1),
	(13, '2022-09-27', 'First task added', 13, 1),
	(14, '2022-09-27', 'second task added', 13, 1),
	(15, '2022-09-27', 'third task added', 13, 1),
	(16, '2022-09-27', 'fourth task added', 13, 1),
	(17, '2022-09-27', 'fifth task added', 13, 1),
	(18, '2022-09-27', 'First task added', 11, 1),
	(19, '2022-09-27', 'second task added', 11, 1),
	(20, '2022-09-27', 'Third task added', 11, 1),
	(21, '2022-09-29', 'SECOND TASK ADDED', 8, 2);

-- Dumping structure for table claims.task_status
CREATE TABLE IF NOT EXISTS `task_status` (
  `id` int NOT NULL AUTO_INCREMENT,
  `detail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `value` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table claims.task_status: ~2 rows (approximately)
INSERT INTO `task_status` (`id`, `detail`, `value`) VALUES
	(1, 'Open', 1),
	(2, 'Closed', 2);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
