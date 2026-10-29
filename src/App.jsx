import { useState } from 'react';
import StartScreen from './screens/StartScreen.jsx';
import MazeGameScreen from './screens/MazeGameScreen.jsx';
import VictoryScreen from './screens/VictoryScreen.jsx';
import { GameProvider } from './context/GameContext.jsx';

function Game() {
  const [screen, setScreen] = useState('start');
  if (screen === 'game') return <MazeGameScreen onHome={() => setScreen('start')} onVictory={() => setScreen('victory')} />;
  if (screen === 'victory') return <VictoryScreen onHome={() => setScreen('start')} />;
  return <StartScreen onStart={() => setScreen('game')} />;
}

export default function App() {
  return <GameProvider><Game /></GameProvider>;
}
