CREATE DATABASE IF NOT EXISTS mentoria CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mentoria;

DROP TABLE IF EXISTS mood;
DROP TABLE IF EXISTS reminders;
DROP TABLE IF EXISTS campaigns;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS goals;
DROP TABLE IF EXISTS clients;

CREATE TABLE clients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  goal VARCHAR(200),
  status ENUM('activo','riesgo','inactivo') DEFAULT 'activo',
  next_session DATE,
  score INT DEFAULT 70,
  engagement INT DEFAULT 70,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_id INT NOT NULL,
  topic VARCHAR(200),
  date DATE,
  time TIME,
  status ENUM('programada','hecha','cancelada') DEFAULT 'programada',
  location VARCHAR(120),
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE goals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(120) NOT NULL,
  value INT NOT NULL
);

CREATE TABLE campaigns (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  tag VARCHAR(80),
  image VARCHAR(255),
  cta VARCHAR(120)
);

CREATE TABLE reminders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  time_label VARCHAR(60) NOT NULL
);

CREATE TABLE mood (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(80) NOT NULL,
  value INT NOT NULL
);

INSERT INTO clients (name, goal, status, next_session, score, engagement, avatar_url) VALUES
('Ana Torres', 'Liderazgo', 'activo', '2026-02-12', 82, 88, 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80'),
('Luis Pérez', 'Productividad', 'riesgo', '2026-02-15', 68, 70, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80'),
('Marta Díaz', 'Cambio de rol', 'activo', '2026-02-20', 90, 92, 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80'),
('Carlos Vega', 'Negociación', 'inactivo', '2026-03-02', 74, 60, 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=400&q=80');

INSERT INTO sessions (client_id, topic, date, time, status, location) VALUES
(1, 'Retro de liderazgo', '2026-02-12', '10:00', 'programada', 'Zoom'),
(2, 'Rutinas de foco', '2026-02-12', '12:00', 'programada', 'Meet'),
(3, 'Cambio de rol', '2026-02-13', '09:00', 'programada', 'Zoom'),
(4, 'Estrategia Q2', '2026-02-18', '16:00', 'programada', 'Presencial');

INSERT INTO goals (label, value) VALUES
('En curso', 18),
('Completados', 9),
('En riesgo', 5);

INSERT INTO campaigns (title, tag, image, cta) VALUES
('Programa Momentum', 'Semana 6', 'https://images.unsplash.com/photo-1529333166433-89e3ab167434?auto=format&fit=crop&w=1200&q=80', 'Ver plan'),
('Rutina de enfoque profundo', 'Plantilla IA', 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80', 'Compartir'),
('Feedback 360° ejecutivo', 'Checklist listo', 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80', 'Enviar');

INSERT INTO reminders (title, time_label) VALUES
('Enviar resumen post-sesión a Ana', 'Hace 1h'),
('Automatizar check-in de motivación', 'Hoy 18:00'),
('Revisar riesgo de Luis', 'Mañana');

INSERT INTO mood (label, value) VALUES
('Motivado', 62),
('Neutro', 23),
('En riesgo', 15);
