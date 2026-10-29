import { X } from 'lucide-react';
import TutorialScreen from '../../screens/TutorialScreen.jsx';

export default function TutorialModal({ onClose }) {
  return <div className="overlay" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="panel-modal tutorial-modal" role="dialog" aria-modal="true" aria-label="Grimorio SQL">
    <button className="icon-button modal-close" onClick={onClose} aria-label="Cerrar"><X size={20} /></button><TutorialScreen data={undefined} onExit={onClose} />
  </section></div>;
}