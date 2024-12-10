import { Node } from "@tiptap/core";
import { GraphingCalculator } from "desmos-react";
import { useRef } from "react";
import ReactDOM from "react-dom";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    desmos: {
      /**
       * Comments will be added to the autocomplete.
       */
      insertDesmosNode: (attributes?: { content: string }) => ReturnType;
    };
  }
}

const DesmosReactNode = Node.create({
  name: "desmosNode",

  group: "block", // 定义为块级节点
  atom: true, // 禁止嵌套子节点

  addAttributes() {
    return {
      config: {
        default: {}, // 默认的 Desmos 配置
      },
      expressions: {
        default: [
          { id: "graph1", latex: "y=x^2" }, // 默认表达式
        ],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="desmos-node"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { ...HTMLAttributes, "data-type": "desmos-node" }];
  },

  addNodeView() {
    return ({ node }) => {
      // 用于挂载 React 组件的容器
      const dom = document.createElement("div");
      dom.style.width = "100%";
      dom.style.height = "400px";

      // 使用 React 渲染 DesmosReact
      const DesmosComponent = () => {
        const calcRef = useRef(null);

        const handleChange = () => {
          if (calcRef.current) {
            console.log("Current expressions:");
          }
        };

        return (
          <GraphingCalculator
            ref={calcRef}
            style={{ width: "100%", height: "100%" }}
            expressions={node.attrs.expressions}
            onChange={handleChange}
          />
        );
      };

      ReactDOM.render(<DesmosComponent />, dom);

      return {
        dom,
        destroy() {
          ReactDOM.unmountComponentAtNode(dom);
        },
      };
    };
  },

  addCommands() {
    return {
      insertDesmosNode:
        (attrs) =>
        ({ commands }) => {
          return commands.insertContent({
            type: "desmosNode",
            attrs,
          });
        },
    };
  },
});

export default DesmosReactNode;
