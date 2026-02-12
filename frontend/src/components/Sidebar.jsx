import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiCalendar, FiMessageCircle, FiSettings } from 'react-icons/fi';

const Sidebar = () => (
  <aside className="sidebar">
    <div className="brand">MentorIA</div>
    <nav>
      <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}><FiHome /> Dashboard</NavLink>
      <NavLink to="/clientes" className={({ isActive }) => isActive ? 'active' : ''}><FiUsers /> Clientes</NavLink>
      <NavLink to="/sesiones" className={({ isActive }) => isActive ? 'active' : ''}><FiCalendar /> Sesiones</NavLink>
      <NavLink to="/chat" className={({ isActive }) => isActive ? 'active' : ''}><FiMessageCircle /> Chatbot</NavLink>
      <NavLink to="/ajustes" className={({ isActive }) => isActive ? 'active' : ''}><FiSettings /> Ajustes</NavLink>
    </nav>
  </aside>
);

export default Sidebar;
