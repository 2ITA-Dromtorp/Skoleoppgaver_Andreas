-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 13. Jun, 2024 20:43 PM
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
  `tlf` varchar(9) NOT NULL,
  `foresatteTlf` varchar(15) NOT NULL DEFAULT 'Ingen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `brukere`
--

INSERT INTO `brukere` (`brukerID`, `brukerNavn`, `forNavn`, `etterNavn`, `passord`, `rolle`, `tlf`, `foresatteTlf`) VALUES
(1, 'admin', 'admin', 'admin', '$2b$10$UIJB.FdNJuCvenAyrK3oQ.5XrBSRXonsysg5MeSdCNi33NXdrjSK.', 2, '0', 'Ingen'),
(2, 'matheopan', 'Matheo Kant', 'Pangopoulos', '$2b$10$CZwZD.cx9ZNdZIdOZIjW0eTegf42hgz8.yPZ767lhBAbmzSnAaN8a', 1, '3829198', 'Ingen'),
(3, 'andreaskri', 'Andreas Hurlen', 'Kristiansen', '$2b$10$tjTjommXw0nF3B42hHWuIegZO/2RlUwzSlQBJM7rARs3QkXTQLQ02', 1, '38219394', 'Ingen'),
(4, 'andreasrov', 'Andreas', 'Rovde', '$2b$10$f1DUE92/S27wywD5hcnXHOCjlPGBMe7qn4LDbduBp6CEJhF9VOYC2', 1, '40677075', '');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `roller`
--

CREATE TABLE `roller` (
  `rolleID` tinyint(1) NOT NULL,
  `rolleNavn` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `roller`
--

INSERT INTO `roller` (`rolleID`, `rolleNavn`) VALUES
(1, 'Medlem'),
(2, 'Admin');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `sporter`
--

CREATE TABLE `sporter` (
  `sportID` int(3) NOT NULL,
  `sportNavn` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `sporter`
--

INSERT INTO `sporter` (`sportID`, `sportNavn`) VALUES
(1, 'Ingen'),
(2, 'Fotball'),
(3, 'Håndball'),
(4, 'Volleyball');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `turneringer`
--

CREATE TABLE `turneringer` (
  `turneringsID` int(7) NOT NULL,
  `turneringsNavn` varchar(200) NOT NULL,
  `turneringsDato` varchar(16) NOT NULL,
  `turneringsAdresse` varchar(200) NOT NULL,
  `turneringsSport` int(3) NOT NULL,
  `turneringsBilde` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `turneringer`
--

INSERT INTO `turneringer` (`turneringsID`, `turneringsNavn`, `turneringsDato`, `turneringsAdresse`, `turneringsSport`, `turneringsBilde`) VALUES
(1, 'Fotball sparking', '2024-06-15', 'Ellelia 10', 3, './images/fotball.jpg'),
(2, 'Volleyball Turnering', '2024-06-16', 'Dynamittveien 7', 3, './images/volleyball.jpg'),
(3, 'Håndball Turnering', '2024-06-17', 'Dynamittveien 7', 2, './images/haandball.png'),
(4, 'Fotball Turnering Nordby', '2024-06-21', 'Nordby Kunstgressbane', 1, './images/fotball.jpg'),
(5, 'Håndball Nordby', '2024-07-27', 'Nordby Kunstgressbane', 2, './images/haandball.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brukere`
--
ALTER TABLE `brukere`
  ADD PRIMARY KEY (`brukerID`),
  ADD KEY `rolle` (`rolle`);

--
-- Indexes for table `roller`
--
ALTER TABLE `roller`
  ADD PRIMARY KEY (`rolleID`);

--
-- Indexes for table `sporter`
--
ALTER TABLE `sporter`
  ADD PRIMARY KEY (`sportID`);

--
-- Indexes for table `turneringer`
--
ALTER TABLE `turneringer`
  ADD PRIMARY KEY (`turneringsID`),
  ADD KEY `turneringsSport` (`turneringsSport`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `brukere`
--
ALTER TABLE `brukere`
  MODIFY `brukerID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roller`
--
ALTER TABLE `roller`
  MODIFY `rolleID` tinyint(1) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sporter`
--
ALTER TABLE `sporter`
  MODIFY `sportID` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `turneringer`
--
ALTER TABLE `turneringer`
  MODIFY `turneringsID` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `brukere`
--
ALTER TABLE `brukere`
  ADD CONSTRAINT `rolle` FOREIGN KEY (`rolle`) REFERENCES `roller` (`rolleID`);

--
-- Begrensninger for tabell `turneringer`
--
ALTER TABLE `turneringer`
  ADD CONSTRAINT `turneringer_ibfk_1` FOREIGN KEY (`turneringsSport`) REFERENCES `sporter` (`sportID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
