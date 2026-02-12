import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const colors = ['#2563eb', '#22c55e', '#f59e0b'];

const Dashboard = ({ metrics }) => {
  const { kpis, pipeline, sessions } = metrics;

  return (
    <div className="grid dashboard">
      <section className="panel span-2">
        <h2>Resumen</h2>
        <div className="kpis">
          {kpis.map((item) => (
            <div key={item.label} className="kpi">
              <p className="muted">{item.label}</p>
              <strong>{item.value}</strong>
              <span className={item.trend > 0 ? 'trend up' : 'trend down'}>
                {item.trend > 0 ? '▲' : '▼'} {Math.abs(item.trend)}%
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Engagement por cliente</h3>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={pipeline} margin={{ left: -20 }}>
            <Line type="monotone" dataKey="engagement" stroke="#2563eb" strokeWidth={3} />
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-15} textAnchor="end" height={60} />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="panel">
        <h3>Estado de objetivos</h3>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={metrics.goals} dataKey="value" nameKey="label" label outerRadius={90}>
              {metrics.goals.map((_, index) => (
                <Cell key={index} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

      <section className="panel span-2">
        <h3>Próximas sesiones</h3>
        <ul className="list">
          {sessions.map((s) => (
            <li key={s.id}>
              <div>
                <strong>{s.client}</strong>
                <p className="muted">{s.topic}</p>
              </div>
              <div className="muted">{s.date} · {s.time}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
