import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    // Agar error hamari banayi hui ApiError class ka hai, to uske mutabiq response bhejein
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: err.errors,
        });
    }

    // Agar koi unexpected error hai, to ek generic response bhejein
    console.error("An unexpected error occurred:  debilitating", err);
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};

export { errorHandler };