import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/conversiones.php';

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

export default function GestionConversiones() {
  const [conversiones, setConversiones] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [conversionActual, setConversionActual] = useState({
    con_id: '',
    con_cam_id: '',
    con_anu_id: '',
    con_fecha_hora: '',
    con_tipo: 'Compra',
    con_valor: '',
    con_id_transaccion: '',
    con_origen_trafico: '',
    con_dispositivo: 'Desktop',
    con_ubicacion_geografica: ''
  });

  const tipos = ['Compra', 'Registro', 'Lead', 'Descarga', 'Suscripción', 'Otro'];
  const dispositivos = ['Desktop', 'Mobile', 'Tablet'];

  useEffect(() => {
    cargarConversiones();
    cargarClientes();
    cargarPlataformas();
  }, []);

  const cargarConversiones = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setConversiones(data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar las conversiones');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = () => {
    setClientes([
      { cli_id: 1, cli_nombre_empresa: 'Tech Solutions' },
      { cli_id: 2, cli_nombre_empresa: 'Fashion Retail' },
    ]);
  };

  const cargarPlataformas = () => {
    setPlataformas([
      { pla_id: 1, pla_nombre: 'Facebook' },
      { pla_id: 2, pla_nombre: 'Google Ads' },
    ]);
  };

  const abrirModal = (conversion = null) => {
    if (conversion) {
      setModoEdicion(true);
      setConversionActual(conversion);
    } else {
      setModoEdicion(false);
      setConversionActual({
        con_id: '',
        con_cam_id: '',
        con_anu_id: '',
        con_fecha_hora: '',
        con_tipo: 'Compra',
        con_valor: '',
        con_id_transaccion: '',
        con_origen_trafico: '',
        con_dispositivo: 'Desktop',
        con_ubicacion_geografica: ''
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setConversionActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarConversion = async () => {
    if (!conversionActual.con_cam_id || !conversionActual.con_fecha_hora || !conversionActual.con_tipo) {
      alert('Complete los campos requeridos');
      return;
    }

    try {
      const url = modoEdicion 
        ? `${API_URL}?actualizar=${conversionActual.con_id}`
        : `${API_URL}?insertar`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversionActual)
      });

      const data = await res.json();

      if (data.success === 1) {
        alert(data.message);
        cerrarModal();
        cargarConversiones();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar la conversión');
    }
  };

  const eliminarConversion = async (id) => {
    if (!window.confirm('Seguro de eliminar esta conversión?')) return;
    try {
      const res = await fetch(`${API_URL}?borrar=${id}`);
      const data = await res.json();
      if (data.success === 1) {
        alert(data.message);
        cargarConversiones();
      } else {
        alert('Error al eliminar');
      }
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  const conversionesFiltradas = conversiones.filter(c =>
    c.con_id_transaccion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.con_origen_trafico?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.con_tipo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Conversiones</h1>
            <p className="text-gray-500">Listado y administración</p>
          </div>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nueva Conversión
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400"><SearchIcon /></div>
          <input
            type="text"
            placeholder="Buscar conversión..."
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
                <th className="p-3">Campaña</th>
                <th>Anuncio</th>
                <th>Fecha / Hora</th>
                <th>Tipo</th>
                <th>Valor</th>
                <th>ID Transacción</th>
                <th>Dispositivo</th>
                <th>Ubicación</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {conversionesFiltradas.map(c => (
                <tr key={c.con_id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.cam_nombre}</td>
                  <td>{c.anu_nombre}</td>
                  <td>{c.con_fecha_hora}</td>
                  <td>{c.con_tipo}</td>
                  <td>{c.con_valor}</td>
                  <td>{c.con_id_transaccion}</td>
                  <td>{c.con_dispositivo}</td>
                  <td>{c.con_ubicacion_geografica}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(c)} className="text-yellow-500"><EditIcon /></button>
                    <button onClick={() => eliminarConversion(c.con_id)} className="text-red-600"><TrashIcon /></button>
                  </td>
                </tr>
              ))}
              {conversionesFiltradas.length === 0 && <tr><td colSpan="9" className="text-center py-4">No hay conversiones</td></tr>}
            </tbody>
          </table>
        )}
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative max-h-[90vh] overflow-auto">
            <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>

            <h2 className="text-xl font-bold mb-4">{modoEdicion ? 'Editar Conversión' : 'Nueva Conversión'}</h2>

            <div className="space-y-3">
              <select name="con_cam_id" value={conversionActual.con_cam_id} onChange={handleInputChange} className="w-full border p-2 rounded">
                <option value="">Seleccione Campaña</option>
                {clientes.map(c => <option key={c.cli_id} value={c.cli_id}>{c.cli_nombre_empresa}</option>)}
              </select>

              <select name="con_anu_id" value={conversionActual.con_anu_id} onChange={handleInputChange} className="w-full border p-2 rounded">
                <option value="">Seleccione Anuncio</option>
                {plataformas.map(p => <option key={p.pla_id} value={p.pla_id}>{p.pla_nombre}</option>)}
              </select>

              <input name="con_fecha_hora" type="datetime-local" placeholder="Fecha / Hora" value={conversionActual.con_fecha_hora} onChange={handleInputChange} className="w-full border p-2 rounded" />
              <select name="con_tipo" value={conversionActual.con_tipo} onChange={handleInputChange} className="w-full border p-2 rounded">
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <input name="con_valor" type="number" step="0.01" placeholder="Valor" value={conversionActual.con_valor} onChange={handleInputChange} className="w-full border p-2 rounded" />
              <input name="con_id_transaccion" placeholder="ID Transacción" value={conversionActual.con_id_transaccion} onChange={handleInputChange} className="w-full border p-2 rounded" />
              <input name="con_origen_trafico" placeholder="Origen Tráfico" value={conversionActual.con_origen_trafico} onChange={handleInputChange} className="w-full border p-2 rounded" />
              <select name="con_dispositivo" value={conversionActual.con_dispositivo} onChange={handleInputChange} className="w-full border p-2 rounded">
                {dispositivos.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <input name="con_ubicacion_geografica" placeholder="Ubicación" value={conversionActual.con_ubicacion_geografica} onChange={handleInputChange} className="w-full border p-2 rounded" />

              <button onClick={guardarConversion} className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full p-3 rounded">
                <SaveIcon /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
