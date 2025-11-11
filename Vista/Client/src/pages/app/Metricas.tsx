import React, { useState, useEffect } from "react";

const API_URL = "http://localhost/digital-project/api/metricas.php";

// ICONS (Mismos que plantilla)
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

export default function GestionMetricas() {
  const [metricas, setMetricas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [metricaActual, setMetricaActual] = useState({
    met_id: "",
    met_cam_id: "",
    met_anu_id: "",
    met_fecha: "",
    met_hora: "",
    met_impresiones: 0,
    met_alcance: 0,
    met_frecuencia: "",
    met_clicks: 0,
    met_ctr: "",
    met_engagement: 0,
    met_shares: 0,
    met_comentarios: 0,
    met_guardados: 0,
    met_conversiones: 0,
    met_tasa_conversion: "",
    met_valor_conversiones: "",
    met_gasto: 0,
    met_cpc: "",
    met_cpm: "",
    met_cpa: "",
    met_roas: "",
    met_reproducciones_video: "",
    met_porcentaje_visualizacion: "",
  });

  useEffect(() => {
    cargarMetricas();
  }, []);

  const cargarMetricas = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setMetricas(data);
    } catch {
      alert("Error al cargar métricas");
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (metrica = null) => {
    if (metrica) {
      setModoEdicion(true);
      setMetricaActual({ ...metrica });
    } else {
      setModoEdicion(false);
      setMetricaActual({
        met_id: "",
        met_cam_id: "",
        met_anu_id: "",
        met_fecha: "",
        met_hora: "",
        met_impresiones: 0,
        met_alcance: 0,
        met_frecuencia: "",
        met_clicks: 0,
        met_ctr: "",
        met_engagement: 0,
        met_shares: 0,
        met_comentarios: 0,
        met_guardados: 0,
        met_conversiones: 0,
        met_tasa_conversion: "",
        met_valor_conversiones: "",
        met_gasto: 0,
        met_cpc: "",
        met_cpm: "",
        met_cpa: "",
        met_roas: "",
        met_reproducciones_video: "",
        met_porcentaje_visualizacion: "",
      });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetricaActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarMetrica = async () => {
    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${metricaActual.met_id}`
        : `${API_URL}?insertar`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(metricaActual),
      });

      const data = await res.json();
      if (data.success) {
        alert("Guardado correctamente");
        cerrarModal();
        cargarMetricas();
      }
    } catch {
      alert("Error al guardar métrica");
    }
  };

  const eliminarMetrica = async (id) => {
    if (!confirm("¿Eliminar métrica?")) return;
    await fetch(`${API_URL}?borrar=${id}`);
    cargarMetricas();
  };

  const listaFiltrada = metricas.filter(m =>
    m.met_cam_id?.toString().includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Métricas Diarias</h1>
          <button onClick={() => abrirModal()} className="flex gap-2 bg-blue-600 text-white px-4 py-2 rounded">
            <PlusIcon /> Nueva Métrica
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400"><SearchIcon /></div>
          <input
            type="text"
            placeholder="Buscar por ID de campaña..."
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
                <th>Fecha</th>
                <th>Impresiones</th>
                <th>Clicks</th>
                <th>CTR %</th>
                <th>Gasto</th>
                <th>ROAS</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaFiltrada.map(m => (
                <tr key={m.met_id} className="border-t">
                  <td className="p-3">{m.met_cam_id}</td>
                  <td>{m.met_fecha}</td>
                  <td>{m.met_impresiones}</td>
                  <td>{m.met_clicks}</td>
                  <td>{m.met_ctr || 0}%</td>
                  <td>$ {m.met_gasto}</td>
                  <td>{m.met_roas || 0}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(m)}><EditIcon /></button>
                    <button onClick={() => eliminarMetrica(m.met_id)} className="text-red-600"><TrashIcon /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 relative max-h-[90vh] overflow-y-auto">
            <button onClick={cerrarModal} className="absolute right-4 top-4"><XIcon /></button>
            <h2 className="text-xl font-bold mb-4">{modoEdicion ? "Editar Métrica" : "Nueva Métrica"}</h2>

            <div className="grid grid-cols-2 gap-3">
              <input name="met_cam_id" placeholder="ID Campaña *" onChange={handleChange} value={metricaActual.met_cam_id} className="border p-2 rounded" />
              <input name="met_anu_id" placeholder="ID Anuncio (opcional)" onChange={handleChange} value={metricaActual.met_anu_id} className="border p-2 rounded" />
              <input type="date" name="met_fecha" onChange={handleChange} value={metricaActual.met_fecha} className="border p-2 rounded" />
              <input type="time" name="met_hora" onChange={handleChange} value={metricaActual.met_hora} className="border p-2 rounded" />

              {/* Métricas básicas */}
              <input name="met_impresiones" placeholder="Impresiones" onChange={handleChange} value={metricaActual.met_impresiones} className="border p-2 rounded" />
              <input name="met_clicks" placeholder="Clicks" onChange={handleChange} value={metricaActual.met_clicks} className="border p-2 rounded" />
              <input name="met_ctr" placeholder="CTR %" onChange={handleChange} value={metricaActual.met_ctr} className="border p-2 rounded" />
              <input name="met_gasto" placeholder="Gasto" onChange={handleChange} value={metricaActual.met_gasto} className="border p-2 rounded" />
              <input name="met_roas" placeholder="ROAS" onChange={handleChange} value={metricaActual.met_roas} className="border p-2 rounded" />
            </div>

            <button onClick={guardarMetrica} className="mt-4 flex gap-2 bg-blue-600 text-white w-full justify-center p-3 rounded">
              <SaveIcon /> Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
