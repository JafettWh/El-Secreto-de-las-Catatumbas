import { useEffect } from 'react';

const directions = { ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0] };

export function useKeyboardMovement(onMove, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;
    const handle = (event) => {
      const direction = directions[event.key];
      if (!direction) return;
      event.preventDefault();
      if (!event.repeat) onMove(...direction);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onMove, enabled]);
}