const io = require("socket.io")(3000, {
    cors: {
        origin: ['http://localhost:5173'] 
    }
})

let online = [];
let rooms = [];
let hands = [];
let users = [];

io.on('connection', socket => {
    socket.on("ping", (callback) => {
        callback();
      });
})