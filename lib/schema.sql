CREATE TABLE categories (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE products (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  image_url varchar(255),
  category_id INT,
  KEY category_id_idx (category_id)
);

CREATE TABLE shows (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  slug varchar(255) NOT NULL, 
  opening_date DATE,
  content_html TEXT,
  image_1_url varchar(255),
  image_2_url varchar(255),
  image_3_url varchar(255),
  theatre varchar(255),
  sinopsis TEXT
);


CREATE TABLE written_press (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  veredict TEXT,
  quote TEXT,
  media_organization TEXT,
  journalist TEXT,
  date date,
  article_url varchar(255),
  image_url varchar(255),
  show_id INT,
  KEY show_id_idx (show_id)
);


INSERT INTO shows (name, slug, opening_date, content_html, image_1_url, image_2_url, image_3_url, theatre, sinopsis)
VALUES
  ('Show 1', 'show-1', '2023-09-25', '<p>HTML content for Show 1</p>', 'image1.jpg', 'image2.jpg', 'image3.jpg', 'Theatre 1', 'Synopsis for Show 1'),
  ('Show 2', 'show-2', '2023-09-26', '<p>HTML content for Show 2</p>', 'image4.jpg', 'image5.jpg', 'image6.jpg', 'Theatre 2', 'Synopsis for Show 2'),
  ('Show 3', 'show-3', '2023-09-27', '<p>HTML content for Show 3</p>', 'image7.jpg', 'image8.jpg', 'image9.jpg', 'Theatre 3', 'Synopsis for Show 3');

INSERT INTO written_press (veredict, quote, media_organization, journalist, date, article_url, image_url, show_id)
VALUES
  ('Positive review', 'A must-see!', 'News Network 1', 'John Doe', '2023-09-28', 'article1.html', 'image1.jpg', '1'),
  ('Mixed review', 'Worth checking out.', 'Press Gazette', 'Jane Smith', '2023-09-29', 'article2.html', 'image2.jpg', '2'),
  ('Negative review', 'Disappointing performance.', 'The Daily Review', 'Bob Johnson', '2023-09-30', 'article3.html', 'image3.jpg', '3');
