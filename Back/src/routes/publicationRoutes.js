import express from "express";
import PublicationController from "../controllers/publicationController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/publication/feed", checkToken, PublicationController.get_publications_feed)
    .get("/publication/user/:id", checkToken, PublicationController.get_publications_by_user)
    .get("/publication/:id", checkToken, PublicationController.get_publication_by_id)
    .post("/publication", checkToken, PublicationController.create_publication)
    .put("/publication/:id", checkToken, PublicationController.update_publication)
    .put("/publication/like/:id", checkToken, PublicationController.like_publication)
    .put("/publication/unlike/:id", checkToken, PublicationController.unlike_publication)
    .delete("/publication/:id", checkToken, PublicationController.delete_publication);

export default router;