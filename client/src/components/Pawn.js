import React from 'react';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';


const Pawn = (props) => {
  const [location, setLocation] = useState(props.location)
  const [color, setColor] = useState(props.color)
  const [direction, setDirection] = useState(props.direction)


  const handleClick = () => {
      console.log("click")
      console.log(props.gameState)
      return
  }

  var possibleMoves = function(){
    var x = props.location[1];
    var y = props.location[0];
    var moves = []
    if(color == 'white'){
      if(props.gameState[y+1][x] == '' && props.gameState[y+2][x] == ''){
        moves.push([y+2,x])
      }
      if(props.gameState[y+1][x] == ''){
        moves.push([y+1,x])
      }
    } else {
      if(props.gameState[y-1][x] == '' && props.gameState[y-2][x] == ''){
        moves.push([y-2,x])
      }
      if(props.gameState[y-1][x] == ''){
        moves.push([y-1,x])
      }
    }
  }
  return (
    <img 
        alt= {color == 'black' ? 'bp': 'wp'} 
        src= {color == 'black' ? '/images/peices/b_pawn.svg': '/images/peices/w_pawn.svg'} 
        className= "peices"
        onClick= {handleClick}/>
  );
};

export default Pawn;