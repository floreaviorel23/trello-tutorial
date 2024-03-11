"use server";

import { UpdateBoardSchema } from "@/schemas/board";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

export async function updateBoard(values: z.infer<typeof UpdateBoardSchema>) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = UpdateBoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields :c" };
  }

  const { title, boardId } = validatedFields.data;

  let board;

  try {
    board = await db.board.update({
      where: {
        id: boardId,
        orgId,
      },
      data: {
        title,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to update." };
  }

  revalidatePath(`/board/${boardId}`);
  return { board, success: "Board updated successfully!" };
}
