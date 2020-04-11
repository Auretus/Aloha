DROP DATABASE IF EXISTS alohausers_db;

CREATE DATABASE alohausers_db;

USE alohausers_db;

CREATE TABLE users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30),
    email TEXT,
    displayName TEXT,
    avatarUrl TEXT,
);


CREATE TABLE conversations (
	id SERIAL NOT NULL AUTO_INCREMENT PRIMARY KEY,
    last_message_id INT NOT NULL,
    INDEX (last_message_id DESC)
);

CREATE TABLE participants (
user_id INT NOT NULL REFERENCES users,
conversation_id INT NOT NULL REFERENCES conversations,
messages_read_at TIMESTAMP NOT NULL DEFAULT NOW(),
PRIMARY KEY (user_id, conersation_id)

);

USE alohausers_db;

CREATE TABLE messages (
id SERIAL NOT NULL PRIMARY KEY,
content TEXT NOT NULL,
user_id INT NOT NULL REFERENCES conversations,
created_at TIMESTAMP NOT NULL DEFAULT NOW(),
INDEX(created_at DESC)

)