import { InputRule } from "@tiptap/core";
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
import { CodeBlock } from "./code-block";
import CustomKeymap from "./custom-keymap";
import { DesmosNode } from "./desmos-graph";
import { Emoji } from "./emoji";
import { Draw } from "./excalidraw";
import { ImageResizer } from "./image-resizer";
import InlineMath from "./inlineMath";
import { JSME } from "./jsme-graph";
import { Mermaid } from "./mermaid";
import { Twitter } from "./twitter";
import UpdatedImage from "./updated-image";

import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Youtube from "@tiptap/extension-youtube";
import GlobalDragHandle from "tiptap-extension-global-drag-handle";

const PlaceholderExtension = Placeholder.configure({
  placeholder: ({ node }) => {
    if (node.type.name === "heading") {
      return `Heading ${node.attrs.level}`;
    }
    if (node.type.name === "inlineMath") {
      return "Math";
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
  CodeBlockLowlight,
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
  InlineMath,
};
