-- Cria o banco de dados Teste
CREATE DATABASE database;

-- Abre o banco de dados
USE database;

-- Cria a tabela de usuários
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  gender VARCHAR(255),
  age INTEGER
);

-- Insere alguns dados na tabela
INSERT INTO users (id, name, email, gender, age) VALUES (1, 'John Doe', 'johndoe@example.com', 'male', 30);
INSERT INTO users (id, name, email, gender, age) VALUES (2, 'Jane Doe', 'janedoe@example.com', 'female', 25);