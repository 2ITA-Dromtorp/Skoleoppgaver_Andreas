-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 13. Jun, 2024 13:52 PM
-- Tjener-versjon: 5.7.24
-- PHP Version: 8.0.1

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
  `sport` int(3) NOT NULL,
  `tlf` varchar(9) NOT NULL,
  `foresatteTlf` varchar(15) NOT NULL DEFAULT 'Ingen'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `brukere`
--

INSERT INTO `brukere` (`brukerID`, `brukerNavn`, `forNavn`, `etterNavn`, `passord`, `rolle`, `sport`, `tlf`, `foresatteTlf`) VALUES
(1, 'admin', 'admin', 'admin', '$2b$10$UIJB.FdNJuCvenAyrK3oQ.5XrBSRXonsysg5MeSdCNi33NXdrjSK.', 2, 1, '0', 'Ingen'),
(2, 'matheopan', 'Matheo Kant', 'Pangopoulos', '$2b$10$CZwZD.cx9ZNdZIdOZIjW0eTegf42hgz8.yPZ767lhBAbmzSnAaN8a', 1, 3, '3829198', 'Ingen'),
(3, 'andreaskri', 'Andreas Hurlen', 'Kristiansen', '$2b$10$tjTjommXw0nF3B42hHWuIegZO/2RlUwzSlQBJM7rARs3QkXTQLQ02', 1, 3, '38219394', 'Ingen');

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
  `turneringsDato` varchar(200) NOT NULL,
  `turneringsAdresse` varchar(200) NOT NULL,
  `turneringsSport` int(3) NOT NULL,
  `turneringsBilde` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `turneringer`
--

INSERT INTO `turneringer` (`turneringsID`, `turneringsNavn`, `turneringsDato`, `turneringsAdresse`, `turneringsSport`, `turneringsBilde`) VALUES
(1, 'Fotball sparking', 'nå', 'Ellelia 10', 3, 'https://www.intersport.no/dw/image/v2/BBWT_PRD/on/demandware.static/-/Sites-intersport-master-catalog/default/dw0067f60b/images/iic-adidas-tc950-h57783-dynamic-x-0003.jpg?sw=334&sh=334&sm=fit');

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
  MODIFY `brukerID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
  MODIFY `turneringsID` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `brukere`
--
ALTER TABLE `brukere`
  ADD CONSTRAINT `rolle` FOREIGN KEY (`rolle`) REFERENCES `roller` (`rolleID`),
  ADD CONSTRAINT `sport` FOREIGN KEY (`sport`) REFERENCES `sporter` (`sportID`);

--
-- Begrensninger for tabell `turneringer`
--
ALTER TABLE `turneringer`
  ADD CONSTRAINT `turneringer_ibfk_1` FOREIGN KEY (`turneringsSport`) REFERENCES `sporter` (`sportID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
