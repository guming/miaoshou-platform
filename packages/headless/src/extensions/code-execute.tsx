import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ColdBlockView from "../code-block/codeBlockView";
export interface CodeBlockOptions {
  HTMLAttributes: Record<string, string>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    codeSnippet: {
      /**
       * Insert code
       * @param src string
       * @example editor.commands.insertReactCode()
       */
      insertReactCode: () => ReturnType;
    };
  }
}

export const CodeSnippet = Node.create<CodeBlockOptions>({
  name: "codeSnippet",
  group: "block",

  addAttributes() {
    return {};
  },

  parseHTML() {
    return [
      {
        tag: "codapi-snippet",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ["codapi-snippet", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    console.log("load view");

    return ReactNodeViewRenderer(ColdBlockView);
  },
  addCommands() {
    return {
      insertReactCode:
        () =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
          });
        },
    };
  },
});
