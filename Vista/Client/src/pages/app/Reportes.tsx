import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/reportes.php';

// ===== ICONOS =====
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

// ===== COMPONENTE =====
export default function GestionReportes() {
  const [reportes, setReportes] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [reporteActual, setReporteActual] = useState({
    rep_id: '',
    rep_cli_id: '',
    rep_nombre: '',
    rep_descripcion: '',
    rep_tipo: 'Diario',
    rep_metricas_incluidas: '[]',
    rep_filtros: '[]',
    rep_formato: 'PDF',
    rep_envio_automatico: false,
    rep_destinatarios_email: '[]',
    rep_estado: 'Activo'
  });

  const tipos = ['Diario','Semanal','Mensual','Personalizado'];
  const formatos = ['PDF','Excel','CSV','Web'];
  const estados = ['Activo','Inactivo'];

  useEffect(() => {
    cargarReportes();
    cargarClientes();
  }, []);

  const cargarReportes = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setReportes(data);
    } catch {
      alert('Error al cargar reportes');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    // Demo, reemplazar por API real
    setClientes([
      { cli_id: 1, cli_nombre_empresa: 'Tech Solutions' },
      { cli_id: 2, cli_nombre_empresa: 'Fashion Retail' }
    ]);
  };

  const abrirModal = (rep = null) => {
    if (rep) {
      setModoEdicion(true);
      setReporteActual({
        ...rep,
        rep_metricas_incluidas: JSON.stringify(rep.rep_metricas_incluidas),
        rep_filtros: JSON.stringify(rep.rep_filtros),
        rep_destinatarios_email: JSON.stringify(rep.rep_destinatarios_email),
        rep_envio_automatico: rep.rep_envio_automatico == 1
      });
    } else {
      setModoEdicion(false);
      setReporteActual({
        rep_id: '',
        rep_cli_id: '',
        rep_nombre: '',
        rep_descripcion: '',
        rep_tipo: 'Diario',
        rep_metricas_incluidas: '[]',
        rep_filtros: '[]',
        rep_formato: 'PDF',
        rep_envio_automatico: false,
        rep_destinatarios_email: '[]',
        rep_estado: 'Activo'
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setReporteActual(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const guardarReporte = async () => {
    if (!reporteActual.rep_cli_id || !reporteActual.rep_nombre) {
      alert('Complete los campos requeridos');
      return;
    }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${reporteActual.rep_id}`
        : `${API_URL}?insertar`;

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reporteActual)
      });

      const data = await res.json();
      if (data.success === 1) {
        alert('Guardado correctamente');
        cerrarModal();
        cargarReportes();
      } else {
        alert(data.message || 'Error');
      }
    } catch {
      alert('Error al guardar');
    }
  };

  const eliminarReporte = async (id) => {
    if (!confirm('¿Eliminar este reporte?')) return;
    try {
      const res = await fetch(`${API_URL}?borrar=${id}`);
      const data = await res.json();
      if (data.success === 1) {
        alert('Eliminado');
        cargarReportes();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const reportesFiltrados = reportes.filter(r =>
    r.rep_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reportes Personalizados</h1>
          <p className="text-gray-500">Gestión de plantillas</p>
        </div>
        <button onClick={() => abrirModal()} className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded">
          <PlusIcon /> Nuevo Reporte
        </button>
      </div>

      {/* BUSCADOR */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-3 text-gray-400"><SearchIcon /></div>
        <input
          className="w-full pl-10 border p-2 rounded"
          placeholder="Buscar reporte..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {/* TABLA */}
      <div className="bg-white shadow rounded-lg overflow-x-auto">
        {loading ? (
          <div className="p-10 text-center">Cargando...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Nombre</th>
                <th>Tipo</th>
                <th>Formato</th>
                <th>Auto Envío</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reportesFiltrados.map(r => (
                <tr key={r.rep_id} className="border-t">
                  <td className="p-3">{r.rep_nombre}</td>
                  <td>{r.rep_tipo}</td>
                  <td>{r.rep_formato}</td>
                  <td>{r.rep_envio_automatico ? 'Sí' : 'No'}</td>
                  <td>{r.rep_estado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(r)}><EditIcon /></button>
                    <button className="text-red-600" onClick={() => eliminarReporte(r.rep_id)}>
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
            <h2 className="text-xl font-bold mb-4">{modoEdicion ? 'Editar' : 'Nuevo'} Reporte</h2>

            <div className="space-y-3">

              <input name="rep_nombre" placeholder="Nombre *" className="w-full border p-2 rounded"
                value={reporteActual.rep_nombre} onChange={handleInputChange} />

              <textarea name="rep_descripcion" placeholder="Descripción" className="w-full border p-2 rounded"
                value={reporteActual.rep_descripcion} onChange={handleInputChange} />

              <select name="rep_cli_id" className="w-full border p-2 rounded"
                value={reporteActual.rep_cli_id} onChange={handleInputChange}>
                <option value="">Seleccione Cliente *</option>
                {clientes.map(c => <option key={c.cli_id} value={c.cli_id}>{c.cli_nombre_empresa}</option>)}
              </select>

              <select name="rep_tipo" className="w-full border p-2 rounded"
                value={reporteActual.rep_tipo} onChange={handleInputChange}>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <input name="rep_metricas_incluidas" placeholder='Métricas (JSON) ej: ["clics","impresiones"]'
                className="w-full border p-2 rounded"
                value={reporteActual.rep_metricas_incluidas} onChange={handleInputChange} />

              <input name="rep_filtros" placeholder='Filtros (JSON)' className="w-full border p-2 rounded"
                value={reporteActual.rep_filtros} onChange={handleInputChange} />

              <select name="rep_formato" className="w-full border p-2 rounded"
                value={reporteActual.rep_formato} onChange={handleInputChange}>
                {formatos.map(f => <option key={f} value={f}>{f}</option>)}
              </select>

              <label className="flex items-center gap-2">
                <input type="checkbox" name="rep_envio_automatico" checked={reporteActual.rep_envio_automatico}
                  onChange={handleInputChange} /> Envío Automático
              </label>

              <input name="rep_destinatarios_email" placeholder='Emails JSON ["a@mail.com","b@mail.com"]'
                className="w-full border p-2 rounded"
                value={reporteActual.rep_destinatarios_email} onChange={handleInputChange} />

              <select name="rep_estado" className="w-full border p-2 rounded"
                value={reporteActual.rep_estado} onChange={handleInputChange}>
                {estados.map(e => <option key={e} value={e}>{e}</option>)}
              </select>

              <button onClick={guardarReporte}
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
