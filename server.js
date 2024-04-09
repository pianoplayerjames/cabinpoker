const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

const rooms = {
  "1": {
    tableName: "Test Room 1",
    currency: "$",
    smallBlind: 2.50,
    bigBlind: 5,
    gameType: "cash",
    gameVariant: "holdem",
    players: [],
    deck: null,
    flop: null,
    turn: null,
    river: null,
  },
};

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('checkRoomExists', (roomId, callback) => {
    console.log('Checking room exists for roomId:', roomId);
    const roomExists = rooms.hasOwnProperty(roomId);
    console.log('Room exists:', roomExists);
    callback(roomExists);
  });

  socket.on('getRoomData', (roomId, callback) => {
    const roomData = rooms[roomId];
    callback(roomData);
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));