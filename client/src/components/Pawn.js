import React from 'react';
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { useEffect } from 'react';


const Pawn = (props) => {
const [location, setLocation] = useState((0,0))
const [color, setColor] = useState('white')
const [direction, setDirection] = useState('up')

    useEffect(() => {
        setLocation(props.location)
        setColor(props.color)
        setDirection(props.direction)
    })

    const handleClick = () => {
        return
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