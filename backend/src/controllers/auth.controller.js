import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

// Options for cookie
const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Sirf production mein secure hoga
};

/**
 * @description User registration controller
 * @route POST /api/v1/auth/register
 * @access Public
 */
const registerUser = asyncHandler(async (req, res) => {
    // 1. Request body se data extract karna
    const { fullName, username, email, password } = req.body;

    // 2. Validation: Koi field empty to nahi hai?
    if ([fullName, username, email, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    // 3. User ko check karna: Kya user pehle se exist karta hai?
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        throw new ApiError(409, "User with this email or username already exists"); // 409: Conflict
    }

    // 4. User object create karna aur database mein save karna
    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase(),
    });

    // 5. User object ko check karna: Kya user create hua?
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // 6. Response return karna
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

/**
 * @description User login controller
 * @route POST /api/v1/auth/login
 * @access Public
 */
const loginUser = asyncHandler(async (req, res) => {
    // 1. Request body se data extract karna (username ya email)
    const { email, username, password } = req.body;

    if (!email && !username) {
        throw new ApiError(400, "Username or email is required");
    }

    // 2. User ko find karna
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // 3. Password check karna
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials"); // 401: Unauthorized
    }

    // 4. Access aur Refresh tokens generate karna
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // 5. Refresh token ko database mein save karna
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // 6. User object se sensitive data remove karke response bhejna
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // 7. Cookies mein tokens set karna aur response bhejna
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(
            new ApiResponse(
                200,
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

/**
 * @description User logout controller
 * @route POST /api/v1/auth/logout
 * @access Private (Requires authentication)
 */
const logoutUser = asyncHandler(async (req, res) => {
    // User ID middleware se milegi (req.user)
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: { refreshToken: 1 }, // Refresh token ko database se remove karna
        },
        { new: true }
    );

    // Client ke paas se cookies clear karna
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };