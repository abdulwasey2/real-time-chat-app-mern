import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/mern-chat-app`);
        console.log(`✅ MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error);
        process.exit(1); // Agar DB connect na ho to process ko exit kar dein
    }
};

export default connectDB;