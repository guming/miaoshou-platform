import { type Editor, Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import ReactDOM from "react-dom";
import { renderToString } from "react-dom/server";
const ExcalidrawWithClientOnly = dynamic(async () => (await import("./draw")).default, {
  ssr: false,
});
// import ExcalidrawComponent from "../excalidraw/ExcalidrawComponent";
export type DrawNode = { src: JSX.Element };

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const DrawComponent = ({ editor, data }: { editor: Editor; data: any | null }) => {
  // const [drawNode, setDrawNode] = useState<DrawNode | null>(null);
  useEffect(() => {
    return () => {
      console.log("Draw deleted");
    };
  }, []);

  // const component = node?.attrs.src;
  console.log("parameter editor", data);
  // setDrawNode(component);
  return (
    <>
      {/* <NodeViewWrapper> */}
      <ExcalidrawWithClientOnly editor={editor} data={data ? data : "[]"} />
      {/* </NodeViewWrapper> */}
    </>
  );
};

export interface DrawOptions {
  /**
   * Controls if the paste handler for tweets should be added.
   * @default true
   * @example false
   */
  addPasteHandler: boolean;
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
// const pasteRegex = /(Excalidraw)/g;
export const Draw = Node.create<DrawOptions>({
  name: "Excalidraw",

  addOptions() {
    return {
      addPasteHandler: true,
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
      data: {
        default: null,
      },
    };
  },
  addStorage() {
    return {
      src: { default: null },
    };
  },

  addNodeView() {
    return ({ node, editor }) => {
      const dom = document.createElement("div");
      const container = document.createElement("div");
      dom.appendChild(container);
      const data = node.attrs?.data;
      console.log("add view", node);
      ReactDOM.render(<DrawComponent editor={editor} data={node.attrs.data} />, container);

      return {
        dom,
        update: (updatedNode) => {
          if (updatedNode.attrs?.data !== data) {
            ReactDOM.render(<DrawComponent editor={editor} data={updatedNode.attrs?.data} />, container);
          }
          return true;
        },
      };
    };
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
        (node: DrawNode) =>
        ({ commands }) => {
          // console.log("node is:", node);
          return commands.insertContent({
            type: this.name,
            attrs: node,
          });
        },
    };
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: /.+/g,
        type: this.type,
        getAttributes: (match) => {
          // console.log("match", match);
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    const { data } = HTMLAttributes;
    if (!this.editor) return ["div", mergeAttributes({ "data-draw": "" })];
    const componentHTML = renderToString(<DrawComponent editor={this.editor} data={data} />);
    return ["div", mergeAttributes({ "data-draw": "" }), componentHTML];
  },
});
