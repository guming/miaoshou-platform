import { MarkdownSerializer, defaultMarkdownSerializer } from '@tiptap/pm/markdown';

const customMarkdownSerializer = new MarkdownSerializer(
    {
      // Extend node serializers from default serializer
      ...defaultMarkdownSerializer.nodes,
      bulletList(state, node) {
        // Serialize bullet lists as Markdown using * or -
        console.log(node)
        state.renderList(node, "   ", () => (node.attrs.bullet || "- ") + " ")
      },
      listItem(state, node) {
        // state.write("")
        state.renderContent(node);
        state.ensureNewLine()
        // state.ensureNewLine();
      },
    },
    {
      // Use default mark serializers or add your own if needed
      ...defaultMarkdownSerializer.marks,
    }
  );
 
export default customMarkdownSerializer