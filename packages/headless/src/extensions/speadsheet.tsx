import { Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { NodeViewWrapper } from "@tiptap/react";
import { useEffect } from "react";
import { Spreadsheet } from "react-spreadsheet";

type SpeadsheetData = { data: [][] };
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    insertSpeadsheet: {
      /**
       * Comments will be added to the autocomplete.
       */
      insertSpeadsheet: (data: SpeadsheetData) => ReturnType;
    };
  }
}

const SheetView = (props: any) => {
  console.log("logData", props.node.attrs.data);
  useEffect(() => {
    console.log("logData", props.node.attrs.data);
  }, []);
  const data = props.node.attrs.data;
  const logData = (data: any) => {
    props.updateAttributes({
      data: data,
    });
    console.log(props.node);
  };
  return (
    <NodeViewWrapper>
      <Spreadsheet data={data} onChange={logData} />
    </NodeViewWrapper>
  );
};

export const SpeadsheetNode = Node.create({
  name: "SpeadsheetNode",

  group: "block",

  atom: true,
  addAttributes() {
    return {
      data: {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-speadsheet]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "speadsheet" }];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SheetView);
  },

  addCommands() {
    return {
      insertSpeadsheet:
        (data: SpeadsheetData) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: data,
          });
        },
    };
  },
});
