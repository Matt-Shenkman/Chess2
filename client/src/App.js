import Board from './components/Board';
import SketchComponent from './components/Board2';
import Message from './components/Message';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  // const setup = [
  //   ['wr', 'wkn', 'wb', 'wq', 'wk', 'wb', 'wkn', 'wr'],
  //   ['wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp', 'wp'],
  //   ['', '', '', '', '', '', '', ''],
  //   ['', '', '', '', '', '', '', ''],
  //   ['', '', '', '', '', '', '', ''],
  //   ['', '', '', '', '', '', '', ''],
  //   ['bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp', 'bp'],
  //   ['br', 'bkn', 'bb', 'bq', 'bk', 'bb', 'bkn', 'br'],
  // ]
  const setup = [
    ['', '', '', '', '', '', '', ''],
    ['', 'wkn', '', 'wkn', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
    ['', '', '', '', '', '', '', ''],
  ]
  const [gameState, setGameState] = useState(setup)
  
  console.log("apppp")
  console.log(gameState)
  return (
    <div>
      <Routes>
        <Route key="board" path="/" element={<Board gameState = {gameState} />} />
        <Route key="board" path="/board2" element={<SketchComponent gameState = {gameState}/>} />
        {/* <Route key="meassager" path="/messager" element={<Message />} /> */}
      </Routes>
    </div>
  );
}

export default App;
