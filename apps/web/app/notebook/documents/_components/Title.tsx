"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useRef, useState } from "react";
import { NoteType } from "@/lib/db/schema";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import React from "react";

type Props = { note: NoteType };
const Title = ({ note }: Props) => {
    const [editorState, setEditorState] = useState(
        note.editorState || `${note.name}`
      );
//   const update = useMutation(api.documents.update);
const saveNote = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/saveNote", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });
  const ref = useRef<HTMLInputElement>(null);

  const [title_, setTitle] = useState<string>(note.name || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    setTitle(note.name);
    setIsEditing(true);
    setTimeout(() => {
      ref.current?.focus();
      ref.current?.setSelectionRange(0, ref.current.validationMessage.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value);
    saveNote.mutate(undefined, {
        onSuccess: (data) => {
          console.log("success update!", data);
        },
        onError: (err) => {
          console.error(err);
        },
      });
  };

  const onKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className="flex items-center gap-x-1">
      {/* {!!initialData.icon && <p>{initialData.icon}</p>} */}
      {isEditing ? (
        <Input
          value={title_}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          ref={ref}
          className="h-7 px-2 focus-visible:ring-transparent"
        />
      ) : (
        <Button
          onClick={enableInput}
          variant={"ghost"}
          size={"sm"}
          className="font-normal h-auto p-1"
        >
          <span className="truncate">{title_}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;
