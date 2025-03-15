import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
export type GeometryState = { state: any };
import geometryView from "../desmos/geometryView";
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    geometry: {
      /**
       * Comments will be added to the autocomplete.
       */
      insertGeometryNode: (node: GeometryState) => ReturnType;
    };
  }
}

export const GeometryNode = Node.create({
  name: "GeometryNode",

  group: "block",

  atom: true,

  addAttributes() {
    return {
      state: {
        default: null, // default expression
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-geometry]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "geometry" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(geometryView);
  },

  addCommands() {
    return {
      insertGeometryNode:
        (state: GeometryState) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: state,
          });
        },
    };
  },
});
