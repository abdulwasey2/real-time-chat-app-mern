/**
 * @description Date object ko "hh:mm AM/PM" format mein convert karta hai.
 * @param {Date | string} date - The date to format.
 * @returns {string} - Formatted time string.
 */
export const formatTime = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
};

/**
 * @description Response se error message extract karta hai.
 * @param {object} error - The error object from axios/fetch.
 * @returns {string} - A user-friendly error message.
 */
export const getErrorMessage = (error) => {
    if (error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
    }
    return error.message || 'An unexpected error occurred. Please try again.';
};