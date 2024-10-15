"use client";
import { Button } from "@/components/tailwind/ui/button";
import { PopoverContent } from "@/components/tailwind/ui/popover";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { Toolbar } from "markmap-toolbar";
import { Markmap } from "markmap-view";
import { useEditor } from "novel";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import MarkmapHooks from "./markmapHooks";
import { MarkdownSerializer, defaultMarkdownSerializer } from '@tiptap/pm/markdown';
// import customMarkdownSerializer from "../markdownS"

function App(value) {
  return (
    <div>
      <MarkmapHooks value={value}/>
    </div>
  );
}


const customMarkdownSerializer = new MarkdownSerializer(
    {
      // Extend node serializers from default serializer
      ...defaultMarkdownSerializer.nodes,
      bulletList(state, node) {
        // Serialize bullet lists as Markdown using * or -
        console.log(node)
        state.renderList(node, "   ", () => (node.attrs.bullet || "- ") + " ")
      },
      listItem(state, node) {
        // state.write("")
        state.renderContent(node);
        state.ensureNewLine()
        // state.ensureNewLine();
      },
    },
    {
      // Use default mark serializers or add your own if needed
      ...defaultMarkdownSerializer.marks,
    }
  );


interface MindMapSelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const MindMapSelector = ({ open, onOpenChange }: MindMapSelectorProps) => {
  const { editor } = useEditor();
  // const [content, setContent] = useState(null);
  // const popoverContentRef = useRef(null);
  
  const handleSubmit = (e) => {
    const { from, to } = editor.view.state.selection;

    const selectedText = editor.view.state.doc.textBetween(from, to, ' \r\n  - '); 
    console.log("selectedText", selectedText)
    // 序列化文档为 Markdown
    const doc=editor.view.state.doc.cut(from, to)
    const markdown = customMarkdownSerializer.serialize(doc);
    // console.log("markdown",  markdown );// 提取选中文本
    const markdownValue= '# '+selectedText
    e.preventDefault();
    const target = e.currentTarget as HTMLFormElement;
    const input = target[0] as HTMLInputElement;
    const selection = editor.view.state.selection;
    const rootElement = document.createElement('div');
    rootElement.id = 'root';
    document.body.appendChild(rootElement);
    const root = createRoot(document.getElementById("root"));
    root.render(
      <App value={markdown}/>
  );
  // if (popoverContentRef.current){
  //   popoverContentRef.current=root;
  // }
    // editor
    //   .chain()
    //   .focus()
    //   .insertContentAt(selection.to + 1, root)
    //   .run();
  };

  return (
    <Popover modal={true} open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-2 rounded-none border-none" onClick={handleSubmit}>
          <p className="text-base">↗</p>
          <p
            className={cn("underline decoration-stone-400 underline-offset-4", {
              "text-blue-500": editor.isActive("link"),
            })}
          >
            MindMap
          </p>
        </Button>
      </PopoverTrigger>
      
    </Popover>
    // <div id="root">
    //   </div>
  );
};
