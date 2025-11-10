import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiBriefcase, FiAward, FiPieChart } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  const menuItems = [
    { name: "Inicio", path: "/", icon: <FiHome /> },
    { name: "Servicios", path: "/servicios", icon: <FiBriefcase /> },
    { name: "Por qué elegirnos", path: "/por-que-elegirnos", icon: <FiAward /> },
    { name: "Premios", path: "/premios", icon: <FiAward /> },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-lg shadow-lg border-b border-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
            >
              <span className="text-white font-bold text-xl">V</span>
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Vision 360
              </h1>
              <p className="text-xs text-gray-500">Marketing Digital</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-200 flex items-center gap-2 group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-5 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <FiUser className="text-lg" />
                  <span className="font-medium">{user.name}</span>
                </button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-indigo-100 overflow-hidden"
                    >
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-indigo-50 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <FiPieChart className="text-indigo-600" />
                        <span className="font-medium text-gray-700">Dashboard</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-50 transition-colors text-left border-t border-gray-100"
                      >
                        <FiLogOut className="text-red-600" />
                        <span className="font-medium text-red-600">Cerrar Sesión</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors px-4 py-2"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-semibold"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-700 hover:text-indigo-600 transition-colors"
          >
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-indigo-100"
          >
            <div className="px-4 py-6 space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={toggleMenu}
                  className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium transition-colors py-2"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-gray-200 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={toggleMenu}
                      className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 font-medium py-2"
                    >
                      <FiPieChart />
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMenu();
                      }}
                      className="w-full flex items-center gap-3 text-red-600 font-medium py-2"
                    >
                      <FiLogOut />
                      Cerrar Sesión
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={toggleMenu}
                      className="block text-center text-indigo-600 font-semibold py-2 border border-indigo-600 rounded-full hover:bg-indigo-50 transition-colors"
                    >
                      Iniciar Sesión
                    </Link>
                    <Link
                      to="/register"
                      onClick={toggleMenu}
                      className="block text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2.5 rounded-full font-semibold shadow-lg"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}