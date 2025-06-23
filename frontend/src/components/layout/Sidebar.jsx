import React, { useState, useEffect } from 'react';
import apiClient from '../../api';
import { useSocket } from '../../context/SocketContext';

const Sidebar = ({ onSelectUser, selectedUser }) => {
    const [users, setUsers] = useState([]);
    const { onlineUsers } = useSocket();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await apiClient.get('/users');
                setUsers(res.data.data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>Chats</h3>
            </div>
            <ul className="user-list">
                {users.map((user) => {
                    const isOnline = onlineUsers.includes(user._id);
                    return (
                        <li 
                            key={user._id} 
                            className={`user-item ${selectedUser?._id === user._id ? 'selected' : ''}`}
                            onClick={() => onSelectUser(user)}
                        >
                            <div className="user-avatar">
                                <img src={user.profilePicture} alt={user.fullName} />
                                {isOnline && <div className="online-indicator"></div>}
                            </div>
                            <span>{user.fullName}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Sidebar;