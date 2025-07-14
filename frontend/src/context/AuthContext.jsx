// frontend\src\context\AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Context create karna
export const AuthContext = createContext();

// 2. Custom hook banana taake context ko aasani se use kiya ja sake
export const useAuth = () => {
    return useContext(AuthContext);
};

// 3. Context Provider component banana
export const AuthProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state taake initial check tak UI na dikhe

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("chat-user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // YEH CHECK BOHOT ZAROORI HAI
                // Hum check karenge ke user object mein _id hai ya nahi.
                if (parsedUser && parsedUser._id) {
                    setAuthUser(parsedUser);
                } else {
                    // Agar data aheek nahi to usay clear kar dein
                    localStorage.removeItem("chat-user");
                    setAuthUser(null);
                }
            }
        } catch (error) {
            console.error("Failed to parse stored user, clearing storage:", error);
            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    const value = {
        authUser,
        setAuthUser,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};