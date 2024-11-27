import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import InlineMathView from "../mathquill/inlineMathView";
console.log("view 0");
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    inlineMath: {
      /**
       * Comments will be added to the autocomplete.
       */
      addInlineMath: (attributes?: { content: string }) => ReturnType;
    };
  }
}

export default Node.create({
  name: "inlineMath",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      content: {
        default: "",
        renderHTML: (attributes) => {
          return {
            content: attributes.content,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `div[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ["div", mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineMathView);
  },

  addCommands() {
    return {
      addInlineMath:
        (attrs) =>
        ({ tr, commands }) => {
          const { from, to } = tr.selection;
          commands.insertContent({
            type: this.name,
            attrs,
          });
          return commands.setTextSelection(from);
        },
    };
  },
});
