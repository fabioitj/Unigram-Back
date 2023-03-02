import express from "express";
import cors from "cors";
import users from "./userRoutes.js"


const routes = (app) => {
    app.use(
        express.json(),
        cors({
            origin: 'http://localhost:3001',
        }),
        users
    );

}

export default routes;