import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // 1. Token ko access karna (cookie ya header se)
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // 2. Token ko verify karna
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // 3. Database se user find karna
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            // Kuch cases mein token valid ho sakta hai lekin user DB mein nahi
            throw new ApiError(401, "Invalid Access Token");
        }

        // 4. Request object mein user ko attach karna
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});