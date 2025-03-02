import { NodeViewWrapper } from "@tiptap/react";
// import { addStyles } from "react-mathquill";
// addStyles();
import "./mathquill.css";
import dynamic from "next/dynamic";
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
const EditableMathField = dynamic(
  () =>
    import("react-mathquill").then((mod) => {
      if (mod.addStyles) {
        mod.addStyles();
      }
      return mod.EditableMathField;
    }),
  { ssr: false },
);

export default (props) => {
  const content = props.node.attrs.content;
  const wrapperRef = useRef(null);
  useEffect(() => {
    if (wrapperRef.current) {
      document.addEventListener("click", (event) => {
        if (event.target.closest(".mq-editable-field")) {
          const editableField = event.target.closest(".mq-editable-field");
          editableField.setAttribute("style", "border: none !important;");
        }
      });
    }
  }, [props.node.attrs.content]);

  return (
    <NodeViewWrapper ref={wrapperRef} className="mathquill">
      <EditableMathField
        latex={content}
        onChange={(mathField) => {
          props.updateAttributes({
            content: mathField.latex(),
          });
        }}
      />
    </NodeViewWrapper>
  );
};
