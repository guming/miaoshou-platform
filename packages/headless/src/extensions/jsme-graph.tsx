import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import dynamic from "next/dynamic";
const JsmeReact = dynamic(async () => (await import("@gumingcn/jsme-react")).Jsme, {
  ssr: false,
});
export type JSMENode = { src: JSX.Element };
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const JSMEComponent = (props: any) => {
  const data = props.node.attrs.data;
  const logSmiles = (smiles: any) => {
    props.updateAttributes({
      data: smiles,
    });
    console.log(props.node);
  };
  return (
    <NodeViewWrapper>
      <JsmeReact
        height={300}
        width={400}
        smiles={data}
        options="noquery,polarnitro,nocanonize,star"
        guicolor="#FFFFFF"
        onChange={logSmiles}
      />
    </NodeViewWrapper>
  );
};

export interface JSMEOptions {
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
    jsme: {
      /**
       * Insert a JSME
       * @param src string
       * @example editor.commands.setJSME()
       */
      setJSME: (src: JSMENode) => ReturnType;
    };
  }
}
// const pasteRegex = /(Excalidraw)/g;
export const JSME = Node.create<JSMEOptions>({
  name: "JSME",

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
    return ReactNodeViewRenderer(JSMEComponent);
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
        tag: "div[data-jsme]",
      },
    ];
  },

  addCommands() {
    return {
      setJSME:
        (node: JSMENode) =>
        ({ commands }) => {
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
          return { src: match.input };
        },
      }),
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    // const { data } = HTMLAttributes;
    // const componentHTML = renderToString(<JSMEComponent editor={this.editor} data={data}/>);
    // console.log("jsme componentHTML",componentHTML)
    return ["div", mergeAttributes({ "data-jsme": "" }, HTMLAttributes)];
  },
});
