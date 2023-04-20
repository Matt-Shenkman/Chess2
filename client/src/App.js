import Board from './components/Board2';
import SketchComponent from './components/Board';
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
    ['', '', '', '', '', '', 'bk', ''],
    ['', 'bp', 'bp', '', 'wp', '', '', ''],
    ['bq', '', '', '', '', '', 'wk', ''],
    ['', '', 'wp', '', '', '', '', ''],
    ['', '', '', '', '', 'bsp', '', ''],
    ['', '', '', 'wkn', '', '', '', ''],
    ['', 'wp', '', '', 'wsp', '', '', ''],
    ['', '', '', 'wq', '', '', '', ''],
  ]
  const [gameState, setGameState] = useState(setup)
  
  return (
    <div>
      <Routes>
        <Route key="board" path="/board2" element={<Board gameState = {gameState} />} />
        <Route key="board" path="/" element={<SketchComponent gameState = {gameState}/>} />
        {/* <Route key="meassager" path="/messager" element={<Message />} /> */}
      </Routes>
    </div>
  );
}

export default App;
