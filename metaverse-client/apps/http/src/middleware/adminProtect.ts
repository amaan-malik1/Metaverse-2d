import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/index.js";
import { prismaClient } from "@repo/db/prismaClient";

const JWT_SECRET = JWT_SECRET_KEY;

export const userProtect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Unauthorized - No token provided",
    });
  }

  if (!JWT_SECRET) {
    return res.status(404).json({
      message: "Token not found!",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      role: string;
      userId: string;
    };

    if (decoded.role !== "Admin") {
      return res.status(203).json({
        message: "Unauthorised ",
      });
    }

    const userPresent = await prismaClient.user.findUnique({
      where: {
        //@ts-ignore
        id: decoded.userId,
      },
    });
    if (!userPresent) {
      return res.status(401).json({
        message: "Unauthorized - User not found",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {}
};
