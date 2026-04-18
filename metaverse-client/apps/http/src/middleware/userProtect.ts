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
  const token = req.headers.token;

  try {
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
    
    //@ts-ignore
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      return res.status(203).json({
        message: "Invalid or token expire",
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

    next();
  } catch (error) {}
};
