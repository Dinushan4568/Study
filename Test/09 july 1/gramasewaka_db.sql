-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 09, 2025 at 12:15 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gramasewaka_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `households`
--

CREATE TABLE `households` (
  `house_number` varchar(20) NOT NULL,
  `family_name` varchar(100) DEFAULT NULL,
  `address` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `household_members`
--

CREATE TABLE `household_members` (
  `nic` varchar(12) NOT NULL,
  `house_number` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `individuals`
--

CREATE TABLE `individuals` (
  `nic` varchar(12) NOT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `short_name` varchar(50) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `address` text DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `job` text DEFAULT NULL,
  `married` tinyint(1) DEFAULT NULL,
  `image_url` text DEFAULT NULL,
  `qualifications` text DEFAULT NULL,
  `land_id` varchar(50) DEFAULT NULL,
  `documents` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `land_records`
--

CREATE TABLE `land_records` (
  `land_id` varchar(50) NOT NULL,
  `size` float DEFAULT NULL,
  `location` text DEFAULT NULL,
  `usage_type` varchar(50) DEFAULT NULL,
  `owner_nic` varchar(12) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `update_requests`
--

CREATE TABLE `update_requests` (
  `request_id` int(11) NOT NULL,
  `requested_by` int(11) DEFAULT NULL,
  `target_nic` varchar(12) DEFAULT NULL,
  `field_to_update` varchar(50) DEFAULT NULL,
  `old_value` text DEFAULT NULL,
  `new_value` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','gramasewaka','data_adder') NOT NULL,
  `nic` varchar(12) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `role`, `nic`, `email`) VALUES
(12, 'admin', '$2y$10$0kz0.fnvsFpK6Bx3UQoz/.rgCMlUuHEV83Uax3cK6yYGRFVzqJ3Vq', 'admin', NULL, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `households`
--
ALTER TABLE `households`
  ADD PRIMARY KEY (`house_number`);

--
-- Indexes for table `household_members`
--
ALTER TABLE `household_members`
  ADD PRIMARY KEY (`nic`,`house_number`),
  ADD KEY `house_number` (`house_number`);

--
-- Indexes for table `individuals`
--
ALTER TABLE `individuals`
  ADD PRIMARY KEY (`nic`),
  ADD KEY `land_id` (`land_id`);

--
-- Indexes for table `land_records`
--
ALTER TABLE `land_records`
  ADD PRIMARY KEY (`land_id`),
  ADD KEY `owner_nic` (`owner_nic`);

--
-- Indexes for table `update_requests`
--
ALTER TABLE `update_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `requested_by` (`requested_by`),
  ADD KEY `target_nic` (`target_nic`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `nic` (`nic`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `update_requests`
--
ALTER TABLE `update_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `household_members`
--
ALTER TABLE `household_members`
  ADD CONSTRAINT `household_members_ibfk_1` FOREIGN KEY (`nic`) REFERENCES `individuals` (`nic`) ON DELETE CASCADE,
  ADD CONSTRAINT `household_members_ibfk_2` FOREIGN KEY (`house_number`) REFERENCES `households` (`house_number`) ON DELETE CASCADE;

--
-- Constraints for table `individuals`
--
ALTER TABLE `individuals`
  ADD CONSTRAINT `individuals_ibfk_1` FOREIGN KEY (`land_id`) REFERENCES `land_records` (`land_id`) ON DELETE SET NULL;

--
-- Constraints for table `land_records`
--
ALTER TABLE `land_records`
  ADD CONSTRAINT `land_records_ibfk_1` FOREIGN KEY (`owner_nic`) REFERENCES `individuals` (`nic`) ON DELETE SET NULL;

--
-- Constraints for table `update_requests`
--
ALTER TABLE `update_requests`
  ADD CONSTRAINT `update_requests_ibfk_1` FOREIGN KEY (`requested_by`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `update_requests_ibfk_2` FOREIGN KEY (`target_nic`) REFERENCES `individuals` (`nic`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`nic`) REFERENCES `individuals` (`nic`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
