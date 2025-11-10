export default function PorQueElegirnos() {
  const razones = [
    "ROI medible y estrategias centradas en resultados.",
    "Escalabilidad para negocios en crecimiento.",
    "Optimización continua con IA y datos en tiempo real.",
    "Equipo experto y soporte permanente.",
  ];

  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-4xl font-bold text-primary mb-8">¿Por qué elegir Vision 360?</h2>
      <ul className="space-y-4 max-w-2xl mx-auto text-lg text-muted-text">
        {razones.map((r, i) => (
          <li key={i} className="p-4 border rounded-xl shadow-sm hover:shadow-md transition">
            ✅ {r}
          </li>
        ))}
      </ul>
    </section>
  );
}
