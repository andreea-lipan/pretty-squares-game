import Header from "./Header/Header.tsx";
import Game from "./Game/Game.tsx";
import Score from "./Score/Score.tsx";

function App() {
  return (
    <>
      <Header/>
      <Game/>
      <Score score={10}/>
    </>
  )
}

export default App
