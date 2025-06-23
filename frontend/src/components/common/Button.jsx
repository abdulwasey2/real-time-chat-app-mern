import React from 'react';

const Button = ({ children, onClick, disabled = false, className = '', type = 'button' }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`btn ${className}`}
        >
            {children}
        </button>
    );
};

export default Button;