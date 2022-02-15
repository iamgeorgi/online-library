CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,  
    PRIMARY KEY(id)
);

CREATE TABLE books (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
	author VARCHAR(255) NOT NULL,
    is_borrowed TINYINT NOT NULL,
    unlisted TINYINT NOT NULL,
    users_id INT,
    FOREIGN KEY(users_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE reviews (
	id INT NOT NULL AUTO_INCREMENT,
    text VARCHAR(255) NOT NULL,
	 users_id INT,
     books_id INT,
     FOREIGN KEY(users_id) REFERENCES users(id),
     FOREIGN KEY(books_id) REFERENCES books(id),
    PRIMARY KEY(id)
);

