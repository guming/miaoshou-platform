import { NodeViewWrapper } from "@tiptap/react";

import katex from "katex";
import { EditableMathField, addStyles } from "react-mathquill";
addStyles();
import "./mathquill.css";
import { useEffect, useRef } from "react";
const inlineMath = {
  cursor: "pointer",
  border: "none !important",
  outline: "node",
  display: "inline-block",
  /* white-space: pre;   */
};

const inlineMathPreview = {
  display: "inline-block",
  border: "none !important",
};

const customStyle = {
  border: "none !important" /* 新的自定义样式 */,
};
export default (props) => {
  const content = props.node.attrs.content;
  // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   props.updateAttributes({
  //     content: e.target.value
  //   });
  // };
  const options = {
    throwOnError: false,
    strict: false,
    displayMode: true,
  };
  const preview = katex.renderToString(content, options);

  const isInPreviewMode = props.extension.options.preview;

  const wrapperRef = useRef(null);

  useEffect(() => {
    if (wrapperRef.current) {
      // 这里可以访问 wrapperRef.current 并修改其内部元素的 CSS 类
      const mqEditableFields = document.querySelectorAll<HTMLElement>(".mq-editable-field");
      if (mqEditableFields) {
        // 添加自定义样式类
        console.log(mqEditableFields);
        // 如果需要恢复默认样式，可以移除类
        mqEditableFields.forEach((element) => {
          console.log(element);
          // 更改元素的样式
          element.setAttribute("style", "border: none !important;");
          // element.style.backgroundColor = 'yellow';
          // element.style.padding = "2px";
        });
        // mqEditableField.setAttribute("style", "border: none !important;");
      }
    }
  }, [props.node]);

  return (
    <NodeViewWrapper ref={wrapperRef} className="mathquill" style={isInPreviewMode ? inlineMathPreview : inlineMath}>
      {isInPreviewMode ? (
        // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
        <div dangerouslySetInnerHTML={{ __html: preview }} />
      ) : (
        <EditableMathField
          latex={content}
          onChange={(mathField) => {
            props.updateAttributes({
              content: mathField.latex(),
            });
            // props.extension.options.preview = true;
          }}
        />
      )}
    </NodeViewWrapper>
  );
};
