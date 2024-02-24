"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";

interface BoardProps {
  id: string;
  title: string;
}

function Board({ title, id }: BoardProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex justify-between">
      <div>Board title : {title}</div>
      <Button
        onClick={() => {
          startTransition(() => {
            deleteBoard(id);
          });
        }}
        variant="destructive"
        size="sm"
        disabled={isPending}
      >
        Delete
      </Button>
    </div>
  );
}

export default Board;
