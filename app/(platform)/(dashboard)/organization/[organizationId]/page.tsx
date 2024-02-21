import { createBoard } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

async function OrganizationIdPage() {
  const boards = await db.board.findMany();

  return (
    <div className="flex flex-col space-y-4">
      <form action={createBoard}>
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1 rounded-sm"
          type="text"
        />

        <Button type="submit">Submit</Button>
      </form>

      <div className="space-y-2">
        {boards.map((board) => (
          <div key={board.id}>Board title : {board.title}</div>
        ))}
      </div>
    </div>
  );
}

export default OrganizationIdPage;
