import Card from "./Card/Card.tsx";
import type {Cell} from "./model.tsx";

const gameBoard: Cell[][] = [];

// Intialize gameboard with 4x4 cells, all empty with null colors, and 4 random cells with numbers between 1 and 4, and random colors for numberColors (colors shouldnt duplicate)

for (let i = 0; i < 4; i++) {
  const row: Cell[] = [];
  for (let j = 0; j < 4; j++) {
    row.push({
      number: undefined,
      numberColor: null,
      backgroundColor: null
    });
  }
  gameBoard.push(row);
}

// Randomly assign numbers and colors to 4 cells
const colors = ["red", "green", "blue", "yellow", "pink", "orange", "purple", "cyan"];
gameBoard[0][0] = {
  number: 1,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null
};
gameBoard[1][3] = {
  number: 2,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null
};
gameBoard[2][2] = {
  number: 3,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null
};
gameBoard[2][0] = {
  number: 4,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null
};


export default function Game() {
  return (
    <div>
      <h2>Game</h2>
      {/*  table representing the game board 4x4 */}
      <table>
        <tbody>
        {gameBoard.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                <Card x={j} y={i} cell={cell} />
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}