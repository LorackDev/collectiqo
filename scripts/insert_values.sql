-- includes sample data for docker image

-- users sample data
INSERT INTO clq_users (email, username, password)
VALUES
    ('alice.wonderland@example.com', 'Alice', 'RabbitHole1'),
    ('mad.hatter@example.com', 'MadHatter', 'TeaParty2'),
    ('queen.red@example.com', 'RedQueen', 'OffWithTheirHeads3'),
    ('cheshire.cat@example.com', 'CheshireCat', 'Grinning4'),
    ('white.rabbit@example.com', 'WhiteRabbit', 'Late4ImportantDate5');
GO
-- video game preset sample data
INSERT INTO preset_video_games (vg_title, vg_publisher, vg_release, vg_console, vg_worth)
VALUES
    ('The Legend of Zelda: Breath of the Wild', 'Nintendo', '2017-03-03', 'Nintendo Switch', 60),
    ('Red Dead Redemption 2', 'Rockstar Games', '2018-10-26', 'PlayStation 4', 60),
    ('Super Mario Odyssey', 'Nintendo', '2017-10-27', 'Nintendo Switch', 50),
    ('The Witcher 3: Wild Hunt', 'CD Project Red', '2015-05-19', 'PlayStation 4', 40),
    ('Horizon Zero Dawn', 'Sony Interactive Entertainment', '2017-02-28', 'PlayStation 4', 40),
    ('Fortnite', 'Epic Games', '2017-07-25', 'Multi-platform', 0),
    ('Minecraft', 'Mojang Studios', '2011-11-18', 'Multi-platform', 30),
    ('Grand Theft Auto V', 'Rockstar Games', '2013-09-17', 'Multi-platform', 40),
    ('Animal Crossing: New Horizons', 'Nintendo', '2020-03-20', 'Nintendo Switch', 50),
    ('Call of Duty: Warzone', 'Activision', '2020-03-10', 'Multi-platform', 0);
GO
-- perfume preset sample data
INSERT INTO preset_perfumes (pf_brand, pf_name, pf_prod_year, pf_obtained, pf_value, pf_size, pf_smell)
VALUES
    ('Chanel', 'Coco Mademoiselle', '2001-01-01', '2022-04-01', 'High', '50ml', 'Floral'),
    ('Dior', 'Sauvage', '2015-09-02', '2021-08-15', 'High', '100ml', 'Woody'),
    ('Yves Saint Laurent', 'Black Opium', '2014-09-01', '2020-06-20', 'High', '90ml', 'Sweet'),
    ('Jo Malone', 'English Pear & Freesia', '2010-01-01', '2022-02-14', 'Medium', '30ml', 'Fruity'),
    ('Tom Ford', 'Tobacco Vanille', '2007-09-01', '2021-12-25', 'High', '50ml', 'Warm Spicy'),
    ('Creed', 'Aventus', '2010-01-01', '2020-05-10', 'High', '100ml', 'Fruity'),
    ('Gucci', 'Guilty', '2010-09-01', '2023-03-08', 'Medium', '75ml', 'Oriental Floral'),
    ('Marc Jacobs', 'Daisy', '2007-04-15', '2022-01-30', 'Medium', '50ml', 'Floral Woody Musk'),
    ('Viktor & Rolf', 'Flowerbomb', '2005-03-01', '2021-11-11', 'High', '100ml', 'Floral Oriental'),
    ('Giorgio Armani', 'Acqua Di Gio', '1996-03-01', '2023-02-05', 'High', '100ml', 'Fresh Spicy');
