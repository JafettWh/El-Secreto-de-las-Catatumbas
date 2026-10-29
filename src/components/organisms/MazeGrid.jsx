import { motion } from 'framer-motion';
import { maze } from '../../data/levels.js';
import Tile from '../atoms/Tile.jsx';

export default function MazeGrid({ player, treasures, door, collected, onDoor, onTreasure }) {
  return <div className="maze-frame" aria-label="Laberinto de las catacumbas"><div className="maze-grid" style={{ '--columns': maze[0].length }}>
    {maze.flatMap((row, y) => [...row].map((cell, x) => {
      const treasure = treasures.find((item) => item.x === x && item.y === y);
      const isCollected = collected.includes(`${x}-${y}`);
      const isDoor = door.x === x && door.y === y;
      const type = cell === '#' ? 'wall' : isDoor ? 'door' : treasure && !isCollected ? 'chest' : 'floor';
      return <Tile type={type} key={`${x}-${y}`}>
        {player.x === x && player.y === y && <motion.img className="mage-sprite" src="/src/assets/apprentice.svg" alt="Mago aprendiz" animate={{ y: [0, -2, 0] }} transition={{ duration: 1.4, repeat: Infinity }} />}
        {isDoor && <button className="tile-action door-action" aria-label="Abrir puerta rúnica" onClick={onDoor}>ᛟ</button>}
        {treasure && !isCollected && <button className="tile-action chest-action" aria-label="Abrir cofre" onClick={() => onTreasure(x, y)}>✦</button>}
        {cell === '#' && x % 3 === 0 && y % 2 === 0 && <span className="wall-glyph">⁕</span>}
      </Tile>;
    }))}
  </div><span className="torch torch--left" aria-hidden="true">♨</span><span className="torch torch--right" aria-hidden="true">♨</span></div>;
}