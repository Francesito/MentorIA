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
  // Demo data until DB seeded
  res.json({
    kpis: [
      { label: 'Clientes activos', value: 24, trend: 12 },
      { label: 'Sesiones mes', value: 68, trend: 5 },
      { label: 'NPS', value: 72, trend: -3 }
    ],
    pipeline: [
      { name: 'Ana', engagement: 82 },
      { name: 'Luis', engagement: 75 },
      { name: 'Marta', engagement: 90 },
      { name: 'Carlos', engagement: 65 }
    ],
    goals: [
      { label: 'En curso', value: 18 },
      { label: 'Completados', value: 9 },
      { label: 'En riesgo', value: 5 }
    ],
    sessions: [
      { id: 1, client: 'Ana', topic: 'Liderazgo', date: '12 Feb 2026', time: '10:00' },
      { id: 2, client: 'Luis', topic: 'Productividad', date: '12 Feb 2026', time: '12:00' },
      { id: 3, client: 'Marta', topic: 'Cambio de rol', date: '13 Feb 2026', time: '09:00' }
    ]
  });
});

app.get('/api/clients', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, goal, status, next_session as nextSession, score FROM clients ORDER BY id DESC');
    const mapped = rows.map((r) => ({
      ...r,
      statusLabel: statusLabel(r.status)
    }));
    res.json(mapped);
  } catch (err) {
    console.error(err);
    res.status(200).json(sampleClients());
  }
});

app.get('/api/sessions', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, client, topic, date, time FROM sessions ORDER BY date');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(200).json(sampleSessions());
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  // Aquí se integraría el modelo de IA + n8n webhook
  res.json({ reply: `He recibido: "${message}". Te recuerdo tu próxima sesión el 12 Feb 2026 a las 10:00.` });
});

function statusLabel(status) {
  return status === 'activo' ? 'Activo' : status === 'riesgo' ? 'En riesgo' : 'Inactivo';
}

function sampleClients() {
  return [
    { id: 1, name: 'Ana', goal: 'Liderazgo', status: 'activo', statusLabel: 'Activo', nextSession: '12 Feb 2026', score: 82 },
    { id: 2, name: 'Luis', goal: 'Productividad', status: 'riesgo', statusLabel: 'En riesgo', nextSession: '15 Feb 2026', score: 68 },
    { id: 3, name: 'Marta', goal: 'Cambio de rol', status: 'activo', statusLabel: 'Activo', nextSession: '20 Feb 2026', score: 90 }
  ];
}

function sampleSessions() {
  return [
    { id: 1, client: 'Ana', topic: 'Liderazgo', date: '12 Feb 2026', time: '10:00' },
    { id: 2, client: 'Luis', topic: 'Productividad', date: '12 Feb 2026', time: '12:00' },
    { id: 3, client: 'Marta', topic: 'Cambio de rol', date: '13 Feb 2026', time: '09:00' }
  ];
}

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Backend listo en http://localhost:${port}`));
