import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef } from "react";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const desmosView = (props: any) => {
  const myRef = useRef(null);
  const hasRun = useRef(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const logData = (data: any) => {
    props.updateAttributes({
      latex: data,
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

      // 检查latexExpressions是否为数组
      if (Array.isArray(props.node.attrs.latex)) {
        // 遍历数组，设置每个表达式
        props.node.attrs.latex.forEach((item, index) => {
          // 为每个表达式生成唯一ID
          const expressionId = `graph${index}`;
          console.log(item);
          // 设置表达式，使用item.latex作为表达式内容
          calculator.setExpression({
            id: expressionId,
            latex: item.latex,
            color: item.color || Desmos.Colors.BLUE, // 可选：使用提供的颜色或默认颜色
          });
        });
      } else if (typeof props.node.attrs.latex === "string") {
        // 向后兼容：如果传入的是单个字符串，则作为单个表达式处理
        calculator.setExpression({ id: "graph1", latex: props.node.attrs.latex });
      }

      // if (props.node.attrs.latex) {
      //   calculator.setExpression({ id: "graph", latex: props.node.attrs.latex });
      // }

      calculator.observeEvent("change", () => {
        const newState = calculator.getState();
        console.log(newState.expressions.list);
        logData(newState.expressions?.list);
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
