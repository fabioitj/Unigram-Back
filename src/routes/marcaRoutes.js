import express from "express";
import MarcaController from "../controllers/marcaController.js";

const router = express.Router();

router
    .post("/marca", MarcaController.add)
    .put("/marca/:id", MarcaController.edit)
    .delete("/marca/:id", MarcaController.delete)
    .get("/marca", MarcaController.getAll)
    .get("/marca/:id", MarcaController.getById);

export default router;