import Board from './components/Board';
import Message from './components/Message';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

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
    <div>
      
      <Routes>
        <Route key="board" path="/" element={<Board gameState = {gameState} />} />
        <Route key="meassager" path="/messager" element={<Message />} />
        
      </Routes>
    </div>
  );
}

export default App;
