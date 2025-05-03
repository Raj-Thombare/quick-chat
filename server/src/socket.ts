import { Server, Socket } from "socket.io"

interface CustomSocket extends Socket {
    room?: string;
    userId?: string;
}

const roomUsers = new Map<string, Map<string, number>>();

function handleUserConnection(roomId: string, userId: string): boolean {
    if (!roomUsers.has(roomId)) {
        roomUsers.set(roomId, new Map());
    }

    const roomMap = roomUsers.get(roomId);
    const count = roomMap.get(userId) || 0;
    roomMap.set(userId, count + 1);

    return count === 0;
}

function handleUserDisconnection(roomId: string, userId: string): boolean {
    if (!roomUsers.has(roomId) || !userId) {
        return false;
    }

    const roomMap = roomUsers.get(roomId);
    const count = roomMap.get(userId) || 0;

    if (count <= 1) {
        roomMap.delete(userId);
        if (roomMap.size === 0) {
            roomUsers.delete(roomId);
        }
        return true; 
    } else {
        roomMap.set(userId, count - 1);
        return false; 
    }
}

function getRoomUsers(roomId: string): string[] {
    if (!roomUsers.has(roomId)) {
        return [];
    }
    return [...roomUsers.get(roomId).keys()];
}

export const setupSocket = (io: Server) => {

    io.use((socket: CustomSocket, next) => {
        const room = socket.handshake.auth.room || socket.handshake.headers.room;
        const userId = socket.handshake.auth.userId || socket.handshake.headers.userId;

        if (!room) {
            return next(new Error("Invalid room"));
        }

        socket.room = room;
        socket.userId = userId;
        next();
    });

    io.on("connection", (socket: CustomSocket) => {
        const room = socket.room;
        const userId = socket.userId;

        if (!room || !userId) {
            console.log("Connection missing room or userId");
            return;
        }

        console.log(`User ${userId} connected to room ${room}`);

        socket.join(room);

        const isFirstConnection = handleUserConnection(room, userId);

        if (isFirstConnection) {
            io.to(room).emit("userConnected", userId);
        }

        io.to(room).emit("onlineUsers", getRoomUsers(room));

        socket.on("message", (data) => {
            console.log("Server side message: ", data);
            socket.to(room).emit("message", data);
        });

        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected from room ${room}`);

            if (userId && room) {
                const isFullyDisconnected = handleUserDisconnection(room, userId);

                if (isFullyDisconnected) {
                    io.to(room).emit("userDisconnected", userId);
                }

                io.to(room).emit("onlineUsers", getRoomUsers(room));
            }
        });

        socket.on("getOnlineUsers", () => {
            if (room) {
                socket.emit("onlineUsers", getRoomUsers(room));
            }
        });
    });
}