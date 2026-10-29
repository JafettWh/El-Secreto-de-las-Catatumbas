import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Sparkles, X } from 'lucide-react';
import SQLBuilder from '../molecules/SQLBuilder.jsx';
import Button from '../atoms/Button.jsx';
import { useSQLRunner } from '../../hooks/useSQLRunner.js';

export default function SQLEditorModal({ level, onClose, onSuccess, play }) {
  const [selections, setSelections] = useState(() => level.parts.map(() => ''));
  const [feedback, setFeedback] = useState(null);
  const { run } = useSQLRunner();
  const choose = (index, value) => { setSelections((current) => current.map((item, position) => position === index ? value : item)); setFeedback(null); };
  const castSpell = () => {
    const result = run(level, selections);
    if (result.correct) {
      play('magic'); setFeedback({ type: 'success', text: '¡Hechizo perfecto! La puerta reconoce tu consulta.' });
      window.setTimeout(onSuccess, 900);
    } else {
      play('error'); setFeedback({ type: 'error', text: `La cláusula ${result.missing + 1} aún no encaja. Prueba otro bloque.` });
    }
  };
  const query = selections.map((item) => item || '▁▁▁').join('\n');
  return <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <motion.section className="panel-modal sql-modal" role="dialog" aria-modal="true" aria-labelledby="sql-title" initial={{ opacity: 0, scale: 0.96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
      <button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
      <div className="modal-kicker"><span className="rune-orb">ᛟ</span><span>DESAFÍO RÚNICO · NIVEL {level.id}</span></div>
      <h2 id="sql-title">{level.door}</h2><p className="modal-intro">El guardián susurra: «Ordena las palabras mágicas para abrir el paso».</p>
      <div className="sql-workbench"><div className="builder-area"><SQLBuilder level={level} selections={selections} onSelect={choose} /></div>
        <aside className="query-preview"><span className="preview-label">TU CONSULTA</span><pre>{query}</pre><div className="preview-note"><span>✦</span> Cada pieza ocupa su propio renglón</div></aside></div>
      <AnimatePresence>{feedback && <motion.p className={`spell-feedback spell-feedback--${feedback.type}`} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0 }}>{feedback.text}</motion.p>}</AnimatePresence>
      <div className="modal-actions"><Button variant="quiet" onClick={onClose}><BookOpen size={15} /> Volver al mapa</Button><Button onClick={castSpell}><Sparkles size={16} /> Lanzar hechizo</Button></div>
    </motion.section>
  </div>;
}