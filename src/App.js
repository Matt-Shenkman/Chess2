import Board from './components/Board';
import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState([[]])

  useEffect(() => {
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

    setGameState(setup);
  })

  return (
    <div className="App">
      <Board gameState = {gameState}/>
    </div>
  );
}

export default App;
