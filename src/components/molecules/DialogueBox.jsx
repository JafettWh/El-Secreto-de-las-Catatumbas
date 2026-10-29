import { motion } from 'framer-motion';

export default function DialogueBox({ title, children, icon = '✦' }) {
  return <motion.div className="dialogue-box" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
    <span className="dialogue-icon" aria-hidden="true">{icon}</span><div><h3>{title}</h3><p>{children}</p></div>
  </motion.div>;
}