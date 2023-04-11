import React from 'react';
import { useParams } from "react-router-dom";
import Pawn from './Pawn';
import './Board.css'


const Board = (props) => {

  const writeChessBoard = () => {
    let board = [];
    let boardImg = [<img alt="white-tile" src="/images/board-squares/White-Dark.svg" className="tile"/>, <img alt="black-tile" src="/images/board-squares/Green-Dark.svg" className="tile"/>];

    for (let i = 0; i < 8; i++) {
      let row = []
      for(let j = 0; j < 8; j++) {
        let tilePeices = <div className='tile-peices'> 
          {getPeice(i,j)}
          {(i%2 == j%2 ? boardImg[0]: boardImg[1])}
        </div>


         row.push(tilePeices);
      }
      board.push(<div className='row'>{row}</div>)
      
    }
    return board;
  };

  const getPeice  = (i,j) => {
    const peice = props.gameState[i][j];
    switch(peice) {
      case 'bp': 
        return <Pawn color = {'black'} location = {(i,j)} direction = {"down"}/>
      case 'wp':
        return <Pawn color = {'white'} location = {(i,j)} direction = {"up"}/>
      case 'br':
        return <img alt="br" src="/images/peices/b_rook.svg" className="peices"/>
      case 'wr':
        return <img alt="wr" src="/images/peices/w_rook.svg" className="peices"/>
      case 'bkn':
        return <img alt="bkn" src="/images/peices/b_knight.svg" className="peices"/>
      case 'wkn':
        return <img alt="wkn" src="/images/peices/w_knight.svg" className="peices"/>
      case 'bb':
        return <img alt="bb" src="/images/peices/b_bishop.svg" className="peices"/>
      case 'wb':
        return <img alt="wb" src="/images/peices/w_bishop.svg" className="peices"/>
      case 'bk':
        return <img alt="bk" src="/images/peices/b_king.svg" className="peices"/>
      case 'wk':
        return <img alt="wk" src="/images/peices/w_king.svg" className="peices"/>
      case 'bq':
        return <img alt="bq" src="/images/peices/b_queen.svg" className="peices"/>
      case 'wq':
        return <img alt="wq" src="/images/peices/w_queen.svg" className="peices"/>
      default:
        return
    }
  }

  
  return (
    <div id = 'Board-Container'>
      {writeChessBoard()}
    </div>
  );
};

export default Board;