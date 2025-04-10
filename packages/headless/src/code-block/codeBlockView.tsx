import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import './CodeBlockComponent.scss'
const ColdBlockView = (props: NodeViewProps) => {
  // const previousNode = getPreviousNode(props.editor);
  // console.log("Previous Node:", previousNode);
  return (
    <NodeViewWrapper className="code-snippet">
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
