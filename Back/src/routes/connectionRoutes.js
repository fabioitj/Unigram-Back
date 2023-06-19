import express from "express";
import ConnectionController from "../controllers/connectionController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/connection", checkToken, ConnectionController.get_connections_by_logged_user)
    .get("/connection/:id", checkToken, ConnectionController.get_connections_by_user)
    .post("/connection/request", checkToken, ConnectionController.request_connection)
    .put("/connection/accept", checkToken, ConnectionController.accept_connection)
    .put("/connection/deny", checkToken, ConnectionController.deny_connection)
    .put("/connection/block", checkToken, ConnectionController.block_connection)
    .delete("/connection/:id", checkToken, ConnectionController.delete_connection);

export default router;