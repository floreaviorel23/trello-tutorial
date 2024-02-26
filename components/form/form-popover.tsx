"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "../ui/popover";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import BoardsForm from "@/app/(platform)/(dashboard)/organization/[organizationId]/_components/boards-form";

import { ElementRef, useRef } from "react";

interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

function FormPopover({
  children,
  side = "bottom",
  sideOffset = 0,
  align,
}: FormPopoverProps) {
  // Ref hook to close the popover after successfully submiting the form
  const closeRef = useRef<ElementRef<"button">>(null);

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        className="w-80 pt-3"
        side={side}
        sideOffset={sideOffset}
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create board
        </div>

        <PopoverClose asChild>
          <Button
            ref={closeRef}
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4 " />
          </Button>
        </PopoverClose>

        {/* ----------- Boards Form ---------- */}
        <BoardsForm closeRef={closeRef} />
      </PopoverContent>
    </Popover>
  );
}

export default FormPopover;
