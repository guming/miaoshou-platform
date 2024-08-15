import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
type DrawNode = { attrs: JSX.Element };
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const DrawComponent = ({ node }: any) => {
  console.log("node", node);
  const component = node?.attrs?.src;
  console.log("component:", component);
  return (
    <NodeViewWrapper>
      <div data-draw="" style={{ height: "500px" }}>
        {component ? component : <div>Placeholder</div>}
      </div>
    </NodeViewWrapper>
  );
};
export interface DrawOptions {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  HTMLAttributes: Record<string, any>;

  /**
   * Controls if the twitter node should be inline or not.
   * @default false
   * @example true
   */
  inline: boolean;

  /**
   * The origin of the tweet.
   * @default ''
   * @example 'https://tiptap.dev'
   */
  origin: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    draw: {
      /**
       * Insert a Draw
       * @param src string
       * @example editor.commands.setDraw()
       */
      setDraw: (src: DrawNode) => ReturnType;
    };
  }
}

export const Draw = Node.create<DrawOptions>({
  name: "Excalidraw",

  addOptions() {
    return {
      HTMLAttributes: {},
      inline: false,
      origin: "",
    };
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  addNodeView() {
    console.log(this.options.HTMLAttributes);
    return ReactNodeViewRenderer(DrawComponent, this.options.HTMLAttributes);
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  parseHTML() {
    return [
      {
        tag: "div[data-draw]",
      },
    ];
  },

  addCommands() {
    return {
      setDraw:
        (src: DrawNode) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: src,
          });
        },
    };
  },

  renderHTML({ HTMLAttributes }) {
    console.log("draw", HTMLAttributes);
    return ["div", mergeAttributes({ "data-draw": "" }, HTMLAttributes)];
  },
});
