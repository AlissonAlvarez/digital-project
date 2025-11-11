import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/anuncios.php';

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

export default function GestionAnuncios() {
  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [anuncioActual, setAnuncioActual] = useState({
    anu_id: '',
    anu_cam_id: '',
    anu_nombre: '',
    anu_tipo: 'Imagen',
    anu_titulo: '',
    anu_descripcion: '',
    anu_url_destino: '',
    anu_llamada_accion: '',
    anu_id_externo: '',
    anu_estado: 'Activo'
  });

  const tipos = ['Imagen','Video','Carrusel','Historia','Colección','Texto','Shopping'];
  const estados = ['Activo','Pausado','Revisión','Rechazado','Completado'];

  useEffect(() => {
    cargarAnuncios();
  }, []);

  const cargarAnuncios = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) setAnuncios(data);
    } catch {
      alert('Error al cargar anuncios');
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (anuncio = null) => {
    if (anuncio) {
      setModoEdicion(true);
      setAnuncioActual(anuncio);
    } else {
      setModoEdicion(false);
      setAnuncioActual({
        anu_id: '',
        anu_cam_id: '',
        anu_nombre: '',
        anu_tipo: 'Imagen',
        anu_titulo: '',
        anu_descripcion: '',
        anu_url_destino: '',
        anu_llamada_accion: '',
        anu_id_externo: '',
        anu_estado: 'Activo'
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnuncioActual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarAnuncio = async () => {
    if (!anuncioActual.anu_nombre || !anuncioActual.anu_cam_id) {
      alert('El nombre del anuncio y la campaña son obligatorios');
      return;
    }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${anuncioActual.anu_id}`
        : `${API_URL}?insertar`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(anuncioActual)
      });

      const data = await response.json();

      if (data.success === 1) {
        alert('Guardado correctamente');
        cerrarModal();
        cargarAnuncios();
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch {
      alert('Error al guardar anuncio');
    }
  };

  const eliminarAnuncio = async (id) => {
    if (!window.confirm('¿Eliminar este anuncio?')) return;
    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      if (data.success === 1) {
        alert('Eliminado correctamente');
        cargarAnuncios();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const anunciosFiltrados = anuncios.filter(a =>
    a.anu_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Anuncios</h1>
            <p className="text-gray-500">Listado y administración</p>
          </div>
          <button onClick={() => abrirModal()} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nuevo Anuncio
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar anuncio..."
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
                <th>Campaña ID</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>CTA</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {anunciosFiltrados.map((a) => (
                <tr key={a.anu_id} className="border-t">
                  <td className="p-3">{a.anu_nombre}</td>
                  <td>{a.anu_cam_id}</td>
                  <td>{a.anu_tipo}</td>
                  <td>{a.anu_estado}</td>
                  <td>{a.anu_llamada_accion || '-'}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(a)}><EditIcon /></button>
                    <button onClick={() => eliminarAnuncio(a.anu_id)} className="text-red-600">
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
          <div className="bg-white w-full max-w-lg rounded-lg p-6 relative max-h-[90vh] overflow-auto">
            <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>

            <h2 className="text-xl font-bold mb-4">
              {modoEdicion ? 'Editar Anuncio' : 'Nuevo Anuncio'}
            </h2>

            <div className="space-y-3">

              <input name="anu_cam_id" placeholder="ID Campaña *"
                value={anuncioActual.anu_cam_id} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="anu_nombre" placeholder="Nombre del anuncio *"
                value={anuncioActual.anu_nombre} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="anu_tipo" value={anuncioActual.anu_tipo} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {tipos.map(t => <option key={t}>{t}</option>)}
              </select>

              <input name="anu_titulo" placeholder="Título"
                value={anuncioActual.anu_titulo} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <textarea name="anu_descripcion" placeholder="Descripción"
                value={anuncioActual.anu_descripcion} onChange={handleInputChange}
                className="w-full border p-2 rounded h-20" />

              <input name="anu_url_destino" placeholder="URL destino"
                value={anuncioActual.anu_url_destino} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="anu_llamada_accion" placeholder="Llamada a la acción (Ej: Comprar)"
                value={anuncioActual.anu_llamada_accion} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="anu_id_externo" placeholder="ID Externo (Opcional)"
                value={anuncioActual.anu_id_externo} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="anu_estado" value={anuncioActual.anu_estado} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {estados.map(e => <option key={e}>{e}</option>)}
              </select>

              <button onClick={guardarAnuncio}
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
