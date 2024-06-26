"use server";

import { DeleteBoardSchema } from "@/schemas/board";
import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function deleteBoard(values: z.infer<typeof DeleteBoardSchema>) {
  const { userId, orgId } = auth();
  if (!userId || !orgId) {
    return { error: "Unauthorized!" };
  }

  const validatedFields = DeleteBoardSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields :c" };
  }

  const { boardId } = validatedFields.data;

  try {
    await db.board.delete({
      where: {
        id: boardId,
        orgId,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete." };
  }

  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`);
}
