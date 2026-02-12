const Settings = () => (
  <section className="panel">
    <h2>Ajustes rápidos</h2>
    <div className="form-grid">
      <label>
        URL de webhook n8n
        <input placeholder="https://mi-n8n/hooks/mentoria" />
      </label>
      <label>
        Clave API de IA
        <input type="password" placeholder="sk-..." />
      </label>
      <label>
        Recordatorios automáticos (días)
        <input type="number" min="1" defaultValue="3" />
      </label>
      <label>
        Límite de clientes activos
        <input type="number" min="1" defaultValue="25" />
      </label>
    </div>
    <button className="primary">Guardar</button>
  </section>
);

export default Settings;
