import { NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
export default (props) => {
  const content = props.node.attrs.content;
  const [value, setValue] = useState(content);
  console.log(props.editor);

  return (
    <NodeViewWrapper>
      <div>
        <math-field
          onInput={(evt) => {
            setValue(evt.target.value);
            props.updateAttributes({
              content: value,
            });
          }}
        >
          {value}
        </math-field>
      </div>
    </NodeViewWrapper>
  );
};
