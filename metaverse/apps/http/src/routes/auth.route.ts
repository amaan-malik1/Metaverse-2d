import { Router } from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const authRouter = Router();

//routes
authRouter.post("/signup", signup);
authRouter.post("/login", signin);

export default authRouter;
