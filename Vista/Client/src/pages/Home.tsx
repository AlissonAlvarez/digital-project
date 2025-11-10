import { motion } from "framer-motion";
import { FiArrowRight, FiTrendingUp, FiTarget, FiZap } from "react-icons/fi";
import { Link } from "react-router-dom";
import growthImage from "../assets/vision360-growth.png"; // 👈 tu imagen local

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50">
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block mb-4"
              >
                <span className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
                  🚀 Marketing Digital de Alto Impacto
                </span>
              </motion.div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                Impulsa tu negocio con{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Vision 360
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
                Estrategias digitales basadas en datos, creatividad y tecnología para
                maximizar tu ROI y llevar tu marca al siguiente nivel.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  Empezar Ahora
                  <FiArrowRight className="text-xl" />
                </Link>
                <Link
                  to="/servicios"
                  className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-indigo-600"
                >
                  Ver Servicios
                </Link>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="grid grid-cols-3 gap-6 mt-12"
              >
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-indigo-600">500+</p>
                  <p className="text-sm text-gray-600">Clientes Activos</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-purple-600">250%</p>
                  <p className="text-sm text-gray-600">ROI Promedio</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-blue-600">98%</p>
                  <p className="text-sm text-gray-600">Satisfacción</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image - con degradado y efecto flotante */}
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative flex justify-center items-center"
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <motion.img
                  src={growthImage}
                  alt="Marketing Digital Vision 360"
                  className="w-full max-w-lg mx-auto drop-shadow-2xl rounded-2xl bg-gradient-to-tr from-indigo-100 via-purple-100 to-blue-100 p-4"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Por qué elegir Vision 360?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transformamos datos en resultados medibles con tecnología de punta
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiTrendingUp className="text-4xl" />,
                title: "ROI Medible",
                desc: "Resultados comprobables con métricas en tiempo real y optimización continua"
              },
              {
                icon: <FiTarget className="text-4xl" />,
                title: "Estrategia Personalizada",
                desc: "Planes diseñados específicamente para tus objetivos y audiencia"
              },
              {
                icon: <FiZap className="text-4xl" />,
                title: "IA y Automatización",
                desc: "Tecnología avanzada para maximizar tu alcance y conversiones"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-indigo-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
