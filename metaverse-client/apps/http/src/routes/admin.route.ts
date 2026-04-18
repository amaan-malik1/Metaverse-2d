import { Router } from "express";
import {
  createAvatar,
  createElement,
  createMap,
  updateElement,
} from "../controllers/admin.controller.js";
import { deleteElement } from "../controllers/space.controller.js";

const adminRouter:Router = Router();

adminRouter.post("/element", createElement);
adminRouter.post("/avatar", createAvatar);
adminRouter.post("/map", createMap);
adminRouter.put("/element/:id", updateElement);
adminRouter.delete("/element/:id", deleteElement);

export default adminRouter;
