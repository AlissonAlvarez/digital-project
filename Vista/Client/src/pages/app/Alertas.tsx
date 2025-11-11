import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/alertas.php';

// --- ICONOS ---
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const PlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);

const EditIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
);

const TrashIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

const XIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const SaveIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
  </svg>
);

export default function GestionAlertas() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [alertaActual, setAlertaActual] = useState({
    ale_id: '',
    ale_cli_id: '',
    ale_nombre: '',
    ale_tipo: 'Presupuesto',
    ale_condicion: '{}',
    ale_destinatarios: '[]',
    ale_metodo: 'Email',
    ale_activa: true
  });

  const tipos = ['Presupuesto','Rendimiento','Conversión','Pausa_Campaña','Error_API'];
  const metodos = ['Email','SMS','Push','In-App'];

  useEffect(() => {
    cargarAlertas();
  }, []);

  const cargarAlertas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setAlertas(data);
    } catch {
      alert('Error al cargar alertas');
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (alerta = null) => {
    if (alerta) {
      setModoEdicion(true);
      setAlertaActual({
        ...alerta,
        ale_activa: alerta.ale_activa === 1 || alerta.ale_activa === true,
      });
    } else {
      setModoEdicion(false);
      setAlertaActual({
        ale_id: '',
        ale_cli_id: '',
        ale_nombre: '',
        ale_tipo: 'Presupuesto',
        ale_condicion: '{}',
        ale_destinatarios: '[]',
        ale_metodo: 'Email',
        ale_activa: true
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAlertaActual(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const guardarAlerta = async () => {
    if (!alertaActual.ale_nombre || !alertaActual.ale_cli_id) {
      alert('Nombre y Cliente son obligatorios');
      return;
    }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${alertaActual.ale_id}`
        : `${API_URL}?insertar`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(alertaActual)
      });

      const data = await response.json();

      if (data.success === 1) {
        alert('Guardado correctamente');
        cerrarModal();
        cargarAlertas();
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch {
      alert('Error al guardar alerta');
    }
  };

  const eliminarAlerta = async (id) => {
    if (!window.confirm('¿Eliminar esta alerta?')) return;
    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      if (data.success === 1) {
        alert('Eliminada correctamente');
        cargarAlertas();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const alertasFiltradas = alertas.filter(a =>
    a.ale_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Alertas</h1>
            <p className="text-gray-500">Listado y administración</p>
          </div>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nueva Alerta
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar alerta..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 border rounded p-2"
          />
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center">Cargando...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Nombre</th>
                <th>Cliente ID</th>
                <th>Tipo</th>
                <th>Método</th>
                <th>Activa</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alertasFiltradas.map((a) => (
                <tr key={a.ale_id} className="border-t">
                  <td className="p-3">{a.ale_nombre}</td>
                  <td>{a.ale_cli_id}</td>
                  <td>{a.ale_tipo}</td>
                  <td>{a.ale_metodo}</td>
                  <td>{a.ale_activa ? "✅" : "❌"}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(a)}><EditIcon /></button>
                    <button onClick={() => eliminarAlerta(a.ale_id)} className="text-red-600">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* MODAL */}
      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>

            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? 'Editar Alerta' : 'Nueva Alerta'}
            </h2>

            <div className="space-y-3">

              <input name="ale_cli_id" placeholder="ID Cliente *"
                value={alertaActual.ale_cli_id} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="ale_nombre" placeholder="Nombre de la alerta *"
                value={alertaActual.ale_nombre} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="ale_tipo" value={alertaActual.ale_tipo} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {tipos.map(t => <option key={t}>{t}</option>)}
              </select>

              <textarea name="ale_condicion" placeholder="Condición JSON"
                value={alertaActual.ale_condicion} onChange={handleInputChange}
                className="w-full border p-2 rounded h-20 font-mono text-sm" />

              <textarea name="ale_destinatarios" placeholder="Destinatarios JSON"
                value={alertaActual.ale_destinatarios} onChange={handleInputChange}
                className="w-full border p-2 rounded h-20 font-mono text-sm" />

              <select name="ale_metodo" value={alertaActual.ale_metodo} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {metodos.map(m => <option key={m}>{m}</option>)}
              </select>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="ale_activa"
                  checked={alertaActual.ale_activa} onChange={handleInputChange} />
                Activa
              </label>

              <button onClick={guardarAlerta}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full p-3 rounded">
                <SaveIcon /> Guardar
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
