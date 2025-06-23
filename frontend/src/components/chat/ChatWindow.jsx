import React, { useState } from 'react';
import Sidebar from '../layout/Sidebar';
import MessageContainer from './MessageContainer';

const ChatWindow = () => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="chat-main-layout">
            <Sidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
            <MessageContainer selectedUser={selectedUser} />
        </div>
    );
};

export default ChatWindow;