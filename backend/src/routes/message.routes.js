import { Router } from "express";
import { sendMessage, getMessages } from "../controllers/message.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All routes here are protected
router.use(verifyJWT);

router.route("/:id").get(getMessages);
router.route("/send/:id").post(sendMessage);

export default router;