-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 12. Jun, 2024 21:20 PM
-- Tjener-versjon: 5.7.24
-- PHP Version: 8.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ball-il`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `brukere`
--

CREATE TABLE `brukere` (
  `brukerID` int(5) NOT NULL,
  `brukerNavn` varchar(100) NOT NULL,
  `forNavn` varchar(70) NOT NULL,
  `etterNavn` varchar(70) NOT NULL,
  `passord` varchar(80) NOT NULL,
  `rolle` tinyint(1) NOT NULL DEFAULT '1',
  `sport` int(2) NOT NULL,
  `tlf` varchar(9) NOT NULL,
  `foresatteTlf` varchar(15) NOT NULL DEFAULT 'Ingen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `brukere`
--

INSERT INTO `brukere` (`brukerID`, `brukerNavn`, `forNavn`, `etterNavn`, `passord`, `rolle`, `sport`, `tlf`, `foresatteTlf`) VALUES
(1, 'admin', 'admin', 'admin', 'Skole123', 2, 1, '0', 'Ingen');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brukere`
--
ALTER TABLE `brukere`
  ADD PRIMARY KEY (`brukerID`),
  ADD KEY `rolle` (`rolle`),
  ADD KEY `sport` (`sport`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brukere`
--
ALTER TABLE `brukere`
  MODIFY `brukerID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `brukere`
--
ALTER TABLE `brukere`
  ADD CONSTRAINT `rolle` FOREIGN KEY (`rolle`) REFERENCES `roller` (`rolleID`),
  ADD CONSTRAINT `sport` FOREIGN KEY (`sport`) REFERENCES `sporter` (`sportID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
