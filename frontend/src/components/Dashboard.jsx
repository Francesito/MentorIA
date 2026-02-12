import { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { sampleMetrics } from '../data/mock';

const colors = ['#a3ff12', '#00b0ff', '#f59e0b'];

const Dashboard = ({ metrics }) => {
  const merged = { ...sampleMetrics, ...metrics };
  const { kpis, pipeline, sessions, campaigns, goals, reminders, mood } = merged;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % campaigns.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [campaigns.length]);

  return (
    <div className="dashboard-grid">
      <section className="panel hero span-2">
        <div>
          <p className="eyebrow">Mentoría asistida por IA</p>
          <h1>Impulsa a tus clientes como un coach de alto rendimiento.</h1>
          <p className="muted">Automatiza check-ins, personaliza recomendaciones y mantén el ritmo con alertas inteligentes.</p>
          <div className="hero-actions">
            <button className="primary">Programar sesión</button>
            <button className="ghost">Ver playbooks</button>
          </div>
          <div className="hero-stats">
            {kpis.slice(0, 3).map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
                <small className={item.trend > 0 ? 'trend up' : 'trend down'}>
                  {item.trend > 0 ? '▲' : '▼'} {Math.abs(item.trend)}%
                </small>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-image">
          <div className="badge">AI Coach</div>
          <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80" alt="Coach" />
        </div>
      </section>

      <section className="panel kpi-grid">
        {kpis.map((item) => (
          <div key={item.label} className="kpi-card">
            <div className="kpi-top">
              <p className="muted">{item.label}</p>
              <span className={item.trend > 0 ? 'pill pill-up' : 'pill pill-down'}>
                {item.trend > 0 ? '+' : '-'}{Math.abs(item.trend)}%
              </span>
            </div>
            <h3>{item.value}</h3>
            <div className="kpi-bar">
              <span style={{ width: `${Math.min(100, Math.abs(item.trend) * 2)}%` }} />
            </div>
          </div>
        ))}
      </section>

      <section className="panel carousel">
        <div className="carousel-header">
          <div>
            <p className="eyebrow">Campañas activas</p>
            <h3>Plantillas estilo Nike para tus clientes</h3>
          </div>
          <div className="dots">
            {campaigns.map((_, idx) => (
              <button
                key={idx}
                className={idx === activeSlide ? 'dot active' : 'dot'}
                onClick={() => setActiveSlide(idx)}
              />
            ))}
          </div>
        </div>
        <div className="slides" style={{ '--index': activeSlide }}>
          {campaigns.map((c, idx) => (
            <article key={c.title} className={idx === activeSlide ? 'slide active' : 'slide'}>
              <img src={c.image} alt={c.title} />
              <div className="slide-overlay">
                <span className="pill pill-glow">{c.tag}</span>
                <h4>{c.title}</h4>
                <button className="primary ghosty">{c.cta}</button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Engagement</p>
            <h3>Pulso por cliente</h3>
          </div>
          <span className="muted">Últimos 14 días</span>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={pipeline} margin={{ left: -20 }}>
            <Line type="monotone" dataKey="engagement" stroke="#a3ff12" strokeWidth={3} dot={false} />
            <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <YAxis tick={{ fontSize: 12, fill: '#9ca3af' }} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="panel">
        <p className="eyebrow">Objetivos</p>
        <h3>Estado general</h3>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={goals} dataKey="value" nameKey="label" outerRadius={90} innerRadius={50} paddingAngle={4}>
              {goals.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="panel">
        <p className="eyebrow">Clima</p>
        <h3>Estado emocional reportado</h3>
        <div className="mood-grid">
          {mood.map((m) => (
            <div key={m.label}>
              <div className="mood-top">
                <span>{m.label}</span>
                <span className="muted">{m.value}%</span>
              </div>
              <div className="kpi-bar">
                <span style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="panel reminders">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Acciones rápidas</p>
            <h3>Recordatorios IA</h3>
          </div>
          <button className="ghost small">Ver n8n</button>
        </div>
        <ul className="list">
          {reminders.map((r, idx) => (
            <li key={idx}>
              <div>
                <strong>{r.title}</strong>
                <p className="muted">Generado por IA</p>
              </div>
              <span className="muted">{r.time}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel span-2">
        <div className="panel-header">
          <div>
            <p className="eyebrow">Agenda</p>
            <h3>Próximas sesiones</h3>
          </div>
          <button className="primary">Nueva sesión</button>
        </div>
        <div className="session-grid">
          {sessions.map((s) => (
            <article key={s.id} className="session-card">
              <div>
                <p className="muted">{s.date} · {s.time}</p>
                <h4>{s.client}</h4>
                <p className="muted">{s.topic}</p>
              </div>
              <button className="ghost small">Ver detalle</button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
