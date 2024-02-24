import { db } from "@/lib/db";

import BoardsForm from "./_components/boards-form";
import Board from "./_components/board";

async function OrganizationIdPage() {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <BoardsForm />

      <div className="space-y-2">
        {boards.map((board) => (
          <Board key={board.id} title={board.title} id={board.id} />
        ))}
      </div>
    </div>
  );
}

export default OrganizationIdPage;
