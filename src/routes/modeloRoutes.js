import express from "express";
import ModeloController from "../controllers/modeloController.js";

const router = express.Router();

router
    .post("/modelo", ModeloController.add)
    .put("/modelo/:id", ModeloController.edit)
    .delete("/modelo/:id", ModeloController.delete)
    .get("/modelo", ModeloController.getAll)
    .get("/modelo/:id", ModeloController.getById);

export default router;