import { NodeViewWrapper } from "@tiptap/react";
import { useEffect, useRef } from "react";
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const geometryView = (props: any) => {
  const myRef = useRef(null);
  const hasRun = useRef(false);
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const logData = (data: any) => {
    props.updateAttributes({
      state: data,
    });
  };
  useEffect(() => {
    if (myRef.current && !hasRun.current) {
      console.log("geometry view", myRef);
      const geometry = Desmos.Geometry(myRef.current);
      if (props.node.attrs.state) {
        geometry.setState(props.node.attrs.state);
      }
      // console.log("old state", geometry.getState());

      geometry.observeEvent("change", () => {
        const newState = geometry.getState();
        // console.log("new state", newState);
        logData(newState);
        console.log("props", props);
      });
      hasRun.current = true;
    }
  }, []);

  return (
    <NodeViewWrapper>
      <div id="geometry" style={{ width: "600px", height: "400px" }} ref={myRef} />
    </NodeViewWrapper>
  );
};

export default geometryView;
