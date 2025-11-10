import { motion } from "framer-motion";

const services = [
  {
    title: "Google Ads",
    desc: "Campañas publicitarias con resultados medibles.",
    icon: "https://cdn-icons-png.flaticon.com/512/888/888853.png",
  },
  {
    title: "SEO",
    desc: "Posicionamiento orgánico para destacar en los buscadores.",
    icon: "https://cdn-icons-png.flaticon.com/512/2103/2103665.png",
  },
  {
    title: "Redes Sociales",
    desc: "Gestión creativa y estratégica de tus redes sociales.",
    icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png",
  },
];

export default function Servicios() {
  return (
    <section className="services">
      <h2>Nuestros Servicios</h2>
      <div className="grid gap-10 md:grid-cols-3">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            className="service-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <img src={s.icon} alt={s.title} />
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
