import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
export type DesmosLatex = { latex: string };
import desmosView from "../desmos/desmosView";
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    desmos: {
      /**
       * Comments will be added to the autocomplete.
       */
      insertNode: (node: DesmosLatex) => ReturnType;
    };
  }
}

export const DesmosNode = Node.create({
  name: "DesmosNode",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      latex: {
        default: null, // default expression
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-desmos]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "desmos" }];
  },

  addNodeView() {
    console.log("load view");
    return ReactNodeViewRenderer(desmosView);
  },

  addCommands() {
    return {
      insertNode:
        (latex: DesmosLatex) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: latex,
          });
        },
    };
  },
});
