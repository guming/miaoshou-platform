import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
    ChevronDown,
    ChevronRight,
    LucideIcon,
    MoreHorizontal,
    Plus,
    Trash,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";

type IProps = {
    id?: string;
    documentIcon?: string;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
  };
  
  export const Item =  ({
    active,
    documentIcon,
    expanded,
    onExpand,
    id,
    isSearch,
    level = 0,
    icon: Icon,
    label,
    onClick,
  }: IProps) => {
    const  {user} =  useUser();
    const router = useRouter();

    const createNotebook = useMutation({
        mutationFn: async (title) => {
          const response = await axios.post("/api/createNote", {
            name: title,
          });
          return response.data;
        },
      });

    const handleExpand = (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      onExpand?.();
    };
  
    // const archive = useMutation(api.documents.archive);


    const deleteNote = useMutation({
        mutationFn: async (noteId) => {
          const response = await axios.post("/api/deleteNote", {
            noteId,
          });
          return response.data;
        },
      });
    const onArchive = (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      if (!id) return;
  
      deleteNote.mutate(undefined, {
        onSuccess: () => {
          router.push("/notebook/dashboard");
        },
        onError: (err) => {
          console.error(err);
        },
      });
    };
    
  
    const onCreate = (ev: React.MouseEvent<HTMLDivElement>) => {
      ev.stopPropagation();
      if (!id) return;
  
      createNotebook.mutate(undefined, {
        onSuccess: ({ note_id }) => {
          console.log("created new note:", { note_id });
          // uploadImage.mutate(note_id);
          router.push(`/notebook/${note_id}`);
        },
        onError: (error) => {
          console.error(error);
          window.alert("Failed to create new notebook");
        },
      });
    };
    const ChevronIcon = expanded ? ChevronDown : ChevronRight;
  
    return (
      <div
        onClick={onClick}
        role="button"
        className={cn(
          "group mib-h-[27p] pr-3 w-full hover:bg-primary/5 py-1 items-center flex font-medium text-muted-foreground",
          active && "bg-primary/5 text-primary"
        )}
        style={{ paddingLeft: level ? `${level * 12 + 12}px` : "12px" }}
      >
        {!!id && (
          <div
            role="button"
            className="h-full rounded-sm hover:bg-neutral-300 mr-1"
            onClick={handleExpand}
          >
            <ChevronIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
          </div>
        )}
        {documentIcon ? (
          <div className="shrink-0 mr-2 text-[18px]">{documentIcon}</div>
        ) : (
          <Icon className="shrink-0 h-[18px] mr-2 text-muted-foreground" />
        )}
        <span className="truncate">{label}</span>
        {isSearch && (
          <kbd className="text-xs ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-2 font-mono font-medium text-muted-foreground">
            <span>Ctrl + K</span>
          </kbd>
        )}
        {!!id && (
          <div className="ml-auto flex items-center gap-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(ev) => ev.stopPropagation()}>
                <div
                  role="button"
                  className="opacity-0 ml-auto group-hover:opacity-100 rounded-sm hover:bg-neutral-300 h-full"
                >
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-60"
                align="start"
                side="right"
                forceMount
              >
                <DropdownMenuItem onClick={onArchive}>
                  <Trash className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="text-xs text-muted-foregroundp-2">
                  {/* Last edited by: {user?.fullName} */}asd
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <div
              role="button"
              onClick={onCreate}
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300"
            >
              <Plus className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
    return (
      <div
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : "12px",
        }}
        className="flex gap-x-2 py-[3px]"
      >
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-[30%]" />
      </div>
    );
  };
  