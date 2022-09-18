import { Router } from "express";
import * as authController from "../controllers/auth";
import * as homeController from "../controllers/home";
import ensureAuth from "../middleware/auth";

const routes = Router();

routes.get("/", homeController.getIndex);
routes.get("/login", authController.getLogin);
routes.post("/login", authController.postLogin);
routes.get("/logout", authController.logout);
routes.get("/signup", authController.getSignup);
routes.post("/signup", authController.postSignup);
routes.get("/changelog", homeController.getChangelog);

export default routes;
