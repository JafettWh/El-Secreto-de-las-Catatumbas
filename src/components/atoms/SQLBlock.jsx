export default function SQLBlock({ children, selected, onClick }) {
  return <button className={`sql-block${selected ? ' is-selected' : ''}`} onClick={onClick}><code>{children}</code></button>;
}