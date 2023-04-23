
const express = require('express');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { join } = require('path');

app.use(cors())

const server = http.createServer(app)
var joinedRooms = []
var socketQueue = []
var idToRoom = {}
var roomData = {}
var roomBlack = {}
var currRoom = 1;

const io = new Server(server,{
  cors:{
    origin: "http://192.168.1.230:3000",
    methods:["GET", "POST"]
  }
})
io.on("connection", (socket) => {
  
  socket.on("join_room", (data) => {
    
    if(!(socketQueue.length == 1 && socketQueue[0].userId == data.userId)){
      socketQueue.push({socket, userId: data.userId});
    }
    if(socketQueue.length == 2){
      socketQueue[0].socket.join(currRoom);
      socketQueue[1].socket.join(currRoom);
      idToRoom[socketQueue[0].userId] = currRoom;
      idToRoom[socketQueue[1].userId] = currRoom;
      currJoined = {room: currRoom, user1: socketQueue[0].userId, user2: socketQueue[1].userId}
      socketQueue[0].socket.to(currRoom).emit("receive_connection_info", currJoined)
      socketQueue[1].socket.to(currRoom).emit("receive_connection_info", currJoined)
      var random = Math.floor(Math.random() * 2);
      socketQueue[random].socket.emit("set_color_black")
      roomBlack[currRoom] = socketQueue[random].userId;
      joinedRooms.push(currJoined);
      socketQueue = [];
      currRoom ++;
    }
  })
  socket.on("join_initial", (data) => {
    if(idToRoom[data.userId]){
      socket.join(idToRoom[data.userId]);
    }
  })
  socket.on("check_joined", (data) => {
    if(socketQueue.length == 1 && socketQueue[0].userId == data.userId){
      socketQueue[0].socket = socket;
      socket.emit("joined_room", data);
    }
    else if(idToRoom[data.userId]){
      socket.join(idToRoom[data.userId]);
      socket.emit("game_started", data)
      if(data.userId == roomBlack[idToRoom[data.userId]]){
        socket.emit("set_color_black")
      }
      socket.emit("receive_message", roomData[idToRoom[data.userId]]);
    }
  })

  socket.on("send_message", (data) => {
    roomData[idToRoom[data.userId]] = data
    socket.to(idToRoom[data.userId]).emit("receive_message", data)
  })

  socket.on("game_over", (data) => {
    console.log("server game over")
    socket.to(idToRoom[data.userId]).emit("receive_game_over", data)
  })
})

server.listen(3001, () => {
  console.log("server is running")
})