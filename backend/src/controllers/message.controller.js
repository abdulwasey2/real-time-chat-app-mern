import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
// import { getReceiverSocketId, io } from "../../socket/socket.js"; // YEH LINE DUPLICATE THI
// import { getReceiverSocketId, io } from "../../socket/socket.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { SOCKET_EVENT_NAMES } from '../constants/index.js';

// sendMessage aur getMessages ka baaqi code bilkul aheek hai
// ...
const sendMessage = asyncHandler(async (req, res) => {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Chat.findOne({ participants: { $all: [senderId, receiverId] } });
    if (!conversation) {
        conversation = await Chat.create({ participants: [senderId, receiverId] });
    }
    const newMessage = new Message({ senderId, receiverId, message });
    if (newMessage) {
        conversation.messages.push(newMessage._id);
    }
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
        io.to(receiverSocketId).emit(SOCKET_EVENT_NAMES.NEW_MESSAGE, newMessage);
    }

    return res.status(201).json(new ApiResponse(201, newMessage, "Message sent successfully"));
});

const getMessages = asyncHandler(async (req, res) => {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Chat.findOne({
        participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) {
        return res.status(200).json(new ApiResponse(200, [], "Start a new conversation"));
    }

    return res.status(200).json(new ApiResponse(200, conversation.messages));
});

export { sendMessage, getMessages };