import express from "express";
import MessageController from "../controllers/messageController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get('/messages', checkToken, MessageController.get_all_conversations)
    .get("/message", checkToken, MessageController.get_messages)
    .post("/message", checkToken, MessageController.send_message)
    .delete("/message/:id", checkToken, MessageController.delete_message);

export default router;