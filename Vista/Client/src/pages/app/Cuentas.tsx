import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/cuentas.php';

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

export default function GestionCuentasPublicitarias() {
  const [cuentas, setCuentas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [cuentaActual, setCuentaActual] = useState({
    cue_id: '',
    cue_cli_id: '',
    cue_pla_id: '',
    cue_nombre: '',
    cue_id_externo: '',
    cue_access_token: '',
    cue_estado: 'Activa'
  });

  const estados = ['Activa','Desconectada','Error','Pausada'];

  useEffect(() => {
    cargarCuentas();
    cargarClientes();
    cargarPlataformas();
  }, []);

  const cargarCuentas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setCuentas(data);
    } catch {
      alert('Error al cargar cuentas');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    setClientes([
      { cli_id: 1, cli_nombre_empresa: 'Cliente Demo 1' },
      { cli_id: 2, cli_nombre_empresa: 'Cliente Demo 2' }
    ]);
  };

  const cargarPlataformas = async () => {
    setPlataformas([
      { pla_id: 1, pla_nombre: 'Facebook Ads' },
      { pla_id: 2, pla_nombre: 'Google Ads' },
      { pla_id: 3, pla_nombre: 'TikTok Ads' }
    ]);
  };

  const abrirModal = (c = null) => {
    if (c) {
      setModoEdicion(true);
      setCuentaActual({ ...c });
    } else {
      setModoEdicion(false);
      setCuentaActual({
        cue_id: '',
        cue_cli_id: '',
        cue_pla_id: '',
        cue_nombre: '',
        cue_id_externo: '',
        cue_access_token: '',
        cue_estado: 'Activa'
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCuentaActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarCuenta = async () => {
  if (!cuentaActual.cue_nombre || !cuentaActual.cue_cli_id || !cuentaActual.cue_pla_id) {
    alert('Completa los campos obligatorios');
    return;
  }

  try {
    const url = modoEdicion
      ? `${API_URL}?actualizar=${cuentaActual.cue_id}`
      : `${API_URL}?insertar`;

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuentaActual)
    });

    const data = await res.json();

    if (data.success === 1) {
      alert(data.message);
      cerrarModal();
      cargarCuentas();
    } else {
      alert(data.message || "Error al guardar");
    }
  } catch {
    alert("Error al guardar cuenta");
  }
};

const eliminarCuenta = async (id) => {
  if (!window.confirm("¿Eliminar esta cuenta?")) return;
  try {
    const res = await fetch(`${API_URL}?borrar=${id}`);
    const data = await res.json();
    if (data.success === 1) {
      alert(data.message);
      cargarCuentas();
    } else {
      alert("Error al eliminar");
    }
  } catch {
    alert("Error al eliminar");
  }
};


  const cuentasFiltradas = cuentas.filter(c =>
    c.cue_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Cuentas Publicitarias</h1>
            <p className="text-gray-500">Gestión por cliente y plataforma</p>
          </div>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nueva Cuenta
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar cuenta..."
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
                <th>Cliente</th>
                <th>Plataforma</th>
                <th>ID Externo</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {cuentasFiltradas.map((c) => (
                <tr key={c.cue_id} className="border-t">
                  <td className="p-3">{c.cue_nombre}</td>
                  <td>{c.cli_nombre_empresa || c.cue_cli_id}</td>
                  <td>{c.pla_nombre || c.cue_pla_id}</td>
                  <td>{c.cue_id_externo}</td>
                  <td>{c.cue_estado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(c)}><EditIcon /></button>
                    <button onClick={() => eliminarCuenta(c.cue_id)} className="text-red-600">
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
            <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>

            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? 'Editar Cuenta' : 'Nueva Cuenta'}
            </h2>

            <div className="space-y-3">

              <input name="cue_nombre" placeholder="Nombre de la cuenta *"
                value={cuentaActual.cue_nombre} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="cue_cli_id" value={cuentaActual.cue_cli_id} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                <option value="">Seleccione Cliente *</option>
                {clientes.map(c => (
                  <option key={c.cli_id} value={c.cli_id}>{c.cli_nombre_empresa}</option>
                ))}
              </select>

              <select name="cue_pla_id" value={cuentaActual.cue_pla_id} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                <option value="">Seleccione Plataforma *</option>
                {plataformas.map(p => (
                  <option key={p.pla_id} value={p.pla_id}>{p.pla_nombre}</option>
                ))}
              </select>

              <input name="cue_id_externo" placeholder="ID Externo en la plataforma *"
                value={cuentaActual.cue_id_externo} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <textarea name="cue_access_token" placeholder="Access Token (encriptado u opcional)"
                value={cuentaActual.cue_access_token} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="cue_estado" value={cuentaActual.cue_estado} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {estados.map(e => <option key={e} value={e}>{e}</option>)}
              </select>

              <button onClick={guardarCuenta}
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
