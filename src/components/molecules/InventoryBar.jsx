export default function InventoryBar({ items }) {
  return <section className="inventory-bar" aria-label="Inventario"><span className="inventory-label">Mochila</span><div className="inventory-slots">
    {Array.from({ length: 8 }, (_, index) => <div className={`inventory-slot${items[index] ? ' has-item' : ''}`} key={index} title={items[index]?.name || 'Espacio vacío'}>{items[index]?.icon || '·'}</div>)}
  </div><span className="inventory-count">{items.length} / 8</span></section>;
}