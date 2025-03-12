import { mergeAttributes } from "@tiptap/core";
import { CodeBlockLowlight, type CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { setAttributes } from "../utils/editor";
export interface CodeBlockOptions extends CodeBlockLowlightOptions {
  dictionary: Record<string, string>;
}

export const CodeBlock = CodeBlockLowlight.extend<CodeBlockOptions>({
  name: "codeblock",
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight: createLowlight(common),
      dictionary: {
        // name: "codeblock",
        bash: "Bash",
        c: "C",
        cpp: "C++",
        css: "CSS",
        diff: "Diff",
        go: "Go",
        graphql: "GraphQL",
        ini: "INI",
        fetch: "Fetch",
        java: "Java",
        javascript: "JavaScript",
        json: "JSON",
        kotlin: "Kotlin",
        lua: "Lua",
        makefile: "Makefile",
        markdown: "Markdown",
        objectivec: "Objective-C",
        perl: "Perl",
        php: "PHP",
        plaintext: "Text",
        python: "Python",
        r: "R",
        ruby: "Ruby",
        rust: "Rust",
        shell: "Shell",
        sql: "SQL",
        swift: "Swift",
        typescript: "TypeScript",
        wasm: "WebAssembly",
        xml: "XML",
        yaml: "YAML",
      },
    };
  },

  addAttributes() {
    return {
      language: {
        default: "javascript",
      },
      // codapiToolbar: {
      //   default: "codapi-toolbar",
      //   parseHTML: (element) => {
      //     return element.tagName.toLowerCase();
      //   },
      //   renderHTML: (attributes) => {
      //     return attributes.element;
      //   },
      // },
    };
  },

  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full",
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "pre",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "code",
        {
          class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null,
        },
        0,
      ],
    ];
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const parent = document.createElement("pre");
      const toolbar = document.createElement("div");
      const content = document.createElement("code");

      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          parent.setAttribute(key, value);
          content.setAttribute(key, value);
        }
      }
      parent.setAttribute("id", "test");
      parent.setAttribute("data-type", this.name);
      toolbar.setAttribute("data-type", `${this.name}Toolbar`);
      content.setAttribute("data-type", `${this.name}Content`);

      // language list
      const language = document.createElement("select");
      for (const name of Object.keys(this.options.dictionary)) {
        //+
        const option = document.createElement("option");
        option.value = name;
        option.textContent = this.options.dictionary[name] ?? name;
        language.append(option);
      }
      language.setAttribute("name", "language-select");
      language.value = node.attrs.language;
      const codapi = document.createElement("codapi-snippet");
      language.addEventListener("change", () => {
        // const snippet = document.querySelector("codapi-snippet");
        // codapi.setAttribute("sandbox", language.value);
        if (!editor.isEditable) {
          language.value = node.attrs.language;
        } else if (typeof getPos === "function") {
          setAttributes(editor, getPos, { ...node.attrs, language: language.value });
        }
      });

      // codapi.setAttribute("engine", "browser");
      // codapi.setAttribute("sandbox", language.value);
      // codapi.setAttribute("editor", "external");
      toolbar.contentEditable = "false";
      toolbar.append(language);
      parent.append(toolbar);
      parent.append(content);
      // parent.append(codapi);
      // const _toolbar = document.querySelector("codapi-toolbar");
      // const _result = document.querySelector("codapi-output");
      // const _status = document.querySelector("codapi-status");
      // if (_toolbar) {
      //   _toolbar.addEventListener("click", (e) => {
      //     e.stopPropagation();
      //     console.log(document.querySelector("codapi-output"));
      //     console.log(document.querySelector("codapi-status"));
      //   });
      // }

      return {
        dom: parent,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          if (language.value !== updatedNode.attrs.language) {
            language.value = updatedNode.attrs.language;
          }
          const target = parent.querySelector("codapi-toolbar");
          const result = parent.querySelector("codapi-output");
          const status = parent.querySelector("codapi-status");

          // if (_toolbar && target) {
          //   // console.log(codapi, parent);
          //   codapi?.replaceChild(_toolbar, target);
          // }
          // console.log(codapi);
          // if (_result && result) {
          //   codapi?.replaceChild(_result, result);
          // }
          // console.log(node);
          return true;
        },
      };
    };
  },
});
