import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'mentoria',
  waitForConnections: true,
  connectionLimit: 10,
  namedPlaceholders: true
});

app.get('/api/metrics', async (_req, res) => {
  try {
    const [
      [kpiClientsRows],
      [kpiSessionsRows],
      [kpiScoreRows],
      [pipelineRows],
      [goalsRows],
      [sessionsRows],
      [campaignsRows],
      [remindersRows],
      [moodRows]
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) AS value, 8 AS trend, 'Clientes activos' AS label FROM clients WHERE status='activo'"),
      pool.query(`SELECT COUNT(*) AS value, 6 AS trend, 'Sesiones mes' AS label FROM sessions 
                  WHERE MONTH(date)=MONTH(CURDATE()) AND YEAR(date)=YEAR(CURDATE())`),
      pool.query("SELECT IFNULL(ROUND(AVG(score)),0) AS value, -2 AS trend, 'Satisfacción IA' AS label FROM clients"),
      pool.query('SELECT name, engagement FROM clients ORDER BY engagement DESC LIMIT 10'),
      pool.query('SELECT label, value FROM goals'),
      pool.query(`SELECT s.id, c.name AS client, s.topic, 
        DATE_FORMAT(s.date, '%d %b %Y') AS date, TIME_FORMAT(s.time, '%H:%i') AS time
        FROM sessions s JOIN clients c ON s.client_id = c.id
        ORDER BY s.date, s.time`),
      pool.query('SELECT title, tag, image, cta FROM campaigns ORDER BY id'),
      pool.query('SELECT title, time_label AS time FROM reminders ORDER BY id'),
      pool.query('SELECT label, value FROM mood ORDER BY id')
    ]);

    res.json({
      kpis: [kpiClientsRows[0], kpiSessionsRows[0], kpiScoreRows[0]],
      pipeline: pipelineRows,
      goals: goalsRows,
      sessions: sessionsRows,
      campaigns: campaignsRows,
      reminders: remindersRows,
      mood: moodRows
    });
  } catch (err) {
    console.error('Error /api/metrics', err);
    res.status(500).json({ message: 'Error obteniendo métricas' });
  }
});

app.get('/api/clients', async (_req, res) => {
  try {
    const [rows] = await pool.query(`SELECT id, name, goal, status, 
      DATE_FORMAT(next_session, '%d %b %Y') AS nextSession, score, engagement, avatar_url
      FROM clients ORDER BY id DESC`);
    const mapped = rows.map((r) => ({
      ...r,
      statusLabel: statusLabel(r.status)
    }));
    res.json(mapped);
  } catch (err) {
    console.error('Error /api/clients', err);
    res.status(500).json({ message: 'Error obteniendo clientes' });
  }
});

app.get('/api/sessions', async (_req, res) => {
  try {
    const [rows] = await pool.query(`SELECT s.id, c.name AS client, s.topic,
      DATE_FORMAT(s.date, '%d %b %Y') AS date, TIME_FORMAT(s.time, '%H:%i') AS time, s.status
      FROM sessions s JOIN clients c ON s.client_id = c.id
      ORDER BY s.date, s.time`);
    res.json(rows);
  } catch (err) {
    console.error('Error /api/sessions', err);
    res.status(500).json({ message: 'Error obteniendo sesiones' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  try {
    const [rows] = await pool.query(`SELECT c.name, DATE_FORMAT(s.date, '%d %b %Y') AS date, TIME_FORMAT(s.time, '%H:%i') AS time
      FROM sessions s JOIN clients c ON s.client_id = c.id
      WHERE s.date >= CURDATE()
      ORDER BY s.date, s.time LIMIT 1`);
    const next = rows[0];
    const reply = next
      ? `Entendido. Próxima sesión con ${next.name} el ${next.date} a las ${next.time}.`
      : 'Entendido. No encuentro sesiones próximas, ¿quieres agendar una?';
    res.json({ reply, echo: message });
  } catch (err) {
    console.error('Error /api/chat', err);
    res.status(500).json({ reply: 'No pude consultar la agenda ahora.' });
  }
});

function statusLabel(status) {
  return status === 'activo' ? 'Activo' : status === 'riesgo' ? 'En riesgo' : 'Inactivo';
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listo en http://localhost:${port}`));
