-- creates database and table structure for docker image

CREATE DATABASE IF NOT EXISTS collectiqoDB DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
GO
USE collectiqoDB;
GO
CREATE TABLE clq_users
(
    id        INT AUTO_INCREMENT NOT NULL,
    username  varchar(100) NOT NULL,
    email     varchar(100) NOT NULL,
    password  varchar(255) NOT NULL,
    PRIMARY KEY (id)
);