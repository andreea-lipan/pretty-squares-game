import Card from "./Card/Card.tsx";
import type {Cell} from "./model.tsx";
import {useState} from "react";

const gameBoard: Cell[][] = [];

// Intialize gameboard with 4x4 cells, all empty with null colors, and 4 random cells with numbers between 1 and 4, and random colors for numberColors (colors shouldnt duplicate)

for (let i = 0; i < 4; i++) {
  const row: Cell[] = [];
  for (let j = 0; j < 4; j++) {
    row.push({
      number: undefined,
      numberColor: null,
      backgroundColor: null,
      selectionBackgroundColor: null
    });
  }
  gameBoard.push(row);
}

// Randomly assign numbers and colors to 4 cells
const colors = ["green", "blue", "pink", "orange", "purple", "cyan"];
gameBoard[0][0] = {
  number: 1,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[1][3] = {
  number: 2,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[2][2] = {
  number: 3,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[2][0] = {
  number: 4,
  numberColor: colors[Math.floor(Math.random() * colors.length)],
  backgroundColor: null,
  selectionBackgroundColor: null
};


export default function Game() {

  const [gameState, setGameState] = useState(gameBoard);
  const [cont, setCont] = useState(false);

  const [currentSelection, setCurrentSelection] = useState<{
    startX: number,
    startY: number,
    endX: number,
    endY: number
  } | null>(null);

  // function that checks fir a given selection, if it has a number -> give background that number color
  // if it has no number -> give background lightgray
  // if it has more numbers -> give background red (error color)
  function verifySelection(startX: number, startY: number, endX: number, endY: number): string {
    const number: {[key: number]: string} = {};

    // iterate through all cells in the current selection, if it has a number, add it to the number object with its color
    if (currentSelection) {
      for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
        for (let j = Math.min(startX, endX); j <= Math.max(startX, endX); j++) {
          const cell = gameState[i][j];
          console.log("Cell", cell);
          if (cell.number) {
            number[cell.number] = cell.numberColor!;
          }
        }
      }
    }

    // if there are no numbers, return lightgray
    if (Object.keys(number).length === 0) {
      console.log("Number object:", "lightgray");
      return "lightgray";
    }

    // if there is more than one number, return red
    if (Object.keys(number).length > 1) {
      console.log("Number object:", "red");
      return "red";
    }

    // if there is only one number, return its color
    console.log("Number object:", number);
    return Object.values(number)[0];
  }

  function colorRectangle(startX: number, startY: number, endX: number, endY: number) {
    console.log("Selecting rectangle from", startX, startY, "to", endX, endY);
    const color: string = verifySelection(startX, startY, endX, endY);

    // Set background color of all cells in the rectangle to lightgray
    for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
      for (let j = Math.min(startX, endX); j <= Math.max(startX, endX); j++) {
        // update game state to change background color of cell at (j, i) to color determined by the rules above

        // must make copy of game state to update it, not mutate it directly
        setGameState((prevValue) => {
          const newGameState = [...prevValue.map(innerArray => [...innerArray])];
          newGameState[i][j] = {
            ...newGameState[i][j],
            selectionBackgroundColor: color // will use the function above later to determine the color based on the rules
          }
          return newGameState;
        })


      }
    }

  }

  function updateSelection(x: number, y: number) {
    if (currentSelection) {
      // if there is a current selection, update the end coordinates
      setCurrentSelection({
        ...currentSelection,
        endX: x,
        endY: y
      });

      // check if the new rectangle is different, if yes, decolor the old one and color the new one
      removeCurrentSelectionColor();

      colorRectangle(currentSelection.startX, currentSelection.startY, x, y);
    }
  }

  function startSelection(x: number, y: number) {
    if (!currentSelection) {
      setCurrentSelection({
        startX: x,
        startY: y,
        endX: x,
        endY: y
      });
      colorRectangle(x, y, x, y);
    }
  }

  function removeCurrentSelectionColor() {
    // decolor all cells by setting selectionBackgroundColor to null
    setGameState((prevValue) => {
      const newGameState = [...prevValue.map(innerArray => [...innerArray])];
      for (let i = 0; i < newGameState.length; i++) {
        for (let j = 0; j < newGameState[i].length; j++) {
          newGameState[i][j] = {
            ...newGameState[i][j],
            selectionBackgroundColor: null
          }
        }
      }
      return newGameState;
    });
  }

  function resetSelection() {
    setCurrentSelection(null);
    removeCurrentSelectionColor();
  }

  return (
    <div>
      <h2>Game</h2>
      {/*  table representing the game board 4x4 */}
      <table>
        <tbody>
        {gameState.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j}>
                <Card x={j} y={i} cell={cell}
                      selectionStart={() => startSelection(j, i)}
                      selectionContinue={() => updateSelection(j, i)}
                      selectionEnd={() => resetSelection()}/>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}