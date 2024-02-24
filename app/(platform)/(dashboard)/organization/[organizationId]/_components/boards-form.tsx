"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { CreateBoardSchema } from "@/schemas/board";
import { useTransition } from "react";

function BoardsForm() {
  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
    },
  });

  const [isPending, startTransition] = useTransition();

  function onSubmit(values: z.infer<typeof CreateBoardSchema>) {
    startTransition(() => {
      createBoard(values);
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex h-24"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Board title</FormLabel>
              <FormControl>
                <Input
                  id="title"
                  required
                  disabled={isPending}
                  placeholder="Enter a board title"
                  className="border-black border p-1 rounded-sm"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="ml-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default BoardsForm;
