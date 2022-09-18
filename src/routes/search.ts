import { Router } from "express";
import * as moviesController from "../controllers/movies";
import ensureAuth from "../middleware/auth";

const routes = Router();

routes.get("/", ensureAuth, moviesController.searchMovies);

export default routes;
