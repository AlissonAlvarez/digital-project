interface CardServiceProps {
  title: string;
  description: string;
  icon: string;
}

export default function CardService({ title, description, icon }: CardServiceProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-soft hover:shadow-md transition">
      <img src={icon} alt={title} className="w-14 h-14 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
      <p className="text-muted-text">{description}</p>
    </div>
  );
}
