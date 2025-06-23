import { Server } from "socket.io";
import http from "http";
import express from "express";
import { SOCKET_EVENT_NAMES } from '../constants/index.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [process.env.CORS_ORIGIN || "http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on(SOCKET_EVENT_NAMES.CONNECTION, (socket) => {
    console.log("A user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
    }

    io.emit(SOCKET_EVENT_NAMES.GET_ONLINE_USERS, Object.keys(userSocketMap));

    socket.on(SOCKET_EVENT_NAMES.DISCONNECT, () => {
        console.log("User disconnected", socket.id);
        if (userId && userId !== "undefined") {
            delete userSocketMap[userId];
        }
        io.emit(SOCKET_EVENT_NAMES.GET_ONLINE_USERS, Object.keys(userSocketMap));
    });
});

export { app, io, server };