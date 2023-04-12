
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
var currRoom = 1;

const io = new Server(server,{
  cors:{
    origin: "http://localhost:3000",
    methods:["GET", "POST"]
  }
})
io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`)
  
  socket.on("join_room", (data) => {
    socketQueue.push({socket, userId: data.userId});
    if(socketQueue.length == 2){
      socketQueue[0].socket.join(currRoom);
      socketQueue[1].socket.join(currRoom);
      idToRoom[socketQueue[0].userId] = currRoom;
      idToRoom[socketQueue[1].userId] = currRoom;
      currJoined = {room: currRoom, user1: socketQueue[0].userId, user2: socketQueue[1].userId}
      socketQueue[0].socket.to(currRoom).emit("receive_connection_info", currJoined)
      socketQueue[1].socket.to(currRoom).emit("receive_connection_info", currJoined)
      joinedRooms.push(currJoined);
      socketQueue = [];
      currRoom ++;
    }
    console.log(joinedRooms)
  })
  socket.on("join_initial", (data) => {
    if(idToRoom[data.userId]){
      socket.join(idToRoom[data.userId]);
    }
  })

  socket.on("send_message", (data) => {
    console.log(data)
    console.log(idToRoom[data.userId])
    socket.to(idToRoom[data.userId]).emit("receive_message", data)
  })
})

server.listen(3001, () => {
  console.log("server is running")
})