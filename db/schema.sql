USE burger_db;

CREATE TABLE burgers
(
	id INT AUTO_INCREMENT NOT NULL,
	burger_name varchar(100) NOT NULL,
	devoured BOOLEAN NOT NULL DEFAULT false,
	date TIMESTAMP DEFAULT now(),
	PRIMARY KEY (id)
);