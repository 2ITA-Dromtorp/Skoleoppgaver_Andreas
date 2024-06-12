-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 05, 2024 at 04:15 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vhddatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `bestillinger`
--

CREATE TABLE `bestillinger` (
  `produktID` json NOT NULL,
  `bestiller` varchar(40) NOT NULL,
  `sum` int(15) NOT NULL,
  `dato` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ID` int(3) NOT NULL,
  `produktNavn` varchar(40) NOT NULL,
  `pris` int(6) NOT NULL,
  `antall` int(6) NOT NULL,
  `beskrivelse` varchar(255) NOT NULL,
  `specs` varchar(255) NOT NULL,
  `bildeBane` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`produktNavn`, `pris`, `antall`, `beskrivelse`, `specs`, `bildeBane`) VALUES
('Lenovo Yoga Slim 7 Ultra 5-125H/16/512 14" bærbar PC', 10000, 1000, 'Kommer snart', 'Veldig bra', 'https://p1-ofp.static.pub/medias/bWFzdGVyfHJvb3R8MTIxNTg5fGltYWdlL2pwZWd8aDA2L2hhNC8xMDY5NTkyNjIxODc4Mi5qcGd8ZDdhNjM5MjRjOTAyYzE2ZjY5NmEwYmNkMDg5MTdjM2VhZjA2NDZhMTJlOWJlZDY5MmE1MzcxMWE1YTFkZTE4YQ/-gallery-9.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
