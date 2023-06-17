import express from "express";
import CommentController from "../controllers/commentController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/comment/:id", checkToken, CommentController.get_comments_by_publication)
    .post("/comment", checkToken, CommentController.create_comment)
    .put("/comment/:id", checkToken, CommentController.update_comment)
    .delete("/comment/:id", checkToken, CommentController.delete_comment);

export default router;