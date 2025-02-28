import { NodeViewWrapper } from "@tiptap/react";
import { useState } from "react";
// import { MathfieldComponent } from "react-mathlive";

export default () => {
  const [latex, setLatex] = useState("f(x)=\\log _10 x");
  return <NodeViewWrapper>{/* <MathfieldComponent latex={latex} onChange={setLatex} /> */}</NodeViewWrapper>;
};
