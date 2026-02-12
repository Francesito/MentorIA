import { useEffect, useState } from 'react';
import axios from 'axios';
import { sampleSessions } from '../data/mock';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/sessions').then(({ data }) => {
      setSessions(data);
      setLoading(false);
    }).catch(() => {
      setSessions(sampleSessions);
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

      {loading ? 'Cargando...' : (
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
