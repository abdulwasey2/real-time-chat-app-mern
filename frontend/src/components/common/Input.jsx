import React from 'react';

const Input = ({ type = 'text', name, value, onChange, placeholder, className = '' }) => {
    return (
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`input-field ${className}`}
            required
        />
    );
};

export default Input;