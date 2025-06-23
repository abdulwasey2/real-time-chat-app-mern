import { Router } from "express";
import { getUsersForSidebar } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(verifyJWT); // Protect all user routes

router.route("/").get(getUsersForSidebar);

export default router;