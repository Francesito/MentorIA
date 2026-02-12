import { FiBell, FiUser, FiSearch } from 'react-icons/fi';

const Topbar = () => (
  <header className="topbar">
    <div>
      <h1>Panel Mentor</h1>
      <p className="muted">MentorIA · Alto rendimiento con IA</p>
    </div>
    <div className="topbar-actions">
      <div style={{ position: 'relative' }}>
        <FiSearch style={{ position: 'absolute', left: 10, top: 11, color: '#6b7280' }} />
        <input placeholder="Buscar cliente o sesión" style={{ paddingLeft: 32 }} />
      </div>
      <button className="ghost small">Hoy · 12 Feb 2026</button>
      <button className="ghost"><FiBell /></button>
      <div className="avatar">JM</div>
      <FiUser className="muted" />
    </div>
  </header>
);

export default Topbar;
