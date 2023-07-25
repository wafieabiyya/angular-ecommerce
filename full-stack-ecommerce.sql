-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versi server:                 10.4.25-MariaDB - mariadb.org binary distribution
-- OS Server:                    Win64
-- HeidiSQL Versi:               12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Membuang struktur basisdata untuk full-stack-ecommerce
CREATE DATABASE IF NOT EXISTS `full-stack-ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `full-stack-ecommerce`;

-- membuang struktur untuk table full-stack-ecommerce.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sku` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `unit_price` decimal(13,2) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `active` bit(1) DEFAULT b'1',
  `units_in_stock` int(11) DEFAULT NULL,
  `date_created` datetime(6) DEFAULT NULL,
  `last_updated` datetime(6) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category` (`category_id`),
  CONSTRAINT `fk_category` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel full-stack-ecommerce.product: ~9 rows (lebih kurang)
INSERT INTO `product` (`id`, `sku`, `name`, `description`, `unit_price`, `image_url`, `active`, `units_in_stock`, `date_created`, `last_updated`, `category_id`) VALUES
	(1, 'PO-1000', 'Jeruk Navel Impor', 'Jeruk sunkist dengan ukuran pusar yang besar. Rasanya manis asam segar. Cocok dikonsumsi sebagai camilan atau pencuci mulut. Produk ini dapat digunakan sebagai menu MPASI.', 19.99, 'assets/images/products/product1.jpg', b'1', 100, '2023-07-08 06:12:48.000000', NULL, 2),
	(2, 'PO-1001', 'Daging Rendang Fadagi', 'Daging sapi lokal beku pilihan yang cocok untuk rendang. Teksturnya tidak mudah hancur, sehingga sangat cocok untuk proses memasak yang lama. Diproses halal. Daging dipastikan aman dan berkualitas. Berat produk dapat berkurang 10% dari berat beku.', 29.99, 'assets/images/products/product2.jpg', b'1', 100, '2023-07-08 06:12:48.000000', NULL, 3),
	(3, 'PO-1002', 'Pisang Uli', 'Pisang konvensional akan matang sempurna dalam 2-3 hari. Pisang uli adalah jenis pisang yang paling manis. Daging buahnya lembut, empuk, dan agak lembek. Pisang ini bisa diolah menjadi camilan seperti sale atau keripik pisang.', 24.99, 'assets/images/products/product3.jpg', b'1', 100, '2023-07-08 06:12:48.000000', NULL, 2),
	(4, 'PO-1003', 'Jambu Biji Merah', 'Jambu biji memiliki kulit tipis yang bisa dimakan. Rasanya manis saat matang dan memiliki aroma khas. Tekstur buahnya renyah, agak keras. Sehingga nikmat dikonsumsi sebagai camilan sehat.', 29.99, 'assets/images/products/product4.jpg', b'1', 100, '2023-07-08 06:12:48.000000', NULL, 2),
	(5, 'PO-1004', 'Semangka Merah Baby', 'Semangka merah memiliki daging buah berwarna merah. Rasa manisnya terasa halus dan ringan. Semangka memiliki kandungan air yang tinggi sehingga terasa segar saat dikonsumsi.', 24.99, 'assets/images/products/product5.jpg', b'1', 100, '2023-07-08 06:12:48.000000', NULL, 2),
	(6, 'PO-1005', 'Brokoli Organik', 'Brokoli organik yang ditanam tanpa pestisida dan bahan kimia tambahan. Lebih segar, sehat, dan berkualitas. Kepala bunga berwarna hijau segar. Cocok diolah sebagai sup, dimasak saus, capcay, atau tumisan lainnya.', 8.99, 'assets/images/products/product6.jpg', b'1', 50, '2023-07-05 13:36:47.000000', '2023-07-05 13:36:47.000000', 1),
	(7, 'PO-1006', 'Paprika Mix', 'Rasanya cenderung pahit, sedikit manis, dan pedas. Cocok untuk topping pizza, sandwich, tumis daging, omelet, capcay, dan kreasi masakan lainnya sesuai selera.', 15.99, 'assets/images/products/product7.jpg', b'1', 50, '2023-07-05 13:36:47.000000', '2023-07-05 13:36:47.000000', 1),
	(8, 'PO-1007', 'Ayam Goreng Mail', 'ayam goreng kesukaan mail dan meimei', 50.00, 'assets/images/products/product8.jpg', b'1', 20, '2023-07-22 14:45:56.000000', NULL, 3),
	(9, 'PO-1008', 'Burger Ekhsan', 'Burger makanan kesukaan Ekhsan anak papah teman jarjid', 15.00, 'assets/images/products/product9.jpg', b'1', 14, '2023-07-22 14:50:14.000000', NULL, 3);

-- membuang struktur untuk table full-stack-ecommerce.product_category
CREATE TABLE IF NOT EXISTS `product_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- Membuang data untuk tabel full-stack-ecommerce.product_category: ~5 rows (lebih kurang)
INSERT INTO `product_category` (`id`, `category_name`) VALUES
	(1, 'Sayur'),
	(2, 'Buah'),
	(3, 'Daging'),
	(4, 'Rempah'),
	(5, 'Susu');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
