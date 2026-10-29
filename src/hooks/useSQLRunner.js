export function useSQLRunner() {
  const run = (level, selections) => {
    const missing = level.parts.findIndex((part, index) => selections[index] !== part.correct);
    return { correct: missing === -1, missing, query: level.parts.map((_, index) => selections[index] || '▁▁▁').join('\n') };
  };
  return { run };
}