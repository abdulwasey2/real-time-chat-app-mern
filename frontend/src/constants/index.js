// API Base URL
export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1';

// Socket.io Event Constants
export const SOCKET_EVENT_NAMES = {
    // Default events
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    // Custom events
    GET_ONLINE_USERS: 'getOnlineUsers',
    NEW_MESSAGE: 'newMessage',
    
    // Typing indicator events
    TYPING_START: 'typingStart',
    TYPING_STOP: 'typingStop',
};