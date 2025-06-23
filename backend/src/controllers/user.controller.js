import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";

const getUsersForSidebar = asyncHandler(async (req, res) => {
    const loggedInUserId = req.user._id;

    // Find all users except the logged-in user
    const allUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password -refreshToken");

    res.status(200).json(
        new ApiResponse(200, allUsers, "Users fetched successfully")
    );
});

export { getUsersForSidebar };