import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/campanas.php';

// Iconos SVG personalizados (sin cambios)
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

export default function GestionCampanas() {
  const [campanas, setCampanas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [campanaActual, setCampanaActual] = useState({
  cam_id: '',
  cam_cue_id: '',
  cam_nombre: '',
  cam_objetivo: '',
  cam_descripcion: '',
  cam_id_externo: '',
  cam_fecha_inicio: '',
  cam_fecha_fin: '',
  cam_presupuesto_total: '',
  cam_presupuesto_diario: '',
  cam_moneda: 'USD',
  cam_estado: 'Activa'
});



  const estados = ['Activa', 'Pausada', 'Finalizada'];

  useEffect(() => {
    cargarCampanas();
    cargarClientes();
  }, []);

  const cargarCampanas = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCampanas(data);
      }
    } catch (error) {
      console.error('Error al cargar campañas:', error);
      alert('Error al cargar las campañas');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    // Cliente demo, reemplaza por tu API real cuando la tengas
    setClientes([
      { cli_id: 1, cli_nombre_empresa: 'Tech Solutions' },
      { cli_id: 2, cli_nombre_empresa: 'Fashion Retail' },
      { cli_id: 3, cli_nombre_empresa: 'Food Express' },
      { cli_id: 4, cli_nombre_empresa: 'Healthy Life' }
    ]);
  };

  const abrirModal = (campana = null) => {
    if (campana) {
      setModoEdicion(true);
      setCampanaActual({ ...campana });
    } else {
      setModoEdicion(false);
      setCampanaActual({
        cam_id: '',
        cam_cli_id: '',
        cam_nombre: '',
        cam_descripcion: '',
        cam_fecha_inicio: '',
        cam_fecha_fin: '',
        cam_presupuesto: '',
        cam_estado: 'Activa'
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampanaActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarCampana = async () => {
    if (!campanaActual.cam_cue_id || !campanaActual.cam_nombre || !campanaActual.cam_objetivo) {
  alert('Por favor complete los campos requeridos');
  return;
}

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${campanaActual.cam_id}`
        : `${API_URL}?insertar`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campanaActual)
      });

      const data = await response.json();

      if (data.success === 1) {
        alert(data.message || 'Guardado correctamente');
        cerrarModal();
        cargarCampanas();
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar la campaña');
    }
  };

  const eliminarCampana = async (id) => {
    if (!window.confirm('¿Eliminar esta campaña?')) return;
    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      if (data.success === 1) {
        alert('Eliminado correctamente');
        cargarCampanas();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const campanasFiltradas = campanas.filter(c =>
    c.cam_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cli_nombre_empresa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Campañas</h1>
            <p className="text-gray-500">Marketing Digital</p>
          </div>
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <PlusIcon /> Nueva Campaña
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar campaña..."
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
                <th>Cliente</th>
                <th>Inicio</th>
                <th>Fin</th>
                <th>Presupuesto</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {campanasFiltradas.map(c => (
                <tr key={c.cam_id} className="border-t">
                  <td className="p-3">{c.cam_nombre}</td>
                  <td>{c.cli_nombre_empresa}</td>
                  <td>{c.cam_fecha_inicio}</td>
                  <td>{c.cam_fecha_fin}</td>
                  <td>$ {c.cam_presupuesto}</td>
                  <td>{c.cam_estado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(c)}><EditIcon /></button>
                    <button onClick={() => eliminarCampana(c.cam_id)} className="text-red-600">
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
      {/* MODAL */}
{modalAbierto && (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
    <div className="bg-white w-full max-w-lg rounded-lg p-6 relative">
      <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>

      <h2 className="text-xl font-bold mb-4">
        {modoEdicion ? 'Editar Campaña' : 'Nueva Campaña'}
      </h2>

      <div className="space-y-3">

        {/* Nombre */}
        <input name="cam_nombre" placeholder="Nombre campaña *"
          value={campanaActual.cam_nombre} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        {/* Objetivo */}
        <input name="cam_objetivo" placeholder="Objetivo de la campaña *"
          value={campanaActual.cam_objetivo} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        {/* Descripción */}
        <textarea name="cam_descripcion" placeholder="Descripción"
          value={campanaActual.cam_descripcion} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        {/* Cuenta Publicitaria (ANTES cam_cli_id) */}
        <select name="cam_cue_id" value={campanaActual.cam_cue_id} onChange={handleInputChange}
          className="w-full border p-2 rounded">
          <option value="">Seleccione Cuenta Publicitaria *</option>
          {clientes.map(c => (
            <option key={c.cli_id} value={c.cli_id}>{c.cli_nombre_empresa}</option>
          ))}
        </select>

        {/* ID externo (Opcional) */}
        <input name="cam_id_externo" placeholder="ID Externo (Opcional)"
          value={campanaActual.cam_id_externo} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        {/* Fechas */}
        <input type="date" name="cam_fecha_inicio" value={campanaActual.cam_fecha_inicio}
          onChange={handleInputChange} className="w-full border p-2 rounded" />

        <input type="date" name="cam_fecha_fin" value={campanaActual.cam_fecha_fin}
          onChange={handleInputChange} className="w-full border p-2 rounded" />

        {/* Presupuestos */}
        <input type="number" name="cam_presupuesto_total" placeholder="Presupuesto Total"
          value={campanaActual.cam_presupuesto_total} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        <input type="number" name="cam_presupuesto_diario" placeholder="Presupuesto Diario"
          value={campanaActual.cam_presupuesto_diario} onChange={handleInputChange}
          className="w-full border p-2 rounded" />

        {/* Moneda */}
        <select name="cam_moneda" value={campanaActual.cam_moneda} onChange={handleInputChange}
          className="w-full border p-2 rounded">
          <option value="USD">USD</option>
          <option value="COP">COP</option>
          <option value="EUR">EUR</option>
        </select>

        {/* Estado */}
        <select name="cam_estado" value={campanaActual.cam_estado} onChange={handleInputChange}
          className="w-full border p-2 rounded">
          {estados.map(e => <option key={e} value={e}>{e}</option>)}
        </select>

        {/* Botón guardar */}
        <button onClick={guardarCampana}
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
