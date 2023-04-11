import React from 'react';
import { useParams } from "react-router-dom";
import Pawn from './Pawn';
import './Board.css'
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { v4 as uuidv4 } from 'uuid';
const socket = io.connect("http://localhost:3001")



function Message (props) {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
   // Generate a unique ID and store it as a cookie
   const [userId, setUserId] = useState(() => {
    const id = Cookies.get('userId') || uuidv4();
    Cookies.set('userId', id);
    return id;
  });

  const joinRoom = function(){
    socket.emit("join_room", {userId});
  }
  const sendMessage = function(){
    socket.emit("send_message", {message, userId})
  } 
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_initial", {userId});
    });
    socket.on("receive_message", (data)=>{
      setMessageReceived(data.message)
    })
  }, [socket])
  return (
    <div>
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