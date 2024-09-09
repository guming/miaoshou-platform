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
      addInlineMath: (attributes?: { language: string }) => ReturnType;
    };
  }
}

export default Node.create({
  name: "inlineMath",

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  // content: "inline*",

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
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return ["span", mergeAttributes({ "data-type": this.name }, this.options.HTMLAttributes, HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(InlineMathView);
  },

  addCommands() {
    return {
      addInlineMath:
        (attrs) =>
        ({ tr, commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs,
          });
        },
    };
  },
});
