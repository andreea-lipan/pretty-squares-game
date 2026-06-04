import './Card.scss';

export default function Card({x, y}: {x: number, y: number}) {
  return (
    <div
      className="card"
      onMouseDown={() => console.log('onMouseDown at', x, y)}
      onMouseUp={() => console.log('onMouseUp at', x, y)}
      onMouseEnter={() => console.log('onMouseEnter at', x, y)}
      onMouseDownCapture={() => console.log('onMouseDownCapture at', x, y)}
    >
    </div>
  );
}