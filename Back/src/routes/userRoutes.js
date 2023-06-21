import express from "express";
import UserController from "../controllers/userController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/user", UserController.get_users)
    .get("/user/me", UserController.get_user_logged)
    .get("/user/search/:username", checkToken, UserController.get_users_by_search)
    .get("/user/:id", checkToken, UserController.get_user_by_id)
    .post("/user", UserController.create_user)
    .post("/login", UserController.login)
    .put("/user", checkToken, UserController.update_user)
    .delete("/user", checkToken, UserController.delete_user);

export default router;