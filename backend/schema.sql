CREATE DATABASE IF NOT EXISTS mentoria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mentoria;

CREATE TABLE IF NOT EXISTS clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  goal VARCHAR(200),
  status ENUM('activo','riesgo','inactivo') DEFAULT 'activo',
  next_session DATE,
  score INT DEFAULT 70,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client VARCHAR(120) NOT NULL,
  topic VARCHAR(200),
  date DATE,
  time VARCHAR(10)
);

INSERT INTO clients (name, goal, status, next_session, score) VALUES
('Ana', 'Liderazgo', 'activo', '2026-02-12', 82),
('Luis', 'Productividad', 'riesgo', '2026-02-15', 68),
('Marta', 'Cambio de rol', 'activo', '2026-02-20', 90);

INSERT INTO sessions (client, topic, date, time) VALUES
('Ana', 'Liderazgo', '2026-02-12', '10:00'),
('Luis', 'Productividad', '2026-02-12', '12:00'),
('Marta', 'Cambio de rol', '2026-02-13', '09:00');
