import type { Request, Response } from "express";
import { UpdateMetadataSchema } from "../types/index.js";
import { prismaClient } from "@repo/db/prismaClient";

export const updateMetadata = async (req: Request, res: Response) => {
  const parsedMetadata = UpdateMetadataSchema.safeParse(req.body);
  if (!parsedMetadata) {
    return;
  }

  await prismaClient.user.update({
    where: {
      id: req.userId,
    },
    data: {
      avatarId: parsedMetadata.data?.avatarId,
    },
  });

  res.json({
    message: "Metadata updated!",
  });
};

export const usersMetadata = async (req: Request, res: Response) => {
  const userIdsString = (req.query.ids ?? "[]") as string; /// ?? "[]" this tell the optional value ||string | string[] | undefined hoskta h
  const userIds = userIdsString.slice(1, userIdsString?.length - 1).split(","); /// slice logic will remove []

  //   userIdsString  =  "[123,456,789]"
  // after slice    =  "123,456,789"
  // after split    =  ["123", "456", "789"]

  const usersMetadatBulk = await prismaClient.user.findMany({
    where: {
      id: {
        in: userIds,
      },
    },
    select: {
      avatar: true,
    },
  });

  res.status(200).json({
    avatars: usersMetadatBulk.map((m) => ({
      userId: m.id,
      avatarId: m.avatar?.imageUrl,
    })),
  });
};
