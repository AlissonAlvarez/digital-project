import { motion } from "framer-motion";
import { FiMail, FiInstagram, FiLinkedin, FiFacebook, FiTwitter } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 pt-16 pb-8 border-t border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenido principal */}
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          
          {/* Logo y descripción */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="../assets/logo.svg" alt="Vision 360" className="h-8 w-8" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vision 360
              </h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Somos una agencia de marketing digital en Colombia con clientes en toda América y Europa. 
              Combinamos creatividad, datos y tecnología para impulsar tu crecimiento.
            </p>
            <div className="flex gap-4 mt-5">
              <a href="#" className="text-indigo-600 hover:text-purple-600 transition">
                <FiFacebook size={20} />
              </a>
              <a href="#" className="text-indigo-600 hover:text-purple-600 transition">
                <FiInstagram size={20} />
              </a>
              <a href="#" className="text-indigo-600 hover:text-purple-600 transition">
                <FiLinkedin size={20} />
              </a>
              <a href="#" className="text-indigo-600 hover:text-purple-600 transition">
                <FiTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Servicios de Marketing Digital
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-indigo-600 transition">Marketing Digital</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Google Ads</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Posicionamiento SEO</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Redes Sociales</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Automatización IA</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition">Diseño Web</a></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contacto</h3>
            <p className="text-gray-600 mb-3">
              <FiMail className="inline mr-2 text-indigo-600" /> contacto@vision360.com
            </p>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all"
            >
              Contáctanos
            </motion.a>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-indigo-100 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} <span className="font-semibold text-indigo-600">Vision 360</span>. 
            Todos los derechos reservados.
          </p>
        </div>
      </div>

      {/* Decoración animada sutil */}
      <motion.div
        className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full filter blur-3xl opacity-50"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </footer>
  );
}
