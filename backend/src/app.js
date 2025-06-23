import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app } from './socket/socket.js';

// Middlewares
app.use(cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// --- ROUTES IMPORT ---
import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';
import userRouter from './routes/user.routes.js';
import { errorHandler } from './middlewares/error.middleware.js'; // Error handler import karein

// --- ROUTES DECLARATION ---
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/users", userRouter);

// --- GLOBAL ERROR HANDLING MIDDLEWARE ---
// Yeh hamesha aakhir mein hona chahiye
app.use(errorHandler);