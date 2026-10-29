import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import Button from '../components/atoms/Button.jsx';
import { useGame } from '../context/GameContext.jsx';

export default function VictoryScreen({ onHome }) {
  const { inventory } = useGame();
  useEffect(() => { confetti({ particleCount: 110, spread: 75, origin: { y: 0.62 }, colors: ['#86f0be', '#f5c65d', '#ff806b', '#7bd5e7'], disableForReducedMotion: true }); }, []);
  return <main className="victory-screen"><motion.div className="victory-rune" initial={{ scale: 0.5, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring' }}>ᛟ</motion.div><span className="eyebrow">LAS CATACUMBAS TE RECUERDAN</span><h1>¡Archivo<br />descubierto!</h1><p>Has unido las tres tablas y devuelto la luz a la academia. SQL ya es parte de tu magia.</p><div className="victory-stats"><span><Sparkles size={16} /> 4 hechizos aprendidos</span><span>🎒 {inventory.length} tesoros hallados</span></div><Button onClick={onHome}><RotateCcw size={16} /> Volver al inicio <ArrowRight size={16} /></Button></main>;
}