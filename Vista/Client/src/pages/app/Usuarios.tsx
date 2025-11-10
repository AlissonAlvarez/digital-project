import React, { useEffect, useState } from "react";

interface Usuario {
  codusuario: string;
  usunombre: string;
  usucontrasena: string;
  usuidpersona: string;
}

const Usuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [busqueda, setBusqueda] = useState("");
  const [pagina, setPagina] = useState(1);
  const [porPagina] = useState(10);

  // 🔹 Cargar datos desde el backend PHP
  const obtenerUsuarios = async () => {
    try {
      const res = await fetch(
        "http://localhost/usuarios"
      );
      const data = await res.json();
      setUsuarios(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // 🔹 Filtrar usuarios
  const usuariosFiltrados = usuarios.filter((u) =>
    u.usunombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 🔹 Paginación
  const totalPaginas = Math.ceil(usuariosFiltrados.length / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const fin = inicio + porPagina;
  const usuariosPagina = usuariosFiltrados.slice(inicio, fin);

  // 🔹 Eliminar usuario
  const eliminarUsuario = async (id: string) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      await fetch(
        `http://localhost/proyecto/Controlador/Controlador.php?accion=usuarios_eliminar&id=${id}`
      );
      obtenerUsuarios();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b p-6 gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-blue-600">👥</span> Lista de Usuarios
            </h2>
            <p className="text-gray-500 text-sm">
              Administra todos los usuarios registrados en el sistema
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => (window.location.href = "/modulos")}
              className="px-4 py-2 rounded-full border text-gray-700 hover:bg-gray-100 transition"
            >
              🗂 Módulos
            </button>
            <button
              onClick={() => (window.location.href = "/usuarios/crear")}
              className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              ➕ Nuevo Usuario
            </button>
            <button
              onClick={() =>
                window.open(
                  "http://localhost/proyecto/Controlador/Controlador.php?accion=usuarios_pdf",
                  "_blank"
                )
              }
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              📄 Exportar PDF
            </button>
          </div>
        </div>

        {/* Buscador */}
        <div className="p-6 border-b flex justify-end">
          <div className="relative w-full sm:w-1/3">
            <input
              type="text"
              placeholder="Buscar usuario..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 uppercase text-gray-500 text-xs">
              <tr>
                <th className="px-6 py-3 text-left">Código</th>
                <th className="px-6 py-3 text-left">Nombre</th>
                <th className="px-6 py-3 text-left">Contraseña</th>
                <th className="px-6 py-3 text-left">Identificación</th>
                <th className="px-6 py-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {usuariosPagina.map((u) => (
                <tr key={u.codusuario} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-medium">{u.codusuario}</td>
                  <td className="px-6 py-3 capitalize">{u.usunombre}</td>
                  <td className="px-6 py-3">
                    <span className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 text-xs">
                      {u.usucontrasena}
                    </span>
                  </td>
                  <td className="px-6 py-3">{u.usuidpersona}</td>
                  <td className="px-6 py-3 text-center flex justify-center gap-2">
                    <button
                      onClick={() =>
                        (window.location.href = `/usuarios/ver/${u.codusuario}`)
                      }
                      className="p-2 rounded-full border border-blue-500 text-blue-600 hover:bg-blue-50"
                      title="Ver"
                    >
                      👁
                    </button>
                    <button
                      onClick={() =>
                        (window.location.href = `/usuarios/editar/${u.codusuario}`)
                      }
                      className="p-2 rounded-full border border-green-500 text-green-600 hover:bg-green-50"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u.codusuario)}
                      className="p-2 rounded-full border border-red-500 text-red-600 hover:bg-red-50"
                      title="Eliminar"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
              {usuariosPagina.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    No se encontraron usuarios.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Paginación */}
        <div className="flex justify-center items-center gap-2 p-6 border-t bg-gray-50">
          <button
            disabled={pagina === 1}
            onClick={() => setPagina(pagina - 1)}
            className={`px-3 py-1 rounded ${
              pagina === 1
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ←
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPagina(num)}
              className={`px-3 py-1 rounded ${
                pagina === num
                  ? "bg-blue-600 text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            disabled={pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
            className={`px-3 py-1 rounded ${
              pagina === totalPaginas
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
