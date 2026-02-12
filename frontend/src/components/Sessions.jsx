import { useEffect, useState } from 'react';
import axios from 'axios';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('/api/sessions').then(({ data }) => {
      setSessions(data);
      setLoading(false);
    }).catch(() => {
      setError('No se pudo cargar sesiones. Revisa el backend y la base de datos.');
      setLoading(false);
    });
  }, []);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Sesiones</h2>
          <p className="muted">Agenda y seguimiento</p>
        </div>
        <button className="ghost">Exportar</button>
      </div>

      {loading && 'Cargando...'}
      {!loading && error && <div className="error">{error}</div>}
      {!loading && !error && (
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
      )}
    </section>
  );
};

export default Sessions;
