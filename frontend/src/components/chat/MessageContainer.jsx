import React, { useState, useEffect, useRef } from 'react';
import apiClient from '../../api';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

const Message = ({ message, isOwnMessage }) => (
    <div className={`message ${isOwnMessage ? 'sent' : 'received'}`}>
        <div className="message-bubble">{message.message}</div>
    </div>
);

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form className="message-input-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Type a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit">Send</button>
        </form>
    );
};

const MessageContainer = ({ selectedUser }) => {
    const [messages, setMessages] = useState([]);
    const { authUser } = useAuth();
    const { socket } = useSocket();
    const messagesEndRef = useRef(null);

    // Effect for fetching initial messages
    useEffect(() => {
        const getMessages = async () => {
            if (selectedUser) {
                try {
                    const res = await apiClient.get(`/messages/${selectedUser._id}`);
                    setMessages(res.data.data);
                } catch (error) {
                    console.error("Failed to fetch messages", error);
                    setMessages([]);
                }
            }
        };
        getMessages();
    }, [selectedUser]);

    // Effect for listening to new messages
    useEffect(() => {
        if (socket) {
            const handleNewMessage = (newMessage) => {
                // Check if the message belongs to the current conversation
                if (newMessage.senderId === selectedUser?._id || newMessage.senderId === authUser._id) {
                    setMessages((prev) => [...prev, newMessage]);
                }
            };
            socket.on("newMessage", handleNewMessage);
            return () => socket.off("newMessage", handleNewMessage);
        }
    }, [socket, selectedUser, authUser]);
    
    // Effect for scrolling to the bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (message) => {
        try {
            const res = await apiClient.post(`/messages/send/${selectedUser._id}`, { message });
            setMessages([...messages, res.data.data]);
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    if (!selectedUser) {
        return <div className="message-container-placeholder">Select a user to start chatting</div>;
    }

    return (
        <div className="message-container">
            <div className="message-header">
                <img src={selectedUser.profilePicture} alt={selectedUser.fullName} />
                <h3>{selectedUser.fullName}</h3>
            </div>
            <div className="messages-list">
                {messages.map((msg) => (
                    <Message key={msg._id} message={msg} isOwnMessage={msg.senderId === authUser._id} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={handleSendMessage} />
        </div>
    );
};

export default MessageContainer;