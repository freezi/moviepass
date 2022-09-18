import { Router } from "express";
import * as moviesController from "../controllers/movies";
import ensureAuth from "../middleware/auth";

const routes = Router();

routes.post("/addMovie", ensureAuth, moviesController.addMovie);

routes.delete("/deleteMovie/:id", ensureAuth, moviesController.deleteMovie);

export default routes;
