// API responses ko standardize karne ke liye ek class
class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; // status code 400 se kam hai to response successful hai
    }
}

export { ApiResponse };