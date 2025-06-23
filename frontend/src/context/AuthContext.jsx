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

    // Yeh effect component mount hone par check karega ke user pehle se logged in hai ya nahi
    // Hum user data ko localStorage mein store kar sakte hain taake page refresh par state na gume
    useEffect(() => {
        const storedUser = localStorage.getItem("chat-user");
        if (storedUser) {
            try {
                setAuthUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem("chat-user");
            }
        }
        setLoading(false);
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