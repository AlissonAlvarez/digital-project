import { Link } from "react-router-dom";

export default function Dashboard() {
  const modules = [
    { name: "Alertas", icon: "⚠️", color: "bg-red-500", path: "/alertas" },
    { name: "Campañas", icon: "📣", color: "bg-blue-500", path: "/campanas" },
    { name: "Anuncios", icon: "🧾", color: "bg-green-500", path: "/anuncios" },
    { name: "Clientes", icon: "👥", color: "bg-purple-500", path: "/clientes" },
    { name: "Conversiones", icon: "💬", color: "bg-yellow-500", path: "/conversiones" },
    { name: "Cuentas Publicitarias", icon: "💼", color: "bg-indigo-500", path: "/cuentas" },
    { name: "Métricas", icon: "📊", color: "bg-teal-500", path: "/metricas" },
    { name: "Plataformas", icon: "🖥️", color: "bg-pink-500", path: "/plataformas" },
    { name: "Reportes Personalizados", icon: "📑", color: "bg-orange-500", path: "/reportes" },
    { name: "Segmentos Audiencias", icon: "🎯", color: "bg-cyan-500", path: "/segmentos" },
    { name: "Usuarios", icon: "👤", color: "bg-gray-500", path: "/usuarios" },
  ];

  return (
    <section className="pt-10 bg-gray-100 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800">🚀 Panel de Control</h2>
        <p className="text-gray-500 mt-2">Gestiona todos los módulos de tu sistema desde un solo lugar</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {modules.map((module, i) =>
          module.path ? (
            // ✅ Si tiene ruta, se convierte en Link (Usuarios)
            <Link to={module.path} key={i}>
              <div className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${module.color}`}>
                  {module.icon}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-700">{module.name}</h3>
                <p className="text-sm text-gray-400 mt-1">Acceder y gestionar información</p>
              </div>
            </Link>
          ) : (
            // ❌ Si no tiene ruta, es una card normal
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-6 cursor-pointer transform transition hover:scale-105 hover:shadow-2xl"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl ${module.color}`}>
                {module.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-700">{module.name}</h3>
              <p className="text-sm text-gray-400 mt-1">Acceder y gestionar información</p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
