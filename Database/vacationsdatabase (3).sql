-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2023 at 08:34 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdatabase`
--
CREATE DATABASE IF NOT EXISTS `vacationsdatabase` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdatabase`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `userId` int(11) NOT NULL,
  `vacationId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`userId`, `vacationId`) VALUES
(11, 15),
(11, 18);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(256) NOT NULL,
  `role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `email`, `password`, `role`) VALUES
(1, 'Dana', 'Lurie', 'danalurie4@gmail.com', '1525cf476d5f83165113085bfc5b700060734723eaeb7a6d026388b2cca4ddc27a46f23ae986f3d4743e0a6e442cb5c8731a7b5b1155db0a7004cf9697748a0d', 'Admin'),
(2, 'Mona', 'Lisa', 'monalisa@gmail.com', 'monalisa', 'User'),
(4, 'Van', 'Gogh', 'VanGogh@gmail.com', '3d7d7b4450dc7ecf109f4af1b5a765ea40223283b14abd6f95de3bf69b21ad6b22f20d21484bce9f61bc2e8f277d9ea4498079626f41ed2ca39c7f9451618670', 'User'),
(5, 'hana', 'senesh', 'hana123@gmail.com', 'ee180e64089a7c52ab15d84a09c67945d36d95c72122a3b2daac48082e48248be3e3d20acd7f9ed33eebc8f657ea9a200c59ec322805fff20fa4c3f932d36b31', 'User'),
(9, 'dina', 'barzilay', 'dina@gmail.com', '64678bd5f5c9076eb5f5ff50935bc6bd263ec37af2b4bd9c2c430a89e039e36481193acd32746945248913b4f4cc6eca17c937c2de140840db8ba97974a1eb37', 'User'),
(10, 'yehorm', 'cohen', 'yehoram@gmail.com', 'ac3c87e6dcbde62a530030e7b34b37b3108211fe84db5be0f10a2854dc129ab66e93ae1ff3d39304018e825a5712a3947de9dc56388c255e7a3656ced4edcab9', 'User'),
(11, 'regina', 'gorge', 'regina@gmail.com', '92af543f36b663d5cdab67d03d7c3eaf963c77ea7866c4b25142f6469f9d7992b9f45c4a693ebe4d3579c7de9a21decf07a7c0ea1ec07587416040c763539e59', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imageName` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `destination`, `description`, `startDate`, `endDate`, `price`, `imageName`) VALUES
(15, 'Alaska', 'Explore the great outdoors, participating in thrilling activities like glacier trekking or rafting or more relaxed ventures such as hiking, biking, fishing, camping, and simply immersing yourself in breathtaking wide-open spaces. Take a train ride, day cruise, or flightseeing tour for chances to spot wildlife, from bears to whales. Experience Alaska Native culture through cultural tours or festivals', '2023-02-17', '2023-03-09', '1780.00', '465fca11-c7b1-42a8-a9c3-1cbe6984dcd0.jfif'),
(17, 'Amsterdam', 'Visit the world-famous 17th century capital of Holland. Enjoy the historic buildings, beautiful museums and pleasant ambiance. Go for a boat tour on the canals, stroll through Vondelpark, and go shopping in the inner city. Amsterdam is a unique city!', '2023-02-17', '2023-02-24', '52.00', 'e819bee1-ba13-4922-8c13-4b0bf897923a.jfif'),
(18, 'Bacelona', 'Barcelona is a city with a wide range of original leisure options that encourage you to visit time and time again. Overlooking the Mediterranean Sea, and famous for Gaudí and other Art Nouveau architecture, Barcelona is one of Europe’s trendiest cities.', '2023-02-21', '2023-02-24', '64.00', '00807b19-1b3e-4e1f-85c5-f144f666170f.jfif'),
(19, 'Japan', 'A land of contrasts, Japan is a fascinating destination for visitors. Combining the attractions of an ancient and unfamiliar culture with all the trappings of one of the world powerhouses in entertainment, fashion, and innovation, Japan is a journey of discovery wherever you go.', '2023-05-06', '2023-05-31', '1980.00', 'cc9e67df-efd1-4301-948c-869a917a11ec.jfif'),
(20, 'Korea', 'South Korea boasts abundant tourist attractions. Tourists can experience distinctive harmony between historical cultural heritage and modern culture. With these preserved local identities, tourists can also explore and enjoy local cultures, natural environments, and unique food.', '2023-03-31', '2023-04-26', '1212.99', '7d88efa4-a437-49b6-bb92-ee98feef6e29.jfif'),
(21, 'London', 'London is London , and no other city in the world is like it. Its attractions and places of interest are countless and cater for all tastes and all ages; its shops - small and large - are often unforgettable; its culture - theatres and museums combined - in a class of its own.', '2023-02-28', '2023-03-04', '89.00', '14fc3fb3-b534-441d-b248-a7cbd867e799.jfif'),
(22, 'New york', 'New York, also known as the Big Apple, is a city which offers infinite things to do and places to see. The city of skyscrapers has starred in films and novels that have made it a dream destination for many. A trip to New York is a unique experience, what are you waiting for?', '2023-06-02', '2023-06-27', '1340.00', '08184698-7adc-4383-aae3-65a5f85ca344.jfif'),
(23, 'Prague', 'Planning a vacation or a short city break in Prague? If your answer is yes, then this is the travel guide for you! With a section on how to get to the city, the transportation needed to get to your hotel once landed in Václav Havel Airport, a list with the best areas to stay in, and the capital’s top attractions, among other useful information, you’ll find everything you need in this travel guide to make this trip unforgettable.', '2023-03-04', '2023-03-08', '46.00', 'e6cba1cf-f8ad-4d78-b16e-c8a4deed9661.jfif'),
(24, 'Tel Aviv', 'Tel Aviv is Israel’s cultural and commercial capital. Named “The Mediterranean Capital of Cool” by the New York Times, Tel Aviv is a city with a savvy attitude and cultural astuteness. “The city which never sleeps” is a center for nightlife, cuisine, culture, and liberalism. The city is bordered on one side by the Mediterranean and long stretches of sandy beaches, and on the other by glass towers housing technology companies in what is considered to be the world’s second most important hi-tech area. Prominent museums, restored neighborhoods such as the ancient Port of Jaffa, Neve Tzedek and the White City of Bauhaus style buildings, and a young and diverse population, make Tel Aviv a city which you can never stop exploring.', '2023-02-18', '2023-02-21', '112.00', '3fce5f1d-4397-4c1c-bb9d-8a1f759eecf2.jpg'),
(25, 'Rome', 'Rome was called the “Eternal City” by the ancient Romans because they believed that no matter what happened in the rest of the world, the city of Rome would always remain standing. Exploring the city center by foot surrounded by glorious monuments and colossal remains takes you back in time to the “glory that was Rome”.', '2023-02-28', '2023-03-03', '76.00', '72917e34-2806-46ae-ab03-63d5adb18272.jfif'),
(26, 'San Francisco', 'Set along the ocean, with rolling hills and the iconic Golden Gate Bridge, San Francisco is one of the most beautiful cities in the United States and the jewel of Northern California. The city is full of history, great neighborhoods, parks, beaches, museums, and a whole host of entertainment options and things to do.', '2023-07-08', '2023-07-27', '1300.00', '02f0c9de-b690-4293-9b59-e27f311b5845.jfif'),
(27, 'Berlin', 'Berlin in Autumn and Winter awaits you. Visit the great museums & sights and then relax in a café. Look forward to concerts & shows, stroll through the shops and discover with us all the diversity of the most wonderful season in Berlin.', '2023-11-20', '2024-11-28', '134.00', '72a47cf0-ae16-49d3-a7ee-8cbf5ee87c5d.jfif'),
(28, 'Kyiv', 'Filled with theaters, museums, religious sites, modern buildings and ancient ruins, the city of Kyiv is the center of Ukrainian culture. The Monastery of the Caves, founded in 1015, and Saint Sophia Cathedral, founded in 1037, are both World Heritage Sites', '2023-03-12', '2023-03-20', '306.00', 'f534bde4-e90b-4a86-ac35-b279956caa68.jfif'),
(29, 'Greece', 'Greece has been a major tourist destination and attraction in Europe since the 1970s for its rich culture and history, which is reflected in large part by its 18 UNESCO World Heritage Sites, among the most in Europe and the world as well as for its long coastline, many islands, and beaches.', '2023-02-25', '2023-02-28', '252.00', '33b51a07-f5e3-4c42-afc7-8c7fb4d0a60e.jfif'),
(30, 'Tel Aviv', 'Tel Aviv is Israel’s cultural and commercial capital. Named “The Mediterranean Capital of Cool” by the New York Times, Tel Aviv is a city with a savvy attitude and cultural astuteness. “The city which never sleeps” is a center for nightlife, cuisine, culture, and liberalism.', '2023-03-02', '2023-03-06', '112.00', '64c0e6b8-9724-4f66-80a6-0cb2db02fd3b.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD KEY `userId` (`userId`),
  ADD KEY `vacationId` (`vacationId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
