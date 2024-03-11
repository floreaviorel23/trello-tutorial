import { z } from "zod";

export const CreateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required!",
      invalid_type_error: "Title is invalid!",
    })
    .min(3, "Min. 3 characters"),

  image: z
    .string({
      required_error: "Image is required!",
      invalid_type_error: "Image is invalid!",
    })
    .min(1, "Select an image"),
});

export const UpdateBoardSchema = z.object({
  title: z
    .string({
      required_error: "Title is required!",
      invalid_type_error: "Title is invalid!",
    })
    .min(3, "Min. 3 characters"),

  boardId: z.string(),
});

export const DeleteBoardSchema = z.object({
  boardId: z.string(),
});
