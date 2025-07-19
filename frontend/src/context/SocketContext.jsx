// frontend\src\context\SocketContext.jsx

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
            // Socket connection banao
            const newSocket = io("https://real-time-chat-app-backend-l2od.onrender.com/", {
                query: { userId: authUser._id },
            });

            setSocket(newSocket);

            // Online users listen karo
            newSocket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            // Cleanup: Yeh sirf tab chalay ga jab effect dobara chalay ya component unmount ho
            return () => {
                newSocket.close();
                setSocket(null); // Yeh add kiya taake state clear ho
            };
        } else {
            // Agar user logout ho, to socket close karo
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]); // eslint-disable-next-line react-hooks/exhaustive-deps
    // Upar wali line bohot zaroori hai! Yeh ESLint ko batati hai ke hum jaan boojh kar socket ko ignore kar rahe hain, warna warning aay gi lekin code sahi chalay ga.

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};