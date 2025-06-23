import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

// Yeh hook AuthContext ko access karne ka aik shortcut faraham karta hai.
const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default useAuth;