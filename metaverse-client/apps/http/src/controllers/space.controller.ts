import type { Request, Response } from "express";
import { CreateMapSchema } from "../types/index.js";
import { prismaClient } from "@repo/db/prismaClient";

// creating space
export const createSpace = async (req: Request, res: Response) => {
  const parsedData = CreateMapSchema.safeParse(req.body);
  try {
    await prismaClient.space.create({
      data: {
        name: parsedData.data?.name,
        thumbnail: parsedData.data?.thumbnail,
        x: parsedData.data?.dimensions.split("x")[0],
        y: parsedData.data?.dimensions.split("x")[0],
        creatorId: req.userId,
      },
    });

    res.status(200).json({
      message: "Space created!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal server error at space creation",
    });
    console.log("Error while creating space: ", error);
  }
};

// gettting my spaces
export const allMySpace = async (req: Request, res: Response) => {
  const spaceId = req.query;
  try {
    const mySpace = await prismaClient.space.findUnique({
      where: {
        id: spaceId,
        creatorId: req.userId,
      },
    });

    res.status(200).json({
      message: "Fetched all my spaces",
      mySpace,
    });
  } catch (error) {
    res.status(400).json({
      message: "INternal server error",
    });
    console.log("Error while fetching my spaces: ", error);
  }
};

// deleting my space
export const deleteSpace = async (req: Request, res: Response) => {
  const spaceId = req.query;
  try {
    await prismaClient.space.delete({
      where: {
        id: spaceId,
        creatorId: req.userId,
      },
    });

    res.status(200).json({
      message: "Space deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: "Internal server error in delete space",
    });
    console.log("Error while deleting space: ", error);
  }
};

//get space
export const getSpace = async (req: Request, res: Response) => {};
export const addElement = async (req: Request, res: Response) => {};
export const deleteElement = async (req: Request, res: Response) => {};
export const allElemets = async (req: Request, res: Response) => {};
