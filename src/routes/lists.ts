import { Router } from "express";
import * as listsController from "../controllers/lists";
import ensureAuth from "../middleware/auth";

const routes = Router();

routes.get("/", ensureAuth, listsController.getAll);

routes.get("/:id", listsController.getList);

routes.post("/createList", listsController.createList);

routes.put("/makeActive/:id", ensureAuth, listsController.makeActive);

routes.delete("/deleteList/:id", ensureAuth, listsController.deleteList);

export default routes;
