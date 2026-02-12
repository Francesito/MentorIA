import { FiBell, FiUser } from 'react-icons/fi';

const Topbar = () => (
  <header className="topbar">
    <div>
      <h1>Panel Mentor</h1>
      <p className="muted">Gestión centralizada de clientes y sesiones</p>
    </div>
    <div className="topbar-actions">
      <button className="ghost"><FiBell /></button>
      <div className="avatar">JM</div>
      <FiUser className="muted" />
    </div>
  </header>
);

export default Topbar;
