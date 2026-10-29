import { useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, X } from 'lucide-react';
import Button from '../components/atoms/Button.jsx';
import { tutorialData } from '../data/tutorialData.js';

export default function TutorialScreen({ onExit, data = tutorialData }) {
  const [page, setPage] = useState(0);
  const lesson = data[page];
  return <section className="grimoire">
    <header className="grimoire-header"><div><span className="eyebrow">EL GRIMORIO DEL APRENDIZ</span><h2><BookOpen size={20} /> Lecciones de magia SQL</h2></div>{onExit && <button className="icon-button grimoire-close" onClick={onExit} aria-label="Salir del tutorial"><X size={20} /></button>}</header>
    <div className="grimoire-body"><aside className="lesson-index">{data.map((item, index) => <button className={index === page ? 'active' : ''} key={item.title} onClick={() => setPage(index)}><span>0{index + 1}</span>{item.title}</button>)}</aside>
      <article className={`lesson-page lesson-page--${lesson.color}`} key={lesson.title}><div className="lesson-illustration"><span>{lesson.icon}</span><i>✦</i><b>✧</b></div><span className="eyebrow">CAPÍTULO {String(page + 1).padStart(2, '0')}</span><h3>{lesson.title}</h3><p>{lesson.text}</p><pre>{lesson.spell}</pre><div className="lesson-progress">{data.map((item, index) => <button key={item.title} className={page === index ? 'active' : ''} aria-label={`Ir a lección ${index + 1}`} onClick={() => setPage(index)} />)}</div></article>
    </div>
    <footer className="grimoire-footer"><span>LECCIÓN {page + 1} DE {data.length}</span><div><Button variant="quiet" disabled={page === 0} onClick={() => setPage((value) => value - 1)}><ArrowLeft size={16} /> Anterior</Button>{page < data.length - 1 ? <Button onClick={() => setPage((value) => value + 1)}>Siguiente <ArrowRight size={16} /></Button> : onExit ? <Button onClick={onExit}>¡A explorar! <ArrowRight size={16} /></Button> : null}</div></footer>
  </section>;
}