import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/segmentos.php';

// Iconos SVG (sin cambios)
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

export default function GestionSegmentos() {
  const [segmentos, setSegmentos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [segmentoActual, setSegmentoActual] = useState({
    seg_id: '',
    seg_cli_id: '',
    seg_nombre: '',
    seg_descripcion: '',
    seg_edad_min: '',
    seg_edad_max: '',
    seg_genero: 'Todos',
    seg_ubicaciones: '[]',
    seg_intereses: '[]',
    seg_idiomas: '[]',
    seg_comportamientos: '[]',
    seg_tamano_estimado: ''
  });

  const generos = ['Todos', 'Masculino', 'Femenino', 'Otro'];

  useEffect(() => {
    cargarSegmentos();
    cargarClientes();
  }, []);

  const cargarSegmentos = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setSegmentos(data);
      }
    } catch (error) {
      console.error('Error al cargar segmentos:', error);
      alert('Error cargando segmentos');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    setClientes([
      { cli_id: 1, cli_nombre_empresa: 'Tech Solutions' },
      { cli_id: 2, cli_nombre_empresa: 'Fashion Retail' },
      { cli_id: 3, cli_nombre_empresa: 'Food Express' },
      { cli_id: 4, cli_nombre_empresa: 'Healthy Life' }
    ]);
  };

  const abrirModal = (seg = null) => {
    if (seg) {
      setModoEdicion(true);
      setSegmentoActual({ ...seg });
    } else {
      setModoEdicion(false);
      setSegmentoActual({
        seg_id: '',
        seg_cli_id: '',
        seg_nombre: '',
        seg_descripcion: '',
        seg_edad_min: '',
        seg_edad_max: '',
        seg_genero: 'Todos',
        seg_ubicaciones: '[]',
        seg_intereses: '[]',
        seg_idiomas: '[]',
        seg_comportamientos: '[]',
        seg_tamano_estimado: ''
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSegmentoActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarSegmento = async () => {
    if (!segmentoActual.seg_cli_id || !segmentoActual.seg_nombre) {
      alert('Complete los campos requeridos');
      return;
    }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${segmentoActual.seg_id}`
        : `${API_URL}?insertar`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(segmentoActual)
      });

      const data = await response.json();

      if (data.success === 1) {
        alert(data.message || 'Guardado correctamente');
        cerrarModal();
        cargarSegmentos();
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch {
      alert('Error al guardar segmento');
    }
  };

  const eliminarSegmento = async (id) => {
    if (!window.confirm('¿Eliminar este segmento?')) return;
    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      if (data.success === 1) {
        alert('Eliminado correctamente');
        cargarSegmentos();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const filtrados = segmentos.filter(s =>
    s.seg_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.cli_nombre_empresa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Segmentos</h1>
            <p className="text-gray-500">Audiencias</p>
          </div>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nuevo Segmento
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400"><SearchIcon /></div>
          <input
            type="text"
            placeholder="Buscar segmento..."
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
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Nombre</th>
                <th>Cliente</th>
                <th>Género</th>
                <th>Edades</th>
                <th>Tamaño</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map(s => (
                <tr key={s.seg_id} className="border-t">
                  <td className="p-3">{s.seg_nombre}</td>
                  <td>{s.cli_nombre_empresa}</td>
                  <td>{s.seg_genero}</td>
                  <td>{s.seg_edad_min} - {s.seg_edad_max}</td>
                  <td>{s.seg_tamano_estimado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(s)}><EditIcon /></button>
                    <button onClick={() => eliminarSegmento(s.seg_id)} className="text-red-600">
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
              {modoEdicion ? 'Editar Segmento' : 'Nuevo Segmento'}
            </h2>

            <div className="space-y-3">
              <input name="seg_nombre" placeholder="Nombre segmento *"
                value={segmentoActual.seg_nombre} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <textarea name="seg_descripcion" placeholder="Descripción"
                value={segmentoActual.seg_descripcion} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="seg_cli_id" value={segmentoActual.seg_cli_id} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                <option value="">Seleccione cliente *</option>
                {clientes.map(c => (
                  <option key={c.cli_id} value={c.cli_id}>{c.cli_nombre_empresa}</option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-2">
                <input name="seg_edad_min" type="number" placeholder="Edad mínima"
                  value={segmentoActual.seg_edad_min} onChange={handleInputChange}
                  className="border p-2 rounded" />

                <input name="seg_edad_max" type="number" placeholder="Edad máxima"
                  value={segmentoActual.seg_edad_max} onChange={handleInputChange}
                  className="border p-2 rounded" />
              </div>

              <select name="seg_genero" value={segmentoActual.seg_genero} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {generos.map(g => <option key={g}>{g}</option>)}
              </select>

              <input name="seg_ubicaciones" placeholder='["Colombia","México"]'
                value={segmentoActual.seg_ubicaciones} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="seg_intereses" placeholder='["Tech","Moda"]'
                value={segmentoActual.seg_intereses} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="seg_idiomas" placeholder='["ES","EN"]'
                value={segmentoActual.seg_idiomas} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="seg_comportamientos" placeholder='["Compra frecuente"]'
                value={segmentoActual.seg_comportamientos} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="seg_tamano_estimado" placeholder="Tamaño estimado"
                value={segmentoActual.seg_tamano_estimado} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <button onClick={guardarSegmento}
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
