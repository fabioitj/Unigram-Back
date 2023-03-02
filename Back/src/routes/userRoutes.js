import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router
    .get("/user", UserController.get_users)
    .get("/user/:id", UserController.get_user_by_id)
    .post("/user", UserController.create_user)
    .put("/user/:id", UserController.update_user)
    .put("/user/follow/:id", await UserController.follow_user)
    .put("/user/unfollow/:id", await UserController.unfollow_user)
    .delete("/aulas/:id", UserController.delete_user);

export default router;