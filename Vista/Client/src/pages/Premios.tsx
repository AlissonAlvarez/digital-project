export default function Premios() {
  const premios = [
    { año: 2023, titulo: "Mejor agencia de crecimiento digital", entidad: "Premios Marketing LATAM" },
    { año: 2024, titulo: "Innovación en publicidad con IA", entidad: "Digital Summit Bogotá" },
  ];

  return (
    <section className="py-24 text-center bg-muted">
      <h2 className="text-4xl font-bold text-primary mb-10">Reconocimientos y Premios</h2>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {premios.map((p, i) => (
          <div key={i} className="bg-white shadow-soft p-6 rounded-xl">
            <h3 className="text-2xl font-semibold text-primary">{p.titulo}</h3>
            <p className="text-muted-text">{p.entidad}</p>
            <span className="text-sm text-gray-500">{p.año}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
