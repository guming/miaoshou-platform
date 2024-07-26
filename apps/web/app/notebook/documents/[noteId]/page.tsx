import NoteEditor from "@/components/NoteEditor";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { auth ,currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

import { Button } from "@/components/tailwind/ui/button";
import Menu from "@/components/tailwind/ui/menu";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import DeleteButton from "@/components/DeleteButton";


type Props = {
  params: {
    noteId: string;
  };
};

const NotebookPage = async ({ params: { noteId } }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/notebook/dashboard");
  }
  const notes = await db
    .select()
    .from($notes)
    .where(and(eq($notes.id, parseInt(noteId)), eq($notes.userId, userId)));

  if (notes.length != 1) {
    return redirect("/notebook/dashboard");
  }
  const note = notes[0];
  return (
    <div className="flex min-h-screen flex-col items-center gap-4 py-4 sm:px-5">
      <div className="flex w-full max-w-screen-lg items-center gap-2 px-1 sm:mb-[calc(2vh)]">
          <Button>
            <Link href="/notebook/documents">Assistant</Link>
          </Button>
          <div>{note.name}</div>
          <div className="ml-auto">
            <DeleteButton noteId={note.id} />
          </div>
          <Menu />
      </div>
      <NoteEditor note={note}></NoteEditor>
    </div>
  );
};

export default NotebookPage;

