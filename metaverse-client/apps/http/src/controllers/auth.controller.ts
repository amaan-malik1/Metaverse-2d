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
  console.log("JWT_SECRET_KEY: ", JWT_SECRET_KEY);

  try {
    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);
    console.log("hashed pass:", hashedPassword);

    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        password: hashedPassword,
        role: parsedData.data.type === "admin" ? "Admin" : "User",
      },
    });

    console.log("user creation: ", user.email);

    res.json({
      userId: user.id,
      user,
      message: "Signup successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "User already existed hereee!",
    });
    console.log("Error in signup controller: ", error);
  }
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

    // let payload =;

    if (!JWT_SECRET_KEY) {
      return console.log("Internal server error");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role,
      },
      JWT_SECRET_KEY,
      { expiresIn: "7d" },
    );

    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json({
      message: "Login succeed",
      token,
    });
  } catch (error) {
    res.status(403).json({
      message: "Internal server error in login controller",
    });
    console.log("Error while login: ", error);
  }
};

// logout controller
export const logout = (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout success!",
    });
  } catch (error) {
    res.status(403).json({
      message: "Internal server error while logout",
    });
    console.log("Error while logout: ", error);
  }
};
