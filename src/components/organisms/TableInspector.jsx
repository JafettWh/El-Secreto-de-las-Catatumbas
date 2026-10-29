import { X } from 'lucide-react';
import { databaseSchema } from '../../data/databaseSchema.js';

export default function TableInspector({ onClose }) {
  return <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="panel-modal inspector-modal" role="dialog" aria-modal="true" aria-labelledby="inspector-title">
    <button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X size={20} /></button><span className="eyebrow">ARCHIVO DE LA ACADEMIA</span><h2 id="inspector-title">Tablas encontradas</h2>
    <div className="schema-list">{databaseSchema.map((table) => <article className="schema-table" key={table.name}>
      <header><span>{table.icon}</span><div><h3>{table.name}</h3><p>{table.description}</p></div></header>
      <div className="schema-columns">{table.columns.map(([name, type]) => <span className="schema-column" key={name}><b>{name}</b><small>{type}</small></span>)}</div>
      <div className="data-preview"><span className="preview-label">REGISTROS</span>{table.rows.slice(0, 2).map((row, index) => <code key={index}>{row.join(' · ')}</code>)}</div>
    </article>)}</div>
  </section></div>;
}