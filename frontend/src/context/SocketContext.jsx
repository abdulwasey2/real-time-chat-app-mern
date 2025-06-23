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
        const newSocket = io("http://localhost:8000", {
            query: { userId: authUser._id },
        });

        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users);
        });

        return () => newSocket.close();
    } else {
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