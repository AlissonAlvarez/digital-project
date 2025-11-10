import { motion } from "framer-motion";
import Button from "./Button";
import heroImage from "../assets/hero-illustration.svg"; // reemplaza por tu imagen o ilustración

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white py-20">
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        
        {/* === Texto principal === */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight mb-6">
            Impulsa tu negocio con{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Vision 360
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
            Estrategias digitales basadas en datos, creatividad y tecnología para maximizar tu crecimiento y ROI.
          </p>

          {/* === Botones de acción === */}
          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Button variant="primary" size="lg">
              Descubre cómo
            </Button>

            <Button variant="outline" size="lg">
              Contáctanos
            </Button>
          </div>
        </motion.div>

        {/* === Imagen o ilustración === */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <img
            src={heroImage}
            alt="Estrategias digitales Vision 360"
            className="max-w-md md:max-w-lg lg:max-w-xl drop-shadow-xl"
          />
        </motion.div>
      </div>

      {/* === Efecto de fondo degradado circular === */}
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full blur-3xl opacity-50"></div>
    </section>
  );
}
