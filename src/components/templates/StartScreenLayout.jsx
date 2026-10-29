export default function StartScreenLayout({ children }) {
  return <main className="start-shell"><div className="start-stars" aria-hidden="true" /><div className="start-content">{children}</div></main>;
}