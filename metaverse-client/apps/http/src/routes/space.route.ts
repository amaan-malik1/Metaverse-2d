import { Router } from "express";
import {
  addElement,
  allElemets,
  allMySpace,
  createSpace,
  deleteElement,
  deleteSpace,
  getSpace,
} from "../controllers/space.controller.js";

const spaceRouter: Router = Router();

spaceRouter.post("/", createSpace);
spaceRouter.get("/my-spaces", allMySpace);
spaceRouter.delete("/delete-space", deleteSpace);
spaceRouter.get("/:spaceId", getSpace);
spaceRouter.post("/element", addElement);
spaceRouter.delete("/element/:elementId", deleteElement);
spaceRouter.get("/elements", allElemets);

export default spaceRouter;
