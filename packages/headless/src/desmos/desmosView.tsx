import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef } from "react";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const desmosView = (props: any) => {
  const myRef = useRef(null);
  const hasRun = useRef(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const logData = (data: any) => {
    props.updateAttributes({
      latex: data.latex,
    });
    console.log(props.node);
  };
  useEffect(() => {
    if (myRef.current && !hasRun.current) {
      console.log("desmos latex", myRef);
      const calculator = Desmos.GraphingCalculator(myRef.current, {
        expressions: true,
        settingsMenu: true,
      });
      if (props.node.attrs.latex) {
        calculator.setExpression({ id: "graph", latex: props.node.attrs.latex });
      }

      calculator.observeEvent("change", () => {
        const newState = calculator.getState();
        console.log(newState.expressions.list[0]);
        logData(newState.expressions?.list[0]);
        console.log("props", props);
      });
      hasRun.current = true;
    }
  }, []);

  return (
    <NodeViewWrapper>
      <div id="graph" style={{ width: "600px", height: "400px" }} ref={myRef} />
    </NodeViewWrapper>
  );
};

export default desmosView;
