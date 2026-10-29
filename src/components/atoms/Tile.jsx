export default function Tile({ type, children, className = '' }) {
  return <div className={`maze-tile maze-tile--${type} ${className}`}>{children}</div>;
}