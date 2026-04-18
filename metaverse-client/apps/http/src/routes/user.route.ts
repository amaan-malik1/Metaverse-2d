import { Router } from "express";
import { updateMetadata, usersMetadata } from "../controllers/user.controller.js";

const userRouter:Router = Router();

userRouter.post('/metadata', updateMetadata);
userRouter.get('/metadata/bulk/:ids', usersMetadata);




export default userRouter;
