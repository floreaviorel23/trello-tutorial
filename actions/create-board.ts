"use server";

import { db } from "@/lib/db";
import { CreateBoardSchema } from "@/schemas/board";
import { error } from "console";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createBoard(values: z.infer<typeof CreateBoardSchema>) {
  const validatedFields = CreateBoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields :c" };
  }

  const { title } = validatedFields.data;

  let board;
  try {
    board = await db.board.create({
      data: {
        title,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to create." };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board, success: "Board created successfully!" };
}
