import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/clientes.php';

// SVG Icons (igual que antes)
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

export default function GestionClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);

  const [clienteActual, setClienteActual] = useState({
  cli_id: '',
  cli_nombre_empresa: '',
  cli_razon_social: '',
  cli_nit: '',
  cli_industria: '',
  cli_email_contacto: '',
  cli_telefono: '',
  cli_direccion: '',
  cli_ciudad: '',
  cli_pais: '',
  cli_sitio_web: '',
  cli_tipo_plan: '',
  cli_estado: 'Activo'
});


  const estados = ['Activo', 'Inactivo'];

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setClientes(data);
      }
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const abrirModal = (cliente = null) => {
    if (cliente) {
      setModoEdicion(true);
      setClienteActual({ ...cliente });
    } else {
      setModoEdicion(false);
      setClienteActual({
      cli_id: '',
      cli_nombre_empresa: '',
      cli_razon_social: '',
      cli_nit: '',
      cli_industria: '',
      cli_email_contacto: '',
      cli_telefono: '',
      cli_direccion: '',
      cli_ciudad: '',
      cli_pais: '',
      cli_sitio_web: '',
      cli_tipo_plan: '',
      cli_estado: 'Activo'
    });
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => setModalAbierto(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClienteActual(prev => ({ ...prev, [name]: value }));
  };

  const guardarCliente = async () => {
      if (!clienteActual.cli_nombre_empresa || !clienteActual.cli_email_contacto || !clienteActual.cli_nit) {
        alert('Empresa, email y NIT son obligatorios');
        return;
      }

    try {
      const url = modoEdicion
        ? `${API_URL}?actualizar=${clienteActual.cli_id}`
        : `${API_URL}?insertar`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(clienteActual)
      });

      const data = await response.json();

      if (data.success === 1) {
        alert(data.message || 'Guardado correctamente');
        cerrarModal();
        cargarClientes();
      } else {
        alert(data.message || 'Error al guardar');
      }
    } catch (error) {
      console.error(error);
      alert('Error al guardar el cliente');
    }
  };

  const eliminarCliente = async (id) => {
    if (!window.confirm('¿Eliminar este cliente?')) return;
    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      if (data.success === 1) {
        alert('Eliminado correctamente');
        cargarClientes();
      }
    } catch {
      alert('Error al eliminar');
    }
  };

  const clientesFiltrados = clientes.filter(c =>
    c.cli_nombre_empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.cli_contacto?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Gestión de Clientes</h1>
            <p className="text-gray-500">Listado y administración</p>
          </div>
          <button
            onClick={() => abrirModal()}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
          >
            <PlusIcon /> Nuevo Cliente
          </button>
        </div>

        <div className="relative mt-4">
          <div className="absolute left-3 top-2.5 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Buscar cliente..."
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
                <th className="p-3">Empresa</th>
                <th>Contacto</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientesFiltrados.map((c) => (
                <tr key={c.cli_id} className="border-t">
                  <td className="p-3">{c.cli_nombre_empresa}</td>
                  <td>{c.cli_contacto}</td>
                  <td>{c.cli_email}</td>
                  <td>{c.cli_telefono}</td>
                  <td>{c.cli_estado}</td>
                  <td className="flex gap-2 justify-center p-3">
                    <button onClick={() => abrirModal(c)}><EditIcon /></button>
                    <button onClick={() => eliminarCliente(c.cli_id)} className="text-red-600">
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
              {modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente'}
            </h2>

            <div className="space-y-3">
              <input name="cli_nombre_empresa" placeholder="Nombre empresa *"
                value={clienteActual.cli_nombre_empresa} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_razon_social" placeholder="Razón social"
                value={clienteActual.cli_razon_social} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_nit" placeholder="NIT *"
                value={clienteActual.cli_nit} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_industria" placeholder="Industria"
                value={clienteActual.cli_industria} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input type="email" name="cli_email_contacto" placeholder="Email de contacto *"
                value={clienteActual.cli_email_contacto} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_telefono" placeholder="Teléfono"
                value={clienteActual.cli_telefono} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_direccion" placeholder="Dirección"
                value={clienteActual.cli_direccion} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_ciudad" placeholder="Ciudad"
                value={clienteActual.cli_ciudad} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_pais" placeholder="País"
                value={clienteActual.cli_pais} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_sitio_web" placeholder="Sitio web"
                value={clienteActual.cli_sitio_web} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <input name="cli_tipo_plan" placeholder="Tipo de plan"
                value={clienteActual.cli_tipo_plan} onChange={handleInputChange}
                className="w-full border p-2 rounded" />

              <select name="cli_estado" value={clienteActual.cli_estado} onChange={handleInputChange}
                className="w-full border p-2 rounded">
                {estados.map(e => <option key={e} value={e}>{e}</option>)}
              </select>

              <button onClick={guardarCliente}
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
