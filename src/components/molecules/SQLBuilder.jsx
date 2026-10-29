import SQLBlock from '../atoms/SQLBlock.jsx';

export default function SQLBuilder({ level, selections, onSelect }) {
  return <div className="builder-steps">{level.parts.map((part, index) => <section className="builder-step" key={part.label}>
    <div className="step-heading"><span className="step-number">{String(index + 1).padStart(2, '0')}</span><h3>{part.label}</h3></div>
    <div className="sql-options">{part.options.map((option) => <SQLBlock key={option} selected={selections[index] === option} onClick={() => onSelect(index, option)}>{option}</SQLBlock>)}</div>
  </section>)}</div>;
}