import { Server, Socket } from "socket.io"

interface CustomSocket extends Socket {
    room?: string
}

export const setupSocket = (io: Server) => {

    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;

        if (!room) {
            return next(new Error("Invalid room"))
        }

        socket.room = room;
        next();
    });

    io.on("connection", (socket: CustomSocket) => {
        //join the room
        socket.join(socket.room)

        socket.on("message", (data) => {
            console.log("Server side message: ", data)
            // socket.broadcast.emit("message", data)
            socket.to(socket.room).emit("message", data)
        })

        socket.on("disconnect", () => {
            console.log("A User disconnected!", socket.id)
        })
    })
}