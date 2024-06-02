-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: 29. Mai, 2024 19:05 PM
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
-- Database: `kantinedatabase`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `bestillinger`
--

CREATE TABLE `bestillinger` (
  `bestillingsID` int(5) NOT NULL,
  `bestilteProdukter` json NOT NULL,
  `dato` varchar(60) NOT NULL,
  `pris` int(5) NOT NULL,
  `tlfNummer` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `bestillinger`
--

INSERT INTO `bestillinger` (`bestillingsID`, `bestilteProdukter`, `dato`, `pris`, `tlfNummer`) VALUES
(1, '[\"2\", \"1\"]', '23/05/2024 14:13:59', 70, 40677075),
(2, '[\"2\", \"2\", \"1\", \"1\", \"4\", \"4\"]', '23/05/2024 14:39:27', 196, 4028284),
(3, '[\"1\", \"2\", \"2\"]', '23/05/2024 15:04:28', 115, 4674),
(4, '[\"1\", \"2\", \"2\"]', '23/05/2024 15:05:16', 115, 574654),
(5, '[\"1\", \"1\", \"3\"]', '23/05/2024 15:08:48', 75, 4385735),
(6, '[\"1\", \"1\", \"2\"]', '23/05/2024 15:13:56', 95, 2957252),
(7, '[\"1\", \"2\"]', '23/05/2024 16:03:15', 70, 444477),
(8, '[\"2\", \"3\"]', '23/05/2024 16:04:04', 70, 423526),
(9, '[\"2\", \"2\", \"3\"]', '23/05/2024 16:05:10', 115, 342646),
(10, '[\"1\", \"1\", \"2\"]', '23/05/2024 16:08:29', 95, 536377),
(11, '[\"2\", \"2\", \"1\", \"1\"]', '23/05/2024 17:57:48', 140, 534636),
(12, 'null', '23/05/2024 17:58:42', 140, 5295825),
(13, '[\"2\", \"2\", \"1\", \"1\", \"4\"]', '23/05/2024 18:00:13', 168, 24152526),
(14, '[\"2\", \"2\", \"1\", \"1\"]', '23/05/2024 18:01:07', 140, 3525254),
(15, '[\"1\", \"1\", \"1\", \"3\"]', '23/05/2024 18:34:25', 100, 40677075),
(16, '[\"1\", \"1\", \"2\", \"4\", \"4\"]', '23/05/2024 18:43:52', 151, 348252),
(17, '[\"1\", \"1\", \"1\", \"1\", \"1\", \"1\"]', '23/05/2024 18:44:50', 150, 255252),
(18, '[\"1\", \"1\", \"2\", \"2\", \"2\", \"4\", \"4\", \"4\", \"3\", \"3\", \"3\"]', '23/05/2024 22:31:57', 344, 40677075),
(19, '[\"1\", \"1\", \"1\", \"1\"]', '23/05/2024 22:34:46', 100, 4577),
(20, '[\"1\", \"1\", \"2\", \"2\"]', '23/05/2024 22:37:15', 140, 4058385),
(21, '[\"1\", \"1\", \"2\", \"3\"]', '24/05/2024 10:56:16', 120, 40677075),
(22, '[\"1\", \"1\", \"2\", \"2\"]', '24/05/2024 11:09:45', 140, 4069506),
(23, '[\"1\", \"1\", \"2\"]', '24/05/2024 12:05:16', 95, 40677075),
(24, '[\"1\", \"2\", \"4\"]', '24/05/2024 13:21:58', 98, 40647333),
(25, '[\"1\", \"1\", \"1\"]', '24/05/2024 13:24:48', 75, 45639234),
(26, '[\"1\", \"2\", \"3\", \"1\", \"1\"]', '28/05/2024 09:25:47', 145, 12345678),
(27, '[\"3\", \"1\"]', '29/05/2024 15:07:14', 50, 429846),
(28, '[\"1\", \"1\", \"1\", \"3\"]', '29/05/2024 17:05:57', 100, 21324),
(29, '[\"1\", \"1\", \"1\", \"2\"]', '29/05/2024 17:06:45', 120, 464563563);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `brukere`
--

CREATE TABLE `brukere` (
  `brukernavn` varchar(5) NOT NULL,
  `passord` varchar(15) NOT NULL,
  `salt` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `brukere`
--

INSERT INTO `brukere` (`brukernavn`, `passord`, `salt`) VALUES
('admin', '-2440374220', 'Dh6Mc-ap^_');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `meny`
--

CREATE TABLE `meny` (
  `produktID` int(4) NOT NULL,
  `produktNavn` varchar(60) NOT NULL,
  `pris` int(9) NOT NULL,
  `antall` int(4) NOT NULL,
  `bildeBane` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dataark for tabell `meny`
--

INSERT INTO `meny` (`produktID`, `produktNavn`, `pris`, `antall`, `bildeBane`) VALUES
(1, 'Kjeks Lys', 25, 14, 'https://millba.no/wp-content/uploads/2018/06/milk_chokolate_cookies.jpg'),
(2, 'Panini Skinke', 45, 17, 'https://www.tefal.com/medias/?context=bWFzdGVyfHJvb3R8MjY5Mjh8aW1hZ2UvanBlZ3xoNTEvaGFjLzE0NTM0Njc4NjQyNzE4LmpwZ3xhZjU0MTA0Y2Q3YWIzZmYzYzYyNzc0MmJjMThjM2ExN2Q5NDE5YTQzYjhmOWFhN2MzYjdlYWMwNGUzYWVmMjY1'),
(3, 'Iste Fersken', 25, 23, 'https://www.tine.no/_/packshot/160x160/6732.png'),
(4, 'Pepsi Max', 28, 24, 'https://www.ishimages.lyreco.com/eCommerce/ImageLarge/03/40/asset.10950340.jpg'),
(5, 'Cola Zero', 28, 30, 'https://www.dollarstore.no/wp-content/uploads/pckasse_upload/Coca-Cola-Zero-085L_1708336778_65d3268a34a45.jpg'),
(6, 'Muffin Lys', 25, 30, 'https://thefirstyearblog.com/wp-content/uploads/2020/05/Chocolate-Chip-Muffins-2023-Square.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bestillinger`
--
ALTER TABLE `bestillinger`
  ADD PRIMARY KEY (`bestillingsID`);

--
-- Indexes for table `meny`
--
ALTER TABLE `meny`
  ADD PRIMARY KEY (`produktID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bestillinger`
--
ALTER TABLE `bestillinger`
  MODIFY `bestillingsID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `meny`
--
ALTER TABLE `meny`
  MODIFY `produktID` int(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
