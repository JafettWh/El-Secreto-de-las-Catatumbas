export default function Badge({ children, tone = 'mint' }) {
  return <span className={`badge badge--${tone}`}>{children}</span>;
}