"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const CreateBoardSchema = z.object({
  title: z.string(),
});

export async function createBoard(formData: FormData) {
  const { title } = CreateBoardSchema.parse({
    title: formData.get("title"),
  });

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath("/organization/org_2caTs96RTO1NDsdt85HiERyicgL");
}
