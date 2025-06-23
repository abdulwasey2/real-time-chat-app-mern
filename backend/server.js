import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
// server.js ab app ko nahi, balke http server aur io instance ko socket.js se import karega
import { app, server } from './src/socket/socket.js'; 

// Environment variables ko load karna
dotenv.config({
    path: './.env' // Make sure this path is correct from the root
});

const PORT = process.env.PORT || 8000;

// Import app configuration after dotenv has loaded
import './src/app.js'; // This will execute app.js and configure the express app instance

connectDB()
.then(() => {
    server.listen(PORT, () => { // Hum app.listen nahi, server.listen call karenge
        console.log(`🚀 Server is running at port: ${PORT}`);
    });

    server.on("error", (error) => {
        console.log("SERVER ERROR: ", error);
        throw error;
    });
})
.catch((err) => {
    console.log("❌ MONGO DB connection failed !!! ", err);
});