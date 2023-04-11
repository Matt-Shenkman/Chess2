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
  return (
    <img alt="bp" src="/images/peices/b_pawn.svg" className="peices"/>
  );
};

export default Pawn;