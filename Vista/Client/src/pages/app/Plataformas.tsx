import React, { useState, useEffect } from "react";

const API_URL = "http://localhost/digital-project/api/plataformas.php";

// Iconos (sin cambios)
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

export default function GestionPlataformas() {
  const [plataformas, setPlataformas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [plataformaActual, setPlataformaActual] = useState({
    pla_id: "",
    pla_nombre: "",
    pla_descripcion: "",
    pla_tipo: "Social Media",
    pla_icono_url: "",
    pla_api_disponible: true,
    pla_estado: "Activa",
  });

  const tipos = ["Social Media", "Search Engine", "Display", "Video", "Email", "Native"];
  const estados = ["Activa", "Mantenimiento", "Descontinuada"];

  useEffect(() => {
    cargarPlataformas();
  }, []);

  const cargarPlataformas = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setPlataformas(data);
    } catch {
      alert("Error al cargar plataformas");
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (plataforma = null) => {
    if (plataforma) {
      setModoEdicion(true);
      setPlataformaActual({ ...plataforma });
    } else {
      setModoEdicion(false);
      setPlataformaActual({
        pla_id: "",
        pla_nombre: "",
        pla_descripcion: "",
        pla_tipo: "Social Media",
        pla_icono_url: "",
        pla_api_disponible: true,
        pla_estado: "Activa",
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPlataformaActual(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const guardarPlataforma = async () => {
    if (!plataformaActual.pla_nombre || !plataformaActual.pla_tipo) {
      alert("Complete los campos obligatorios");
      return;
    }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${plataformaActual.pla_id}`
        : `${API_URL}?insertar`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(plataformaActual),
      });

      const data = await res.json();
      if (data.success) {
        alert("Guardado correctamente");
        cerrarModal();
        cargarPlataformas();
      } else {
        alert(data.message || "Error al guardar");
      }
    } catch {
      alert("Error en la operación");
    }
  };

  const eliminarPlataforma = async (id) => {
    if (!confirm("¿Eliminar esta plataforma?")) return;
    await fetch(`${API_URL}?borrar=${id}`);
    cargarPlataformas();
  };

  const listaFiltrada = plataformas.filter(p =>
    p.pla_nombre?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Plataformas Publicitarias</h1>
            <p className="text-gray-500">Gestión de canales</p>
          </div>
          <button onClick={() => abrirModal()} className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nueva Plataforma
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400"><SearchIcon /></div>
          <input
            type="text"
            placeholder="Buscar plataforma..."
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
                <th>Tipo</th>
                <th>API</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map(p => (
                <tr key={p.pla_id} className="border-t">
                  <td className="p-3 flex items-center gap-2">
                    {p.pla_icono_url && <img src={p.pla_icono_url} className="w-6 h-6 rounded" />}
                    {p.pla_nombre}
                  </td>
                  <td>{p.pla_tipo}</td>
                  <td>{p.pla_api_disponible ? "✅ Sí" : "❌ No"}</td>
                  <td>{p.pla_estado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(p)}><EditIcon /></button>
                    <button onClick={() => eliminarPlataforma(p.pla_id)} className="text-red-600"><TrashIcon /></button>
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
            <h2 className="text-xl font-bold mb-4">{modoEdicion ? "Editar Plataforma" : "Nueva Plataforma"}</h2>

            <div className="space-y-3">
              <input name="pla_nombre" placeholder="Nombre *" onChange={handleChange} value={plataformaActual.pla_nombre} className="w-full border p-2 rounded" />

              <textarea name="pla_descripcion" placeholder="Descripción *" onChange={handleChange} value={plataformaActual.pla_descripcion} className="w-full border p-2 rounded" />

              <select name="pla_tipo" value={plataformaActual.pla_tipo} onChange={handleChange} className="w-full border p-2 rounded">
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>

              <input name="pla_icono_url" placeholder="URL del icono" onChange={handleChange} value={plataformaActual.pla_icono_url} className="w-full border p-2 rounded" />

              <label className="flex items-center gap-2">
                <input type="checkbox" name="pla_api_disponible" checked={plataformaActual.pla_api_disponible} onChange={handleChange} />
                API disponible
              </label>

              <select name="pla_estado" value={plataformaActual.pla_estado} onChange={handleChange} className="w-full border p-2 rounded">
                {estados.map(e => <option key={e} value={e}>{e}</option>)}
              </select>

              <button onClick={guardarPlataforma} className="flex gap-2 bg-blue-600 text-white w-full justify-center p-3 rounded">
                <SaveIcon /> Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
