import { Router } from "express";
import { updateMetadata, usersMetadata } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post('/metadata', updateMetadata);
userRouter.get('/metadata/bulk/:ids', usersMetadata);




export default userRouter;
