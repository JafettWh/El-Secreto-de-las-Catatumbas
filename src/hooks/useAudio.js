import { useCallback } from 'react';

export function useAudio() {
  const play = useCallback((kind = 'step') => {
    try {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (!Audio) return;
      const context = new Audio();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'square';
      oscillator.frequency.value = ({ step: 115, magic: 660, error: 160, chest: 880 })[kind] || 115;
      gain.gain.setValueAtTime(0.035, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.11);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(); oscillator.stop(context.currentTime + 0.11);
      oscillator.onended = () => context.close();
    } catch { /* El sonido es opcional. */ }
  }, []);
  return { play };
}