"use server";

import { db } from "@/lib/db";
import { CreateBoardSchema } from "@/schemas/board";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createBoard(values: z.infer<typeof CreateBoardSchema>) {
  //console.log({ values: values });
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = CreateBoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields :c" };
  }

  const { title, image } = validatedFields.data;

  const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageLinkHTML ||
    !imageUserName
  )
    return { error: "Missing image fields. Failed to create board!" };

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imageId,
        imageThumbUrl,
        imageFullUrl,
        imageUserName,
        imageLinkHTML,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create." };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board, success: "Board created successfully!" };
}
