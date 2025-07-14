import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuth();

    useEffect(() => {
        if (authUser) {
            // Socket connection create karein
            const newSocket = io("https://real-time-chat-app-backend-l2od.onrender.com/", {
                query: { userId: authUser._id },
            });

            setSocket(newSocket);

            // Online users ki list listen karein
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup function: component unmount hone par socket close karein
            return () => newSocket.close();
        } else {
            // Agar user logout ho jaye to socket close karein
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // ESLint warning hatane ke liye; // socket ko dependency mein add karne ki zaroorat nahi;

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};