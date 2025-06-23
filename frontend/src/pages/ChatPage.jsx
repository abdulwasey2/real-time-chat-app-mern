import React, { useState } from 'react';
// import Sidebar from '../components/chat/Sidebar';
import Sidebar from '../components/layout/Sidebar';
import MessageContainer from '../components/chat/MessageContainer';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState(null);
    const { setAuthUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiClient.post('/auth/logout');
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            toast.success("Logged out successfully!");
            navigate("/login");
        } catch (error) {
            toast.error("Logout failed. Please try again.");
        }
    };

    return (
        <div className="chat-page-container">
            <div className="logout-button-container">
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
            <div className="chat-main-layout">
                <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
                <MessageContainer selectedUser={selectedUser} />
            </div>
        </div>
    );
};

export default ChatPage;