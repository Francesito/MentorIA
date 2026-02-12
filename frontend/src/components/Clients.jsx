import { useEffect, useState } from 'react';
import axios from 'axios';
import { sampleClients } from '../data/mock';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/clients').then(({ data }) => {
      setClients(data);
      setLoading(false);
    }).catch(() => {
      setClients(sampleClients);
      setLoading(false);
    });
  }, []);

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Clientes</h2>
          <p className="muted">CRM especializado para mentoría</p>
        </div>
        <button className="primary">Nuevo cliente</button>
      </div>

      {loading ? 'Cargando...' : (
        <div className="table">
          <div className="table-head">
            <span>Nombre</span><span>Objetivo</span><span>Estado</span><span>Próxima sesión</span><span>Score IA</span>
          </div>
          {clients.map((c) => (
            <div key={c.id} className="table-row">
              <span>{c.name}</span>
              <span>{c.goal}</span>
              <span className={`pill ${c.status}`}>{c.statusLabel}</span>
              <span>{c.nextSession}</span>
              <span>{c.score}/100</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Clients;
