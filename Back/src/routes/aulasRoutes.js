import express from "express";
import AulasController from "../controllers/aulasController.js";
import { checkToken } from "./auth.js";

const router = express.Router();

router
    .get("/aulas/:id", AulasController.getAulaById)
    .post("/aulas", AulasController.inserirAulaPorModulo)
    .put("/aulas/:id", AulasController.alterarAulaPorModulo)
    .delete("/aulas/:id", AulasController.removerAulaPorModulo);

export default router;