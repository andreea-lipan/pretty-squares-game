import './Card.scss';
import type {Cell} from "../model.tsx";

export default function Card({x, y, cell, selectionStart, selectionContinue,selectionEnd}: {
  x: number,
  y: number,
  cell: Cell,
  selectionStart: () => void,
  selectionContinue: () => void,
  selectionEnd: () => void
}) {
  const numberColor = cell.numberColor || 'black';
  const number = cell.number || '';

  let backgroundColor = "background-default";

  if (cell.selectionBackgroundColor) {
    backgroundColor = "background-" + cell.selectionBackgroundColor;
  } else if (cell.backgroundColor) {
    backgroundColor = "background-" + cell.backgroundColor;
  }

  console.log("Background color for cell at", x, y, "is", backgroundColor);

  return (
    <div
      className={"card " + backgroundColor}
      onMouseDown={() => {
        console.log('onMouseDown at', x, y);
        selectionStart();
      }}
      onMouseUp={() => {
        console.log('onMouseUp at', x, y);
        selectionEnd();
      }}
      onMouseEnter={() => {
        console.log('onMouseEnter at', x, y);
        selectionContinue();
      }}>
      <span className={numberColor + " number"}>{number}</span>
    </div>
  );
}