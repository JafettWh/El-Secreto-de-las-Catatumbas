import { useCallback, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, BookOpen, Database, Home, Map, Volume2, VolumeX } from 'lucide-react';
import GameLayout from '../components/templates/GameLayout.jsx';
import Badge from '../components/atoms/Badge.jsx';
import Button from '../components/atoms/Button.jsx';
import DialogueBox from '../components/molecules/DialogueBox.jsx';
import InventoryBar from '../components/molecules/InventoryBar.jsx';
import StatCard from '../components/molecules/StatCard.jsx';
import MazeGrid from '../components/organisms/MazeGrid.jsx';
import TableInspector from '../components/organisms/TableInspector.jsx';
import SQLEditorModal from '../components/organisms/SQLEditorModal.jsx';
import { useGame } from '../context/GameContext.jsx';
import { useKeyboardMovement } from '../hooks/useKeyboardMovement.js';
import { useAudio } from '../hooks/useAudio.js';
import { levels, maze } from '../data/levels.js';

export default function MazeGameScreen({ onHome, onVictory }) {
  const { levelIndex, player, inventory, tiles, collected, movePlayer, collectAt, completeLevel } = useGame();
  const [modal, setModal] = useState(null);
  const [soundOn, setSoundOn] = useState(true);
  const { play: rawPlay } = useAudio();
  const level = levels[levelIndex];
  const play = useCallback((kind) => { if (soundOn) rawPlay(kind); }, [soundOn, rawPlay]);
  const move = useCallback((dx, dy) => {
    if (modal) return;
    const x = player.x + dx; const y = player.y + dy;
    if (!maze[y] || maze[y][x] === '#') { play('step'); return; }
    if (x === tiles.door.x && y === tiles.door.y) { setModal('sql'); play('magic'); return; }
    movePlayer(x, y);
    if (collectAt(x, y)) play('chest'); else play('step');
  }, [modal, player, tiles, movePlayer, collectAt, play]);
  useKeyboardMovement(move, !modal);
  const handleSuccess = () => { setModal(null); if (levelIndex === levels.length - 1) onVictory(); else completeLevel(); };
  const openTreasure = (x, y) => { if (collectAt(x, y)) play('chest'); };
  return <GameLayout>
    <header className="game-header"><button className="brand-mark" onClick={onHome} aria-label="Volver al inicio"><span>ᛟ</span> SQL MAGE</button><div className="game-header-center"><Badge tone="gold">CATACUMBAS · {String(level.id).padStart(2, '0')}</Badge><span className="level-heading">{level.title}</span></div><div className="header-tools"><button className="icon-button" onClick={() => setSoundOn((value) => !value)} aria-label={soundOn ? 'Silenciar' : 'Activar sonido'}>{soundOn ? <Volume2 size={18} /> : <VolumeX size={18} />}</button><button className="icon-button" onClick={() => setModal('tables')} aria-label="Ver tablas"><Database size={18} /></button><button className="icon-button" onClick={onHome} aria-label="Volver al inicio"><Home size={18} /></button></div></header>
    <div className="adventure-layout"><section className="map-column"><div className="map-title-row"><div><span className="eyebrow">ZONA ACTUAL</span><h1>{level.title}</h1></div><span className="map-coordinates">SECTOR 0{level.id} <i>·</i> {player.x.toString().padStart(2, '0')}:{player.y.toString().padStart(2, '0')}</span></div>
      <MazeGrid player={player} treasures={tiles.treasures} door={tiles.door} collected={collected.filter((item) => item.startsWith(`${levelIndex}-`)).map((item) => item.slice(item.indexOf('-') + 1))} onDoor={() => setModal('sql')} onTreasure={openTreasure} />
      <div className="map-legend"><span><i className="legend-dot legend-dot--mint" /> TÚ</span><span><i className="legend-dot legend-dot--gold" /> COFRE</span><span><i className="legend-dot legend-dot--coral" /> PUERTA RÚNICA</span></div>
    </section><aside className="quest-column"><div className="quest-top"><span className="eyebrow">MISIÓN ACTIVA</span><span className="quest-icon">✧</span></div><h2>{level.door}</h2><p>{level.subtitle}</p>
      <DialogueBox title="Mago Olmo" icon="🧙">Las runas esperan una consulta bien ordenada. Busca cofres: guardan pistas del archivo.</DialogueBox>
      <div className="quest-stats"><StatCard label="Puerta" value={`${level.id} / ${levels.length}`} icon="⌑" tone="gold" /><StatCard label="Tesoros" value={`${inventory.length}`} icon="✦" tone="mint" /></div>
      <InventoryBar items={inventory} /><button className="table-link" onClick={() => setModal('tables')}><Database size={15} /> Consultar tablas <span>↗</span></button><div className="controls-hint"><Map size={16} /><span>WASD o flechas para moverte</span></div>
      <div className="touch-pad" aria-label="Controles táctiles"><button onClick={() => move(0, -1)} aria-label="Arriba"><ArrowUp /></button><div><button onClick={() => move(-1, 0)} aria-label="Izquierda"><ArrowLeft /></button><button onClick={() => move(0, 1)} aria-label="Abajo"><ArrowDown /></button><button onClick={() => move(1, 0)} aria-label="Derecha"><ArrowRight /></button></div></div>
      <Button className="spell-button" onClick={() => setModal('sql')}><BookOpen size={16} /> Hablar con el guardián</Button>
    </aside></div>
    {modal === 'sql' && <SQLEditorModal level={level} onClose={() => setModal(null)} onSuccess={handleSuccess} play={play} />}
    {modal === 'tables' && <TableInspector onClose={() => setModal(null)} />}
  </GameLayout>;
}