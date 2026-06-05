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

// pick 4 unique colors from the list
const pickedColurs = colors.sort(() => 0.5 - Math.random()).slice(0, 4);

gameBoard[0][0] = {
  number: 6,
  numberColor: pickedColurs[0],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[1][3] = {
  number: 2,
  numberColor: pickedColurs[1],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[2][2] = {
  number: 4,
  numberColor: pickedColurs[2],
  backgroundColor: null,
  selectionBackgroundColor: null
};
gameBoard[2][0] = {
  number: 4,
  numberColor: pickedColurs[3],
  backgroundColor: null,
  selectionBackgroundColor: null
};


export default function Game() {

  const [gameState, setGameState] = useState(gameBoard);
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
    // const number: { [key: number]: string } = {};

    let number: number | null = null;
    let color: string | null = null;

    // iterate through all cells in the current selection, if it has a number, add it to the number object with its color
    for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
      for (let j = Math.min(startX, endX); j <= Math.max(startX, endX); j++) {
        const cell = gameState[i][j];
        console.log("Cell", cell);
        if (cell.number) {
          // number[cell.number] = cell.numberColor!;
          if (number) {
            return "red";
          }
          number = cell.number;
          color = cell.numberColor;
        }
        if (cell.backgroundColor) {
          // if the cell already has a background color, it means it is already part of a finalized selection, so we should return red
          console.log("Cell", cell, "already has background color", cell.backgroundColor);
          return "red";
        }
      }
    }

    // if there are no numbers, return lightgray
    if (!number) {
      console.log("Number object:", "lightgray");
      return "lightgray";
    }

    // if there is more than one number, return red
    // if (Object.keys(number).length > 1) {
    //   console.log("Number object:", "red");
    //   return "red";
    // }

    // if there is only one number, return its color
    console.log("Number object:", number);
    return color!;
  }

  function colorRectangle(startX: number, startY: number, endX: number, endY: number, finalize: boolean = false) {
    console.log("Selecting rectangle from", startX, startY, "to", endX, endY);
    const color: string = verifySelection(startX, startY, endX, endY);

    // special case, if selection is of size 1 and finalize true
    // if a cell with a background color is selected again, then we remove the whole section of that color
    if (finalize && startX === endX && startY === endY) {
      const cell = gameState[startY][startX];
      if (cell.backgroundColor) {
        // if the cell already has a background color, it means it is already part of a finalized selection, so we should remove the whole section of that color
        const colorToRemove = cell.backgroundColor;
        setGameState((prevValue) => {
            const newGameState = [...prevValue.map(innerArray => [...innerArray])];
            for (let i = 0; i < newGameState.length; i++) {
              for (let j = 0; j < newGameState[i].length; j++) {
                if (newGameState[i][j].backgroundColor === colorToRemove) {
                  newGameState[i][j] = {
                    ...newGameState[i][j],
                    backgroundColor: null,
                    selectionBackgroundColor: null
                  }
                }

              }
            }
            return newGameState;
          }
        );
      }

      return;
    }

    // Set background color of all cells in the rectangle to lightgray
    for (let i = Math.min(startY, endY); i <= Math.max(startY, endY); i++) {
      for (let j = Math.min(startX, endX); j <= Math.max(startX, endX); j++) {
        // update game state to change background color of cell at (j, i) to color determined by the rules above

        // must make copy of game state to update it, not mutate it directly
        setGameState((prevValue) => {
          const newGameState = [...prevValue.map(innerArray => [...innerArray])];
          if (finalize) {
            if (!newGameState[i][j].backgroundColor) {
              // if the cell already has a background color, it means it is already part of
              // a finalized selection, so we should not update the background color and keep it as is
              newGameState[i][j] = {
                ...newGameState[i][j],
                backgroundColor: color !== "red" && color !== "lightgray" ? color : null, // if the color is red, section is invalid, dont save
                selectionBackgroundColor: null
              }
            }

          } else {
            newGameState[i][j] = {
              ...newGameState[i][j],
              selectionBackgroundColor: color // will use the function above later to determine the color based on the rules
            }
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

      // decolor the old one and color the new one
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

  function endSelection(x: number, y: number) {
    // if selection is valid, keep the color, if not, reset it
    if (currentSelection) {
      colorRectangle(currentSelection.startX, currentSelection.startY, x, y, true);
    } else {
      setCurrentSelection({
        startX: x,
        startY: y,
        endX: x,
        endY: y
      });
      colorRectangle(x, y, x, y, true);
    }

    resetSelection();
  }

  const gameWon = verifyGameWon();

  function verifyGameWon(): boolean {
    // check if all cells with numbers are covered by a rectangle of their color, and there are no empty cells

    for (let i = 0; i < gameState.length; i++) {
      for (let j = 0; j < gameState[i].length; j++) {
        const cell = gameState[i][j];
        if (cell.number) {
          if (cell.backgroundColor !== cell.numberColor) {
            return false;
          }
        }
        if (!cell.number && !cell.backgroundColor) {
          return false;
        }
      }
    }

    return true;
  }

  function resetGame() {
    // reset game state to initial state
    setGameState(gameBoard);
  }

  return (
    <div onMouseLeave={resetSelection}>
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
                      selectionEnd={() => endSelection(j, i)}/>
              </td>
            ))}
          </tr>
        ))}
        </tbody>
      </table>
      {gameWon && <>
          <div>You won!</div>
          <button onClick={resetGame}>Play again</button>
      </>}
    </div>
  );
}