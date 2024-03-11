"use client";
import { Board } from "@prisma/client";
import { Button } from "@/components/ui/button";

import { ElementRef, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";

interface BoardTitleFormProps {
  data: Board;
}

function BoardTitleForm({ data }: BoardTitleFormProps) {
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);

  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);

    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const form = useForm();

  function onSubmit(values: any) {
    if (!values.title || values.title === data.title) {
      disableEditing();
      return;
    }

    updateBoard({ title: values.title, boardId: data.id }).then((data) => {
      if (data.error) toast.error(data.error);
      if (data.success) {
        toast.success(data.success);
        setTitle(data.board.title);
        disableEditing();
      }
    });
  }

  function onBlur() {
    formRef.current?.requestSubmit();
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center gap-x-2"
        >
          {/* Form Input */}
          <FormField
            control={form.control}
            defaultValue={title}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    id="title"
                    className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline:none focus-visible:ring-transparent border-none"
                    type="text"
                    {...field}
                    // Can also use merge-ref
                    ref={inputRef}
                    onBlur={onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      className="font-bold text-lg w-auto h-auto p-1 px-2"
      variant="transparent"
    >
      {title}
    </Button>
  );
}

export default BoardTitleForm;
