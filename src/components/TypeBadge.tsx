import './TypeBadge.css';

interface TypeBadgeProps {
  type: string;
  title: string;
}

export default function TypeBadge({ type, title }: TypeBadgeProps) {
  return (
    <div className="type-badge-container">
      <div className="type-badge">{type}</div>
      <div className="type-title">{title}</div>
    </div>
  );
}
