import './Card.scss';
import type {Cell} from "../model.tsx";

export default function Card({x, y, cell}: {x: number, y: number, cell: Cell}) {
  const numberColor = cell.numberColor || 'black';
  const number = cell.number || '';

  return (
    <div
      className={"card background-" + (cell.backgroundColor || 'white')}
      onMouseDown={() => console.log('onMouseDown at', x, y)}
      onMouseUp={() => console.log('onMouseUp at', x, y)}
      onMouseEnter={() => console.log('onMouseEnter at', x, y)}>
      <span className={numberColor + " number"}>{number}</span>
    </div>
  );
}