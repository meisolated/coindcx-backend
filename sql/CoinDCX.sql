-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 23, 2021 at 10:13 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `CoinDCX`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_buy_sell_pool`
--

CREATE TABLE `tbl_buy_sell_pool` (
  `id` int(11) NOT NULL,
  `market_name` varchar(40) NOT NULL,
  `pair` varchar(40) NOT NULL,
  `current_price` varchar(40) NOT NULL,
  `type` varchar(30) NOT NULL,
  `status` varchar(40) NOT NULL,
  `msg` varchar(100) NOT NULL,
  `timestamp` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_buy_sell_pool`
--

INSERT INTO `tbl_buy_sell_pool` (`id`, `market_name`, `pair`, `current_price`, `type`, `status`, `msg`, `timestamp`) VALUES
(281, 'MANAINR', 'I-MANA_INR', '333.65', 'Buy', 'new', 'null', ' 2021-11-23 12:37:14'),
(282, 'MANAINR', 'I-MANA_INR', '335.99', 'Buy', 'new', 'null', ' 2021-11-23 14:25:43'),
(287, 'MANAINR', 'I-MANA_INR', '335.99', 'Buy', 'new', 'null', ' 2021-11-23 14:27:52');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_fav`
--

CREATE TABLE `tbl_fav` (
  `id` int(11) NOT NULL,
  `market_name` varchar(40) NOT NULL,
  `pair` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_fav`
--

INSERT INTO `tbl_fav` (`id`, `market_name`, `pair`, `status`) VALUES
(1, 'MANAINR', 'I-MANA_INR', 'active'),
(2, 'BTCINR', 'I-BTC_INR', 'active'),
(3, 'CRVINR', 'I-CRV_INR', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_logs`
--

CREATE TABLE `tbl_logs` (
  `id` int(11) NOT NULL,
  `frm` varchar(40) NOT NULL,
  `datetime` varchar(40) NOT NULL,
  `details` varchar(300) NOT NULL,
  `message` varchar(300) NOT NULL,
  `type` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_position`
--

CREATE TABLE `tbl_position` (
  `id` int(11) NOT NULL,
  `market_name` varchar(40) NOT NULL,
  `pair` varchar(40) NOT NULL,
  `price` varchar(40) NOT NULL,
  `timestamp` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_settings`
--

CREATE TABLE `tbl_settings` (
  `id` int(11) NOT NULL,
  `validator` varchar(11) NOT NULL,
  `risk_manager` varchar(11) NOT NULL,
  `amount_allowed` float(11,8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_settings`
--

INSERT INTO `tbl_settings` (`id`, `validator`, `risk_manager`, `amount_allowed`) VALUES
(1, 'true', 'false', 2.20000005);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_trades`
--

CREATE TABLE `tbl_trades` (
  `id` int(11) NOT NULL,
  `trade_id` varchar(40) NOT NULL,
  `market` varchar(40) NOT NULL,
  `order_type` varchar(40) NOT NULL,
  `side` varchar(40) NOT NULL,
  `status` varchar(40) NOT NULL,
  `fee_amount` float(12,8) NOT NULL,
  `fee` float(2,2) NOT NULL,
  `total_quantity` float(12,8) NOT NULL,
  `remaining_quantity` float(12,8) NOT NULL,
  `avg_price` float(12,8) NOT NULL,
  `price_per_unit` float(12,8) NOT NULL,
  `created_at` varchar(40) NOT NULL,
  `updated_at` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `email` varchar(256) NOT NULL,
  `key` varchar(100) NOT NULL,
  `secret` varchar(100) NOT NULL,
  `allowed_amount` decimal(40,4) NOT NULL,
  `coindcx_id` varchar(36) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `name`, `email`, `key`, `secret`, `allowed_amount`, `coindcx_id`) VALUES
(1, 'Vivek', 'fisolatedx@gmail.com', '2293f91b2e8fbb0923b802bc2194b826d90532cc0d8436ec', '0a88d82960c17a6f2666bb7ecdf0e34c4acc775df6fd232866bcc92c7187566e', '2500.0000', 'null');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_buy_sell_pool`
--
ALTER TABLE `tbl_buy_sell_pool`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_fav`
--
ALTER TABLE `tbl_fav`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_position`
--
ALTER TABLE `tbl_position`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_trades`
--
ALTER TABLE `tbl_trades`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_buy_sell_pool`
--
ALTER TABLE `tbl_buy_sell_pool`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=288;

--
-- AUTO_INCREMENT for table `tbl_fav`
--
ALTER TABLE `tbl_fav`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `tbl_logs`
--
ALTER TABLE `tbl_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_position`
--
ALTER TABLE `tbl_position`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_settings`
--
ALTER TABLE `tbl_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_trades`
--
ALTER TABLE `tbl_trades`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
