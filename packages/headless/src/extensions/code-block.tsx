import { mergeAttributes } from "@tiptap/core";
import { CodeBlockLowlight, type CodeBlockLowlightOptions } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { v4 as uuidv4 } from "uuid";
import { setAttributes } from "../utils/editor";

interface OutputModes {
  [key: string]: string;
}
const outputModes: OutputModes = {
  text: "TEXT",
  json: "JSON",
  dom: "DOM",
  svg: "SVG",
  iframe: "HTML",
};

type BrowserSupportedLanguage = "javascript" | "fetch" | "typescript" | "html";

function isBrowserSupportLanguage(language: string): language is BrowserSupportedLanguage {
  return language === "javascript" || language === "fetch";
}
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
        sqlite: "SQL",
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
      outputmode: {
        default: "text",
      },
      timestamp: {
        default: Date.now(),
      },
      uuid: {
        default: "",
      },
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
      const result = document.createElement("div");
      if (node.attrs.uuid === "") {
        setAttributes(editor, getPos, { ...node.attrs, uuid: uuidv4() });
      }
      for (const [key, value] of Object.entries(mergeAttributes(this.options.HTMLAttributes))) {
        if (value !== undefined && value !== null) {
          parent.setAttribute(key, value);
          content.setAttribute(key, value);
        }
      }
      result.setAttribute("id", "result");
      parent.setAttribute("data-type", this.name);
      toolbar.setAttribute("data-type", `${this.name}Toolbar`);
      content.setAttribute("data-type", `${this.name}Content`);
      const codapi = document.createElement("codapi-snippet");
      codapi.setAttribute("id", node.attrs.uuid);
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

      language.addEventListener("change", () => {
        // const snippet = document.querySelector("codapi-snippet");
        codapi.setAttribute("sandbox", language.value);
        codapi.setAttribute("engine", isBrowserSupportLanguage(language.value) ? "browser" : "wasi");
        if (!editor.isEditable) {
          language.value = node.attrs.language;
        } else if (typeof getPos === "function") {
          setAttributes(editor, getPos, { ...node.attrs, language: language.value });
        }
      });

      // output mode
      // 创建 <select> 元素
      const outputModeSelect = document.createElement("select");

      // 根据 outputModes 对象动态创建 <option> 元素
      for (const mode in outputModes) {
        const option = document.createElement("option");
        option.value = mode; // 设置 option 的值
        option.textContent = outputModes[mode] ?? mode; // 设置显示文本//+
        outputModeSelect.append(option);
      }
      outputModeSelect.setAttribute("name", "outputmode-select");
      outputModeSelect.value = node.attrs.outputmode;

      outputModeSelect.addEventListener("change", () => {
        // const snippet = document.querySelector("codapi-snippet");
        console.log("change mode for output", outputModeSelect.value);
        codapi.setAttribute("output-mode", outputModeSelect.value);
        if (!editor.isEditable) {
          outputModeSelect.value = node.attrs.outputmode;
        } else if (typeof getPos === "function") {
          setAttributes(editor, getPos, { ...node.attrs, outputmode: outputModeSelect.value });
        }
      });

      codapi.setAttribute("engine", isBrowserSupportLanguage(language.value) ? "browser" : "wasi");
      codapi.setAttribute("sandbox", language.value);
      codapi.setAttribute("output-mode", outputModeSelect.value);
      codapi.setAttribute("editor", "external");
      toolbar.contentEditable = "false";
      toolbar.append(language);
      toolbar.append(outputModeSelect);
      parent.append(toolbar);
      parent.append(content);
      parent.append(codapi);
      parent.append(result);

      const _result = document.getElementById(node.attrs.uuid);

      // Options for the observer (which mutations to observe)
      const config = { attributes: true, childList: true, subtree: true };

      // Callback function to execute when mutations are observed
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
      const callback = (mutationList: any, observer: any) => {
        for (const mutation of mutationList) {
          if (mutation.type === "childList") {
            console.log("A child node has been added or removed.");
            console.log(mutation, getPos());
            setAttributes(editor, getPos, { ...node.attrs, timestamp: Date.now() });
          } else if (mutation.type === "attributes") {
            console.log(`The ${mutation.attributeName} attribute was modified.`);
          }
        }
      };

      const observer = new MutationObserver(callback);

      _result && observer.observe(_result, config);

      // Later, you can stop observing
      // observer.disconnect();

      // ReactDOM.render(content, parent);
      return {
        dom: parent,
        contentDOM: content,
        update: (updatedNode) => {
          console.log("step into update");
          if (updatedNode.type !== this.type) {
            return false;
          }
          if (language.value !== updatedNode.attrs.language) {
            language.value = updatedNode.attrs.language;
          }
          if (outputModeSelect.value !== updatedNode.attrs.outputmode) {
            outputModeSelect.value = updatedNode.attrs.outputmode;
          }
          if (result && _result && editor.isEditable) {
            // if (!_result.innerHTML && !_result.textContent) {
            // }
            const target = _result.querySelector("codapi-output");
            console.log("target", target);
            if (target) result.innerHTML = target.innerHTML ?? target.textContent;
          }
          // ReactDOM.render(content, parent);
          return true;
        },
      };
    };
  },
});
