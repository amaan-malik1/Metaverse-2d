import { Router } from "express";
import {
  updateMetadata,
  usersMetadata,
} from "../controllers/user.controller.js";
import { userProtect } from "../middleware/adminProtect.js";

const userRouter: Router = Router();

userRouter.post("/metadata", userProtect, updateMetadata);
userRouter.get("/metadata/bulk/:ids", userProtect, usersMetadata);

export default userRouter;
