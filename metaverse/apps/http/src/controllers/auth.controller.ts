import type { Request, Response } from "express";

//signup controller
export const signup = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return false;
  };

  const userExist = await 


};

//signin controller
export const signin = async (req: Request, res: Response) => {};
