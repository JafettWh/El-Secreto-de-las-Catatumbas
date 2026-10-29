export default function StatCard({ label, value, icon, tone = 'mint' }) {
  return <div className={`stat-card stat-card--${tone}`}><span className="stat-icon">{icon}</span><div><span className="stat-label">{label}</span><strong>{value}</strong></div></div>;
}