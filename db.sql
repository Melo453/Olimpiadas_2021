-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 25, 2021 at 01:31 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db`
--

-- --------------------------------------------------------

--
-- Table structure for table `evento`
--

CREATE TABLE `evento` (
  `hora_dia` datetime NOT NULL,
  `tipo_evento` int(2) NOT NULL,
  `nombre_sucursal` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `evento`
--

INSERT INTO `evento` (`hora_dia`, `tipo_evento`, `nombre_sucursal`) VALUES
('2021-08-24 12:51:19', 1, 'frabega'),
('2021-08-23 14:15:42', 1, 'frabega'),
('2021-08-24 18:28:06', 1, 'frabega'),
('2021-08-24 18:28:12', 1, 'frabega'),
('2021-08-24 18:28:14', 1, 'frabega'),
('2021-08-24 18:28:15', 1, 'frabega'),
('2021-08-24 18:28:16', 1, 'frabega'),
('2021-08-24 18:28:17', 1, 'frabega'),
('2021-08-24 23:30:48', 1, 'frabega'),
('2021-08-24 23:30:49', 1, 'frabega'),
('2021-08-24 23:30:49', 1, 'frabega');

-- --------------------------------------------------------

--
-- Table structure for table `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre_rol` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `rol`
--

INSERT INTO `rol` (`id`, `nombre_rol`) VALUES
(1, 'visitante');

-- --------------------------------------------------------

--
-- Table structure for table `sucursal`
--

CREATE TABLE `sucursal` (
  `nombre` varchar(50) COLLATE utf8mb4_spanish_ci NOT NULL,
  `capacidad_personas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Dumping data for table `sucursal`
--

INSERT INTO `sucursal` (`nombre`, `capacidad_personas`) VALUES
('frabega', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `evento`
--
ALTER TABLE `evento`
  ADD KEY `nombre_sucursal` (`nombre_sucursal`);

--
-- Indexes for table `sucursal`
--
ALTER TABLE `sucursal`
  ADD PRIMARY KEY (`nombre`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `evento_ibfk_1` FOREIGN KEY (`nombre_sucursal`) REFERENCES `sucursal` (`nombre`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
