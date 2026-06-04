import Card from "./Card/Card.tsx";

export default function Game() {
  return (
    <div>
      <h2>Game</h2>
      {/*  table representing the game board 4x4 */}
      <table>
        <tbody>
        <tr>
          <td><Card x={1} y={1}/></td>
          <td><Card x={2} y={1}/></td>
          <td><Card x={3} y={1}/></td>
          <td><Card x={4} y={1}/></td>
        </tr>
        <tr>
          <td><Card x={1} y={2}/></td>
          <td><Card x={2} y={2}/></td>
          <td><Card x={3} y={2}/></td>
          <td><Card x={4} y={2}/></td>
        </tr>
        <tr>
          <td><Card x={1} y={3}/></td>
          <td><Card x={2} y={3}/></td>
          <td><Card x={3} y={3}/></td>
          <td><Card x={4} y={3}/></td>
        </tr>
        <tr>
          <td><Card x={1} y={4}/></td>
          <td><Card x={2} y={4}/></td>
          <td><Card x={3} y={4}/></td>
          <td><Card x={4} y={4}/></td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}