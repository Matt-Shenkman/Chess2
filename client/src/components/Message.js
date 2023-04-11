import React from 'react';
import { useParams } from "react-router-dom";
import Pawn from './Pawn';
import './Board.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
const socket = io.connect("http://localhost:3001")

function Message (props) {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = function(){
    if(room != ""){
      socket.emit("join_room", room);
    }
  }
  const sendMessage = function(){
    socket.emit("send_message", {message, room})
  } 
  useEffect(() => {
    socket.on("receive_message", (data)=>{
      setMessageReceived(data.message)
    })
  }, [socket])
  return (
    <div>
      <input placeholder = "Room Number..." onChange={(event) => {
        setRoom(event.target.value)
      }}/>
      <button onClick={joinRoom}> Join Room</button>
      <input placeholder = "Message" onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send Message </button>
      <h1>message received: </h1>
      {messageReceived}
    </div>
  );
};

export default Message;