import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost/digital-project/api/usuarios.php';

// Iconos SVG personalizados
const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const UserPlusIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
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

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState({
    usu_id: '',
    usu_cli_id: '',
    usu_nombre: '',
    usu_apellido: '',
    usu_email: '',
    usu_password: '',
    usu_rol: 'Visualizador',
    usu_telefono: '',
    usu_estado: 'Activo'
  });

  const roles = ['Administrador', 'Gerente Marketing', 'Analista', 'Visualizador'];
  const estados = ['Activo', 'Inactivo', 'Bloqueado'];

  useEffect(() => {
    cargarUsuarios();
    cargarClientes();
  }, []);

  const cargarUsuarios = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsuarios(data);
      }
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Error al cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const cargarClientes = async () => {
    try {
      const clientesDemo = [
        { cli_id: 1, cli_nombre_empresa: 'Tech Solutions' },
        { cli_id: 2, cli_nombre_empresa: 'Fashion Retail' },
        { cli_id: 3, cli_nombre_empresa: 'Food Express' },
        { cli_id: 4, cli_nombre_empresa: 'Healthy Life' }
      ];
      setClientes(clientesDemo);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setModoEdicion(true);
      setUsuarioActual({
        ...usuario,
        usu_password: ''
      });
    } else {
      setModoEdicion(false);
      setUsuarioActual({
        usu_id: '',
        usu_cli_id: '',
        usu_nombre: '',
        usu_apellido: '',
        usu_email: '',
        usu_password: '',
        usu_rol: 'Visualizador',
        usu_telefono: '',
        usu_estado: 'Activo'
      });
    }
    setModalAbierto(true);
    setMostrarPassword(false);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setUsuarioActual({
      usu_id: '',
      usu_cli_id: '',
      usu_nombre: '',
      usu_apellido: '',
      usu_email: '',
      usu_password: '',
      usu_rol: 'Visualizador',
      usu_telefono: '',
      usu_estado: 'Activo'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuarioActual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const guardarUsuario = async () => {
    if (!usuarioActual.usu_cli_id || !usuarioActual.usu_nombre || 
        !usuarioActual.usu_apellido || !usuarioActual.usu_email) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }

    if (!modoEdicion && !usuarioActual.usu_password) {
      alert('La contraseña es requerida para nuevos usuarios');
      return;
    }

    try {
      const url = modoEdicion 
        ? `${API_URL}?actualizar=${usuarioActual.usu_id}`
        : `${API_URL}?insertar`;

      const body = { ...usuarioActual };
      
      if (modoEdicion && !usuarioActual.usu_password) {
        delete body.usu_password;
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
      
      if (data.success === 1) {
        alert(data.message || (modoEdicion ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente'));
        cerrarModal();
        cargarUsuarios();
      } else {
        alert(data.message || 'Error al guardar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al guardar el usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar este usuario?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}?borrar=${id}`);
      const data = await response.json();
      
      if (data.success === 1) {
        alert('Usuario eliminado correctamente');
        cargarUsuarios();
      } else {
        alert('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al eliminar el usuario');
    }
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.usu_nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.usu_apellido?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.usu_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    usuario.cli_nombre_empresa?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeColor = (estado) => {
    switch(estado) {
      case 'Activo': return 'bg-green-100 text-green-800';
      case 'Inactivo': return 'bg-gray-100 text-gray-800';
      case 'Bloqueado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRolColor = (rol) => {
    switch(rol) {
      case 'Administrador': return 'bg-purple-100 text-purple-800';
      case 'Gerente Marketing': return 'bg-blue-100 text-blue-800';
      case 'Analista': return 'bg-yellow-100 text-yellow-800';
      case 'Visualizador': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestión de Usuarios</h1>
              <p className="text-gray-500 mt-1">Plataforma Vision360 - Marketing Digital</p>
            </div>
            <button
              onClick={() => abrirModal()}
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
            >
              <UserPlusIcon />
              Nuevo Usuario
            </button>
          </div>

          <div className="mt-6 relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Cargando usuarios...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Empresa</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Rol</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">Teléfono</th>
                    <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {usuariosFiltrados.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No se encontraron usuarios
                      </td>
                    </tr>
                  ) : (
                    usuariosFiltrados.map((usuario) => (
                      <tr key={usuario.usu_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">
                            {usuario.usu_nombre} {usuario.usu_apellido}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{usuario.usu_email}</td>
                        <td className="px-6 py-4 text-gray-600">{usuario.cli_nombre_empresa}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRolColor(usuario.usu_rol)}`}>
                            {usuario.usu_rol}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(usuario.usu_estado)}`}>
                            {usuario.usu_estado}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{usuario.usu_telefono || '-'}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => abrirModal(usuario)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Editar"
                            >
                              <EditIcon />
                            </button>
                            <button
                              onClick={() => eliminarUsuario(usuario.usu_id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Eliminar"
                            >
                              <TrashIcon />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Total Usuarios</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{usuarios.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Usuarios Activos</div>
            <div className="text-3xl font-bold text-green-600 mt-2">
              {usuarios.filter(u => u.usu_estado === 'Activo').length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500">Administradores</div>
            <div className="text-3xl font-bold text-purple-600 mt-2">
              {usuarios.filter(u => u.usu_rol === 'Administrador').length}
            </div>
          </div>
        </div>
      </div>

      {modalAbierto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {modoEdicion ? 'Editar Usuario' : 'Nuevo Usuario'}
              </h2>
              <button
                onClick={cerrarModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XIcon />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="usu_nombre"
                    value={usuarioActual.usu_nombre}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="usu_apellido"
                    value={usuarioActual.usu_apellido}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="usu_email"
                  value={usuarioActual.usu_email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña {!modoEdicion && <span className="text-red-500">*</span>}
                  {modoEdicion && <span className="text-gray-500 text-xs ml-2">(dejar vacío para no cambiar)</span>}
                </label>
                <div className="relative">
                  <input
                    type={mostrarPassword ? "text" : "password"}
                    name="usu_password"
                    value={usuarioActual.usu_password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {mostrarPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Empresa <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="usu_cli_id"
                    value={usuarioActual.usu_cli_id}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Seleccione...</option>
                    {clientes.map(cliente => (
                      <option key={cliente.cli_id} value={cliente.cli_id}>
                        {cliente.cli_nombre_empresa}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    name="usu_telefono"
                    value={usuarioActual.usu_telefono}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rol <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="usu_rol"
                    value={usuarioActual.usu_rol}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {roles.map(rol => (
                      <option key={rol} value={rol}>{rol}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estado <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="usu_estado"
                    value={usuarioActual.usu_estado}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {estados.map(estado => (
                      <option key={estado} value={estado}>{estado}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={guardarUsuario}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors shadow-md"
                >
                  <SaveIcon />
                  {modoEdicion ? 'Actualizar' : 'Guardar'}
                </button>
                <button
                  onClick={cerrarModal}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}