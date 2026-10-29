import { createContext, useContext, useState } from 'react';
import { levelTiles } from '../data/levels.js';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [levelIndex, setLevelIndex] = useState(0);
  const [player, setPlayer] = useState({ x: 1, y: 1 });
  const [inventory, setInventory] = useState([]);
  const [collected, setCollected] = useState([]);
  const [unlocked, setUnlocked] = useState(1);
  const movePlayer = (x, y) => setPlayer({ x, y });
  const collectAt = (x, y) => {
    const key = `${levelIndex}-${x}-${y}`;
    if (collected.includes(key) || !levelTiles[levelIndex].treasures.some((tile) => tile.x === x && tile.y === y)) return false;
    setCollected((items) => [...items, key]);
    setInventory((items) => [...items, { id: key, name: 'Fragmento rúnico', icon: levelIndex ? '💎' : '📜' }]);
    return true;
  };
  const completeLevel = () => {
    if (levelIndex === levelTiles.length - 1) return;
    setUnlocked((value) => Math.max(value, levelIndex + 2));
    setLevelIndex((value) => value + 1);
    setPlayer({ x: 1, y: 1 });
  };
  const selectLevel = (index) => {
    if (index >= unlocked) return false;
    setLevelIndex(index);
    setPlayer({ x: 1, y: 1 });
    return true;
  };
  const value = { levelIndex, player, inventory, collected, unlocked, tiles: levelTiles[levelIndex], movePlayer, collectAt, completeLevel, selectLevel };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Este hook se exporta junto al proveedor para mantener una única API de contexto.
// eslint-disable-next-line react-refresh/only-export-components
export function useGame() {
  const context = useContext(GameContext);
  if (!context) throw new Error('useGame debe usarse dentro de GameProvider');
  return context;
}