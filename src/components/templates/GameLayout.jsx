export default function GameLayout({ children, className = '' }) {
  return <main className={`game-shell ${className}`}><div className="cave-backdrop" aria-hidden="true" /><div className="game-content">{children}</div></main>;
}