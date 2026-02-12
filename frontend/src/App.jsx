import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Sessions from './components/Sessions';
import Chatbot from './components/Chatbot';
import Settings from './components/Settings';

const App = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data } = await axios.get('/api/metrics');
        setMetrics(data);
      } catch (err) {
        setError('No se pudo conectar al backend. Revisa el servicio en puerto 4000.');
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Topbar />
        {loading && <div className="panel">Cargando métricas...</div>}
        {!loading && error && <div className="panel error">{error}</div>}
        {!loading && !error && metrics && (
          <Routes>
            <Route path="/" element={<Dashboard metrics={metrics} />} />
            <Route path="/clientes" element={<Clients />} />
            <Route path="/sesiones" element={<Sessions />} />
            <Route path="/chat" element={<Chatbot />} />
            <Route path="/ajustes" element={<Settings />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
