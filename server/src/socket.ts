import { Server, Socket } from "socket.io"

interface CustomSocket extends Socket {
    room?: string;
    userId?: string;
}

// Map rooms to their user counts
// Structure: roomId -> { userId -> connectionCount }
const roomUsers = new Map<string, Map<string, number>>();

// Helper functions for user reference counting
function handleUserConnection(roomId: string, userId: string): boolean {
    if (!roomUsers.has(roomId)) {
        roomUsers.set(roomId, new Map());
    }

    const roomMap = roomUsers.get(roomId);
    const count = roomMap.get(userId) || 0;
    roomMap.set(userId, count + 1);

    // Return true if this is the first connection for this user
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
        // Clean up empty rooms
        if (roomMap.size === 0) {
            roomUsers.delete(roomId);
        }
        return true; // User is fully disconnected
    } else {
        roomMap.set(userId, count - 1);
        return false; // User still has other connections
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

        // Join the room
        socket.join(room);

        // Add user to room with reference counting
        const isFirstConnection = handleUserConnection(room, userId);

        // Only broadcast if this is the first connection from this user
        if (isFirstConnection) {
            // Broadcast to everyone in the room that a user connected
            io.to(room).emit("userConnected", userId);
        }

        // Always send the current list of online users to everyone
        io.to(room).emit("onlineUsers", getRoomUsers(room));

        // Handle messages
        socket.on("message", (data) => {
            console.log("Server side message: ", data);
            socket.to(room).emit("message", data);
        });

        // Handle user disconnect
        socket.on("disconnect", () => {
            console.log(`User ${userId} disconnected from room ${room}`);

            if (userId && room) {
                const isFullyDisconnected = handleUserDisconnection(room, userId);

                // Only broadcast if this was the user's last connection
                if (isFullyDisconnected) {
                    io.to(room).emit("userDisconnected", userId);
                }

                // Always send the current list of online users
                io.to(room).emit("onlineUsers", getRoomUsers(room));
            }
        });

        // Handle explicit request for online users list
        socket.on("getOnlineUsers", () => {
            if (room) {
                socket.emit("onlineUsers", getRoomUsers(room));
            }
        });
    });
}