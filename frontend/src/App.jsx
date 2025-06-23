// frontend\src\App.jsx (Updated)
import React from 'react';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';

function App() {
    return (
        <>
            <AppRoutes />
            <Toaster position="top-right" />
        </>
    );
}

export default App;