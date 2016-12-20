module.exports = function(io) {
    io.on('connection', function(socket){

    // Controller client has joined
    socket.on('controlclientjoin', function(data){
        socket.room = data.room;
        socket.join(socket.room);
        console.log("Client joined room: "+socket.room);
    });

    // Gamepad has joined
    socket.on('gamepadjoined', function(data) {
        socket.room = data.room;
        socket.broadcast.to(socket.room).emit('gamepadjoined');
        console.log("Gamepad joined room: "+socket.room);
    });
    
    // Gamepad has left
    socket.on('gamepadleft', function(data){
        socket.room = data.room;
        socket.broadcast.to(socket.room).emit('gamepadleft');
        console.log("Gamepad left room: "+socket.room);
    });

    // Game client has joined
    socket.on('gameclientjoined', function(data){
        socket.room = data.room;
        socket.join(socket.room);
        console.log("Game joined room: "+socket.room);
    });

    // Send controller input
    socket.on('sendgamepad', function(data){
        console.log(JSON.stringify(data.gamepad));
        socket.broadcast.to(socket.room).emit('gamepad', data.gamepad);
    });

    });
}