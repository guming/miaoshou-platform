import { NodeViewContent, type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
// import './CodeBlockComponent.scss'

const getPreviousNode = (editor) => {
  const { state } = editor;
  const { selection } = state;
  const { $from } = selection; // 当前光标所在位置

  const prevPos = $from.before(); // 获取前一个节点的结束位置
  if (prevPos < 0) return null; // 边界检查

  const prevResolved = state.doc.resolve(prevPos); // 解析前一个位置
  const prevNode = prevResolved.nodeBefore; // 获取前一个节点

  return prevNode || null; // 如果不存在上一个节点，返回 null
};
const ColdBlockView = (props: NodeViewProps) => {
  const previousNode = getPreviousNode(props.editor);
  console.log("Previous Node:", previousNode);
  return (
    <NodeViewWrapper className="react-component">
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
