import React from 'react';
import { useParams } from "react-router-dom";
import Pawn from './Pawn2';
import './Board.css'
import io from 'socket.io-client'
import { useEffect, useState, useCallback } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
import SketchComponent from './Board';
import { useRef } from 'react';
import GameState from './GameState';


function Message (props) {
  const playerColorRef = useRef("white");

  const gameStateRef = useRef(new GameState(props.gameState, null, null, true))


  const setColorBlack = () => {
    console.log("blackkkkkk")
    playerColorRef.current = "black";
  };

  const setGameState = (gameState) => {
    gameStateRef.current = gameState;
  };


  const socket = io.connect("192.168.1.230:3001")

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [joinedState, setJoinedState] = useState(0);
  const [info, setInfo] = useState({});
   // Generate a unique ID and store it as a cookie
   const [userId, setUserId] = useState(() => {
    const id = Cookies.get('userId') || uuidv4();
    Cookies.set('userId', id);
    return id;
  });

  const joinRoom = function(){
    socket.emit("join_room", {userId});
    setJoinedState(1);
    console.log("joined")
  }
  const sendMessage = function(){
    socket.emit("send_message", {message, userId})
  } 
  const sendState = useCallback(function(state){
    socket.emit("send_message", {state, userId})
  }, [socket, userId])

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_initial", {userId});
    });
    socket.on("receive_message", (data)=>{
      //setMessageReceived(data.state)
      //setMessage("hiiasdasdg")
      const gameStateObj = JSON.parse(data.state);
      setGameState(new GameState(gameStateObj.board, gameStateObj.epFile, gameStateObj.epRank, gameStateObj.whiteTurn));
    })
    socket.on("joined_room", (data)=>{
      console.log("room is joined")
      setJoinedState(2)
    })
    socket.on("receive_connection_info", (data)=>{
      setInfo(data);
      setJoinedState(2);
    })
    socket.on("set_color_black", ()=>{
      console.log("black")
      setColorBlack();
    })
    socket.emit("check_joined", {userId});
  }, [socket])
  var status;
  if(joinedState == 0){
    status = <h3> not joined yet </h3>
  } else if (joinedState == 1){
    status = <h3> waiting </h3>
  } else {
    status = <h3> connected </h3>
  }
  
  return (
    <div>
      <div>
        <button onClick={joinRoom}> Join Room</button>
        <input placeholder = "Message" onChange={(event) => {
          setMessage(event.target.value)
        }}/>
        <button onClick={sendMessage}>Send Message </button>
        <h1>message received: </h1>
        {/* {messageReceived} */}
        {status}
      </div>
      <SketchComponent playerColorRef = {playerColorRef} gameStateRef = {gameStateRef} sendState = {sendState} />
    </div>
  );
};

export default Message;