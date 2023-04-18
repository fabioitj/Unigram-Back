import express from "express";
import PublicationController from "../controllers/publicationController.js";

const router = express.Router();

router
    .get("/publication/user/:id", PublicationController.get_publications_by_user)
    .get("/publication/:id", PublicationController.get_publication_by_id)
    .post("/publication", PublicationController.create_publication)
    .put("/publication/:id", PublicationController.update_publication)
    .put("/publication/like/:id", PublicationController.like_publication)
    .put("/publication/unlike/:id", PublicationController.unlike_publication)
    .delete("/publication/:id", PublicationController.delete_publication);

export default router;