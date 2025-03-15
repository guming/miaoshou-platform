import { InputRule } from "@tiptap/core";
import { findParentNode } from "@tiptap/core";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TiptapImage from "@tiptap/extension-image";
import TiptapLink from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import TiptapUnderline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "tiptap-markdown";
import { Table } from "../table/table";
import { TableCell } from "../table/table-cell";
import { TableHeader } from "../table/table-header";
import { TableRow } from "../table/table-row";
import { CodeBlock } from "./code-block";
import { CodeSnippet } from "./code-execute";
import CustomKeymap from "./custom-keymap";
import { DesmosNode } from "./desmos-graph";
import { Emoji } from "./emoji";
import { Draw } from "./excalidraw";
import { GeometryNode } from "./geometry-graph";
import Iframe from "./iframe";
import { ImageResizer } from "./image-resizer";
import InlineMath from "./inlineMath";
import { JSME } from "./jsme-graph";
import { Mathematics } from "./mathematics";
import MenuBar from "./menubar";
import { Mermaid } from "./mermaid";
import { SpeadsheetNode } from "./speadsheet";
import { Twitter } from "./twitter";
import UpdatedImage from "./updated-image";

import CharacterCount from "@tiptap/extension-character-count";
import Youtube from "@tiptap/extension-youtube";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";

const PlaceholderExtension = Placeholder.configure({
  placeholder: ({ node, editor }) => {
    const parent = findParentNode((node) => node.type.name === "table")(editor.state.selection);
    if (parent?.node?.type.name === "table") {
      return "";
    }
    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    }
    if (node.type.name === "inlineMath") {
      return "Math";
    }

    if (node.type.name === "codeblock") {
      return "";
    }
    if (node.type.name === "table") {
      return "";
    }
    if (node.type.name === "tableHeader") {
      return "";
    }
    if (node.type.name === "tableCell") {
      return "";
    }
    if (node.type.name === "tableRow") {
      return "";
    }

    return "Press '/' for commands";
  },
  includeChildren: true,
});

const simpleExtensions = [
  TiptapUnderline,
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),

  Markdown.configure({
    html: false,
    transformCopiedText: true,
  }),
  CustomKeymap,
] as const;

const Horizontal = HorizontalRule.extend({
  addInputRules() {
    return [
      new InputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/u,
        handler: ({ state, range }) => {
          const attributes = {};

          const { tr } = state;
          const start = range.from;
          const end = range.to;

          tr.insert(start - 1, this.type.create(attributes)).delete(tr.mapping.map(start), tr.mapping.map(end));
        },
      }),
    ];
  },
});

export * from "./ai-highlight";
export * from "./slash-command";
export {
  // CodeBlockLowlight,
  Horizontal as HorizontalRule,
  ImageResizer,
  InputRule,
  PlaceholderExtension as Placeholder,
  StarterKit,
  TaskItem,
  TaskList,
  TiptapImage,
  TiptapLink,
  UpdatedImage,
  simpleExtensions,
  Youtube,
  Twitter,
  CharacterCount,
  GlobalDragHandle,
  Draw,
  JSME,
  DesmosNode,
  Mermaid,
  Emoji,
  CodeBlock,
  CodeSnippet,
  InlineMath,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Mathematics,
  SpeadsheetNode,
  GeometryNode,
  Iframe,
  MenuBar,
};
