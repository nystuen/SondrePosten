DROP TABLE IF EXISTS sak, sak_rating, sak_kommentar_bruker, kategori;

CREATE TABLE `sak` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `aktiv` tinyint(1) DEFAULT NULL,
 `overskrift` varchar(255) DEFAULT NULL,
 `bildetekst` varchar(600) NOT NULL,
 `innhold` varchar(20000) DEFAULT NULL,
 `tidspunkt` varchar(30) DEFAULT NULL,
 `bilde` varchar(255) DEFAULT NULL,
 `kategori` varchar(255) NOT NULL,
 `viktighet` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `kategori` (`kategori`),
 CONSTRAINT `sak_ibfk_1` FOREIGN KEY (`kategori`) REFERENCES `kategori` (`kategori`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=latin1;

CREATE TABLE `sak_rating` (
 `rating_id` int(11) NOT NULL AUTO_INCREMENT,
 `sak_id` int(11) DEFAULT NULL,
 `rating` int(11) DEFAULT NULL,
 PRIMARY KEY (`rating_id`),
 KEY `sak_id` (`sak_id`),
 CONSTRAINT `sak_rating_ibfk_1` FOREIGN KEY (`sak_id`) REFERENCES `sak` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=latin1;

CREATE TABLE `sak_kommentar_bruker` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `sak_id` int(11) NOT NULL,
 `brukernavn` varchar(30) DEFAULT NULL,
 `kommentar` varchar(255) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `sak_id` (`sak_id`),
 CONSTRAINT `sak_kommentar_bruker_ibfk_1` FOREIGN KEY (`sak_id`) REFERENCES `sak` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=latin1;

CREATE TABLE `kategori` (
 `kategori` varchar(255) NOT NULL,
 PRIMARY KEY (`kategori`) USING BTREE,
 UNIQUE KEY `kategori` (`kategori`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
