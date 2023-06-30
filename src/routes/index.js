import express from "express";
import cors from "cors";
import marca from "./marcaRoutes.js"
import modelo from "./modeloRoutes.js"
import carro from "./carroRoutes.js"

const routes = (app) => {
    app.use(
        express.json(),
        cors({
            origin: 'http://localhost:19006',
        }),
        marca,
        modelo,
        carro
    );
}

export default routes;