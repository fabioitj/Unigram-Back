import express from "express";
import CarroController from "../controllers/carroController.js";

const router = express.Router();

router
    .post("/carro", CarroController.add)
    .put("/carro/:id", CarroController.edit)
    .delete("/carro/:id", CarroController.delete)
    .get("/carro", CarroController.getAll)
    .get("/carro/:id", CarroController.getById);

export default router;