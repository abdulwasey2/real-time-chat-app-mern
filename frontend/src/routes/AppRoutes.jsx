import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Pages
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ChatPage from '../pages/ChatPage';

const AppRoutes = () => {
    const { authUser } = useAuth();

    return (
        <Routes>
            <Route 
                path="/" 
                element={authUser ? <ChatPage /> : <Navigate to="/login" replace />} 
            />
            <Route 
                path="/login" 
                element={authUser ? <Navigate to="/" replace /> : <LoginPage />} 
            />
            <Route 
                path="/register" 
                element={authUser ? <Navigate to="/" replace /> : <RegisterPage />} 
            />
        </Routes>
    );
};

export default AppRoutes;