import express from "express";
import cors from "cors";
import users from "./userRoutes.js"
import publications from "./publicationRoutes.js";
import comments from "./commentRoutes.js";


const routes = (app) => {
    app.use(
        express.json(),
        cors({
            origin: 'http://localhost:3001',
        }),
        users,
        publications,
        comments,
    );

}

export default routes;