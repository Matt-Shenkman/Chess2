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
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("join_initial", {userId});
    });
    socket.on("receive_message", (data)=>{
      setMessageReceived(data.message)
    })
    socket.on("receive_connection_info", (data)=>{
      setInfo(data);
      setJoinedState(2);
      console.log("this is the info")
      console.log(info)
      console.log(data)
    })
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
      <button onClick={joinRoom}> Join Room</button>
      <input placeholder = "Message" onChange={(event) => {
        setMessage(event.target.value)
      }}/>
      <button onClick={sendMessage}>Send Message </button>
      <h1>message received: </h1>
      {messageReceived}
      {status}
    </div>
  );
};

export default Message;