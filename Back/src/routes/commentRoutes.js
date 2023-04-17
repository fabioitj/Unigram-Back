import express from "express";
import CommentController from "../controllers/commentController.js";

const router = express.Router();

router
    .get("/comment/:id", CommentController.get_comments_by_publication)
    .post("/comment", CommentController.create_comment)
    .put("/comment/:id", CommentController.update_comment)
    .delete("/comment/:id", CommentController.delete_comment);

export default router;