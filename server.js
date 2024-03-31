const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://localhost:5173'] 
    }
})

const rooms = {};

io.on('connection', socket => {
    socket.on('joinRoom', ({ userId, roomId, chips, seatPosition }) => {
        if (!rooms[roomId]) {
            rooms[roomId] = new Room(roomId);
        }

        const player = new Player(userId, socket.id, chips, seatPosition);
        rooms[roomId].addPlayer(player);

        socket.join(roomId); // Join the Socket.IO room

        // Notify other players in the room
        socket.to(roomId).emit('playerJoined', { userId, seatPosition, chips });

        // Start the game if conditions are met
        if (rooms[roomId].players.length === 2) {
            rooms[roomId].startHand();
        }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        // Remove player from their room and handle disconnection logic
    });
});