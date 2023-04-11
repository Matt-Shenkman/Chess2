import Board from './components/Board';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const setup = [
    ['br', 'bkn', 'bb', 'bq', 'bk', 'bb', 'bkn', 'br'],
    ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
    ['wr', 'wkn', 'wb', 'wq', 'wk', 'wb', 'wkn', 'wr'],
  ]
  const [gameState, setGameState] = useState(setup)
  
  console.log("apppp")
  console.log(gameState)
  return (
    <div className="App">
      <Board gameState = {gameState}/>
    </div>
  );
}

export default App;
