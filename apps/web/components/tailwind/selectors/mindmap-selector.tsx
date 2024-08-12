import { Button } from "@/components/tailwind/ui/button";
import { PopoverContent } from "@/components/tailwind/ui/popover";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Check, Trash } from "lucide-react";
import { useEditor } from "novel";
import { useEffect, useRef } from "react";
import FirecrawlApp from "@mendable/firecrawl-js";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

const api_key_crawler = "fc-52580c7520c244e1a16884109db6b611"
const app = new FirecrawlApp({ apiKey: api_key_crawler });



export function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch (_e) {
      return false;
    }
  }
  export function getUrlFromString(str: string) {
    if (isValidUrl(str)) return str;
    try {
      if (str.includes(".") && !str.includes(" ")) {
        return new URL(`https://${str}`).toString();
      }
    } catch (_e) {
      return null;
    }
  }
  interface MindMapSelectorProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
  }
  
  export const MindMapSelector =  ({ open, onOpenChange }: MindMapSelectorProps) => {

    const inputRef = useRef<HTMLInputElement>(null);
    const { editor } = useEditor();
  
    // Autofocus on input by default
    useEffect(() => {
      inputRef.current?.focus();
    });
    if (!editor) return null;

    const fetchContent = useMutation({
      mutationFn: async (url:string) => {
        const params = {
          pageOptions: {
            onlyMainContent: true
          }
        };
        const content = await app.scrapeUrl(url , params);
        return content.data;
      },
    });
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLFormElement;
      const input = target[0] as HTMLInputElement;
      const url = getUrlFromString(input.value);
      const selection = editor.view.state.selection;
      fetchContent.mutate(url, {
        onSuccess: ({ content }) => {
          console.log(content);
          editor.chain().focus().insertContentAt(selection.to + 1,content).run();
        },
        onError: (error) => {
          console.error(error);
          window.alert("Failed to crawl url");
        },
      });

      
    };
  
    return (
      <Popover modal={true} open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button size="sm" variant="ghost" className="gap-2 rounded-none border-none">
            <p className="text-base">↗</p>
            <p
              className={cn("underline decoration-stone-400 underline-offset-4", {
                "text-blue-500": editor.isActive("link"),
              })}
            >
              Parser
            </p>
          </Button>
        </PopoverTrigger>
        <PopoverContent asChild className="w-60 p-0" sideOffset={10} >
          <form
            onSubmit={ handleSubmit }
            className="flex  p-1 "
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Paste a link"
              className="flex-1 bg-background p-1 text-sm outline-none"
              defaultValue={editor.getAttributes("link").href || ""}
            />
            {editor.getAttributes("link").href ? (
              <Button
                size="icon"
                variant="outline"
                type="button"
                className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
                onClick={() => {
                  editor.chain().focus().unsetLink().run();
                  inputRef.current.value = "";
                }}
              >
                <Trash className="h-4 w-4" />
              </Button>
            ) : (
              <Button size="icon" className="h-8">
                <Check className="h-4 w-4" />
              </Button>
            )}
          </form>
        </PopoverContent>
      </Popover>
    );
  };
  