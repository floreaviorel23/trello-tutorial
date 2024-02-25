"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateBoardSchema } from "@/schemas/board";
import { createBoard } from "@/actions/create-board";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import FormPicker from "@/components/form/form-picker";

import { useForm } from "react-hook-form";
import { useTransition } from "react";

function BoardsForm() {
  // Disable all form fields and submit button after submitting
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CreateBoardSchema>>({
    resolver: zodResolver(CreateBoardSchema),
    defaultValues: {
      title: "",
      image: "",
    },
  });

  // Need to use the setValue function in form-picker, in order to set
  // the image field (cant control it directly using form.control)
  const { setValue } = form;

  function onSubmit(values: any) {
    startTransition(() => {
      // ------ Call createBoard server action --------------
      createBoard(values).then((data) => {
        if (data.success) {
          toast.success(data.success, { duration: 3000 });
        }
        if (data.error) {
          toast.error(data.error, { duration: 3000 });
        }
      });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Form Picker */}
        <FormPicker setValue={setValue} />

        {/* Form Image Input */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="hidden"
                  id="image"
                  type="text"
                  readOnly
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Form Title Input */}
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

        {/* Submit Button */}
        <Button disabled={isPending} className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default BoardsForm;
