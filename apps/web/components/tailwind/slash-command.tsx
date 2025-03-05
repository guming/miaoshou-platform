import {
  Brush,
  Cake,
  Calculator,
  CheckSquare,
  Code,
  FlaskConical,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  List,
  ListOrdered,
  Text,
  TextQuote,
  Twitter,
  Youtube,
} from "lucide-react";
import { createSuggestionItems } from "novel/extensions";
import { Command, renderItems } from "novel/extensions";

import { uploadFn } from "./image-upload";

export const suggestionItems = createSuggestionItems([
  {
    title: "Text",
    description: "Just start typing with plain text.",
    searchTerms: ["p", "paragraph"],
    icon: <Text size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").run();
    },
  },
  {
    title: "To-do List",
    description: "Track tasks with a to-do list.",
    searchTerms: ["todo", "task", "list", "check", "checkbox"],
    icon: <CheckSquare size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run();
    },
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["title", "big", "large"],
    icon: <Heading1 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
    },
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["subtitle", "medium"],
    icon: <Heading2 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
    },
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["subtitle", "small"],
    icon: <Heading3 size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
    },
  },
  {
    title: "Bullet List",
    description: "Create a simple bullet list.",
    searchTerms: ["unordered", "point"],
    icon: <List size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: "Numbered List",
    description: "Create a list with numbering.",
    searchTerms: ["ordered"],
    icon: <ListOrdered size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["blockquote"],
    icon: <TextQuote size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleNode("paragraph", "paragraph").toggleBlockquote().run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["codeblock"],
    icon: <Code size={18} />,
    command: ({ editor, range }) =>
      editor.chain().focus().deleteRange(range).toggleNode("codeblock", "codeblock").run(),
  },

  {
    title: "CodeEditor",
    description: "Edit a code snippet.",
    searchTerms: ["codeSnippet"],
    icon: <Code size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).insertReactCode().run();
    },
  },

  {
    title: "Image",
    description: "Upload an image from your computer.",
    searchTerms: ["photo", "picture", "media"],
    icon: <ImageIcon size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      // upload image
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async () => {
        if (input.files?.length) {
          const file = input.files[0];
          const pos = editor.view.state.selection.from;
          uploadFn(file, editor.view, pos);
        }
      };
      input.click();
    },
  },
  {
    title: "Youtube",
    description: "Embed a Youtube video.",
    searchTerms: ["video", "youtube", "embed"],
    icon: <Youtube size={18} />,
    command: ({ editor, range }) => {
      const videoLink = prompt("Please enter Youtube Video Link");
      //From https://regexr.com/3dj5t
      const ytregex = new RegExp(
        /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/,
      );

      if (ytregex.test(videoLink)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setYoutubeVideo({
            src: videoLink,
          })
          .run();
      } else {
        if (videoLink !== null) {
          alert("Please enter a correct Youtube Video Link");
        }
      }
    },
  },
  {
    title: "Twitter",
    description: "Embed a Tweet.",
    searchTerms: ["twitter", "embed"],
    icon: <Twitter size={18} />,
    command: ({ editor, range }) => {
      const tweetLink = prompt("Please enter Twitter Link");
      const tweetRegex = new RegExp(/^https?:\/\/(www\.)?x\.com\/([a-zA-Z0-9_]{1,15})(\/status\/(\d+))?(\/\S*)?$/);

      if (tweetRegex.test(tweetLink)) {
        editor
          .chain()
          .focus()
          .deleteRange(range)
          .setTweet({
            src: tweetLink,
          })
          .run();
      } else {
        if (tweetLink !== null) {
          alert("Please enter a correct Twitter Link");
        }
      }
    },
  },
  {
    title: "Draw",
    description: "Drawing.",
    searchTerms: ["Draw", "embed"],
    icon: <Brush size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      editor
        .chain()
        .focus()
        .setDraw({
          src: <div></div>,
        })
        .run();
    },
  },
  {
    title: "JSME",
    description: "Chemistry.",
    searchTerms: ["JSME", "embed"],
    icon: <FlaskConical size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).run();
      editor
        .chain()
        .focus()
        .setJSME({
          src: <div />,
        })
        .run();
    },
  },
  {
    title: "InlineMath",
    description: "InlineMath.",
    searchTerms: ["InlineMath", "embed"],
    icon: <Calculator size={18} />,
    command: ({ editor, range }) => {
      editor.chain().focus().deleteRange(range).addInlineMath().run();
    },
  },
  {
    title: "DesmosNode",
    description: "DesmosNode.",
    searchTerms: ["DesmosNode", "embed"],
    icon: <Cake size={18} />,
    command: ({ editor, range }) => {
      console.log("starting insert Desmos Nodes");
      editor.chain().focus().deleteRange(range).insertNode({ latex: "y=x^2" }).run();
    },
  },
  {
    title: "Mermaid",
    description: "Mermaid.",
    searchTerms: ["Mermaid", "embed"],
    icon: <Cake size={18} />,
    command: ({ editor, range }) => {
      console.log("starting  insert Mermaid Nodes");
      editor.chain().focus().deleteRange(range).setMermaid("graph TD;\n  A-->B;  A-->C;\n  B-->D;\n  C-->D;").run();
    },
  },
  {
    title: "Table",
    description: "Table.",
    searchTerms: ["Table", "embed"],
    icon: <Cake size={18} />,
    command: ({ editor, range }) => {
      console.log("starting  insert table Nodes");
      editor.chain().focus().deleteRange(range).insertTable({ rows: 3, cols: 3 }).run();
    },
  },
]);

export const slashCommand = Command.configure({
  suggestion: {
    items: () => suggestionItems,
    render: renderItems,
  },
});
