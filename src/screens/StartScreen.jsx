import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ChevronRight, DoorOpen, Sparkles } from 'lucide-react';
import Button from '../components/atoms/Button.jsx';
import Badge from '../components/atoms/Badge.jsx';
import PixelText from '../components/atoms/PixelText.jsx';
import StartScreenLayout from '../components/templates/StartScreenLayout.jsx';
import TutorialModal from '../components/organisms/TutorialModal.jsx';
import { useGame } from '../context/GameContext.jsx';
import { levels } from '../data/levels.js';
import apprentice from '../assets/apprentice.svg';

export default function StartScreen({ onStart }) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const { unlocked, selectLevel } = useGame();
  return <StartScreenLayout>
    <div className="start-topline"><Badge tone="gold">AVENTURA SQL · EDICIÓN 01</Badge><span className="tiny-status"><span /> SISTEMA LISTO</span></div>
    <section className="title-stage"><div className="title-copy"><PixelText as="span" className="eyebrow">EL ARCHIVO OLVIDADO</PixelText><h1><span>SQL MAGE</span><span className="title-sub">EL SECRETO DE LAS<br />CATACUMBAS</span></h1><p>Un grimorio, cuatro puertas y un hechizo para cada misterio.</p></div>
      <div className="hero-art" aria-label="Mago aprendiz frente a una puerta antigua"><div className="hero-rune">ᛟ</div><div className="hero-torch hero-torch--a">♨</div><div className="hero-torch hero-torch--b">♨</div><motion.img src={apprentice} alt="Mago aprendiz" animate={{ y: [0, -8, 0] }} transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }} /><div className="hero-floor" /></div>
    </section>
    <section className="start-actions" aria-label="Menú principal"><Button onClick={onStart}><DoorOpen size={17} /> Iniciar aventura <ChevronRight size={17} /></Button><Button variant="secondary" onClick={() => setShowTutorial(true)}><BookOpen size={17} /> Aprender hechizos</Button><Button variant="quiet" onClick={() => setShowLevels((value) => !value)}><Sparkles size={17} /> Seleccionar nivel</Button></section>
    {showLevels && <section className="level-select"><div className="level-select-head"><h2>Puertas descubiertas</h2><span>{unlocked} / {levels.length} abiertas</span></div><div className="level-select-list">{levels.map((level, index) => <button key={level.id} disabled={index >= unlocked} onClick={() => { if (selectLevel(index)) onStart(); }}><span className="level-select-number">0{level.id}</span><span>{level.title}</span><span>{index < unlocked ? 'ABIERTO' : 'CERRADO'}</span></button>)}</div></section>}
    <footer className="start-footer"><span>HECHO PARA APRENDICES DE 8+</span><span>WASD / FLECHAS · TOCA PARA EXPLORAR</span></footer>
    {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
  </StartScreenLayout>;
}