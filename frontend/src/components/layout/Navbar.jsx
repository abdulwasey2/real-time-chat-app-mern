import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api';
import toast from 'react-hot-toast';

const Navbar = () => {
    const { authUser, setAuthUser } = useAuth();
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
        <nav className="navbar">
            <div className="navbar-brand">
                <h3>MERN Chat</h3>
            </div>
            {authUser && (
                <div className="navbar-user">
                    <span>Welcome, {authUser.fullName}</span>
                    <button onClick={handleLogout} className="logout-btn-nav">Logout</button>
                </div>
            )}
        </nav>
    );
};

export default Navbar;