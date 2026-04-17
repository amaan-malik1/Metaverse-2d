import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { SigninSchema, SignupSchema } from "../types/index.js";
import { prismaClient } from "@repo/db/prismaClient";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";

//signup controller
export const signup = async (req: Request, res: Response) => {
  const parsedData = SignupSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Validation fail",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });

    res.json({
      userId: user.id,
      message: "Signup successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "User already existed!",
    });
  }

  // const userExist = await ;
};

//signin controller
export const signin = async (req: Request, res: Response) => {
  const parsedData = SigninSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Validation failed",
    });
  }

  try {
    const user = await prismaClient.user.findUnique({
      where: {
        email: parsedData.data.email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "user not found!",
      });
    }

    const passValid = await bcrypt.compare(
      parsedData.data.password,
      user.password,
    );

    if (!passValid) {
      return res.status(403).json({
        message: "Invalud password",
      });
    }

    let payload = {
      userId: user.id,
      role: user.role,
    };

    if (!JWT_SECRET_KEY) {
      return;
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY);

    res.status(200).json({
      message: "Login succeed",
      token,
    });
  } catch (error) {}
};
