import express from "express";
import cors from "cors";
import users from "./userRoutes.js"
import publications from "./publicationRoutes.js";
import comments from "./commentRoutes.js";
import connections from "./connectionRoutes.js";
import messages from "./messageRoutes.js";


const routes = (app) => {
    app.use(
        express.json(),
        cors({
            origin: 'http://localhost:19006',
        }),
        users,
        publications,
        comments,
        connections,
        messages
    );

}

export default routes;