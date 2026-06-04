import './Player.scss'
import { useState } from 'react';

export default function Player() {
  const [playerName, setPlayerName] = useState('');
  return(
    <div className="player">
      Whats your name, dear player?
      <input value={playerName} onChange={event => setPlayerName(event.target.value) }/>
    </div>
  );
}