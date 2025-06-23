import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// Secured Routes (jin ke liye login hona zaroori hai)
router.route("/logout").post(verifyJWT, logoutUser);

export default router;