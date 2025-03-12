import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import './CodeBlockComponent.scss'

const ColdBlockView = (props: NodeViewProps) => {
  const increase = () => {
    props.updateAttributes({
      count: props.node.attrs.count + 1,
    });
  };
  return (
    <NodeViewWrapper className="react-component">
      {/* <p>执行器</p> */}
      <NodeViewContent
        as="codapi-snippet"
        engine="browser"
        sandbox="javascript"
        editor="external"
        selector="#test .code"
        output-mode="dom"
      />
    </NodeViewWrapper>
  );
};

export default ColdBlockView;
