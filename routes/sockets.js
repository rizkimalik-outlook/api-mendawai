function sockets (io) {
    io.on('connection', (socket) => {
        const now = new Date();
        console.log(now + ' : ' + socket.id);

        socket.on('join-room', room => {
            socket.join(room)
        })

        socket.on('send-message', (res, room) => {
            console.log(res, room);
            // socket.broadcast.emit('return-message', res);

            if (room === ""){
                socket.broadcast.emit('return-message', res);
            }
            else {
                socket.to(room).emit('return-message', res)
            }
        });

    
        socket.on('disconnect', (res) => {
            console.log(`${socket.id} : ${res}`);
        });
    });

}

export default sockets;