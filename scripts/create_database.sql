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
GO
CREATE TABLE preset_video_games
(
    vg_id        int AUTO_INCREMENT NOT NULL,
    vg_title     varchar(45)    DEFAULT NULL,
    vg_publisher varchar(45)    DEFAULT NULL,
    vg_release   date           DEFAULT NULL,
    vg_console   varchar(45)    DEFAULT NULL,
    vg_worth     decimal(10, 0) DEFAULT NULL,
    PRIMARY KEY (vg_id)
);
GO
CREATE TABLE preset_perfumes
(
    pf_id        int AUTO_INCREMENT NOT NULL,
    pf_brand     varchar(45) DEFAULT NULL,
    pf_name      varchar(45) DEFAULT NULL,
    pf_prod_year date        DEFAULT NULL,
    pf_obtained  date        DEFAULT NULL,
    pf_value     varchar(45) DEFAULT NULL,
    pf_size      varchar(45) DEFAULT NULL,
    pf_smell     varchar(45) DEFAULT NULL,
    PRIMARY KEY (pf_id)
);