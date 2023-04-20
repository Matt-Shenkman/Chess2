import React from 'react';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import Pawn from './Pawn2';
import Knight from './Knight';
import './Board.css'


function Board (props) {

  const [possibleMoves, setPossibleMoves] = useState([])
  const containsPossibleMove = function(y, x){
    for(var i = 0; i < possibleMoves.length; i++){
      if(possibleMoves[i][0] == y && possibleMoves[i][1] == x){
        return true;
      }
    }
    return false;
  }
  const writeChessBoard = () => {
    let board = [];
    let boardImg = [<img alt="white-tile" src="/images/board-squares/White-Dark.svg" className="tile"/>, <img alt="black-tile" src="/images/board-squares/Green-Dark.svg" className="tile"/>];

    for (let i = 0; i < 8; i++) {
      let row = []
      for(let j = 0; j < 8; j++) {
        if(containsPossibleMove(i, j)){
          console.log("it is included" + [i,j]);
        }
        let tilePeices = <div className='image-container'> 
          {containsPossibleMove(7-i, j) ? <img alt="dot" src="/images/dot.svg" className="dot"/>: null}
          {getPeice(7-i,j)}
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
        return <Pawn color = {'black'} location = {[i,j]} direction = {"down"} gameState = {props.gameState} />
      case 'wp':
        return <Pawn color = {'white'} location = {[i,j]} direction = {"up"} gameState = {props.gameState}/>
      case 'br':
        return <img alt="br" src="/images/peices/b_rook.svg" className="peices"/>
      case 'wr':
        return <img alt="wr" src="/images/peices/w_rook.svg" className="peices"/>
      case 'bkn':
        return <Knight color = {'black'} location = {[i,j]} direction = {"down"} gameState = {props.gameState} setPossibleMoves = {setPossibleMoves}/>
      case 'wkn':
        return <Knight color = {'white'} location = {[i,j]} direction = {"down"} gameState = {props.gameState} setPossibleMoves = {setPossibleMoves}/>
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