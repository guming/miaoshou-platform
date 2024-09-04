"use client";

import type { Editor } from "@tiptap/core";
import type * as React from "react";
import { Suspense } from "react";
import ExcalidrawComponent from "../excalidraw/ExcalidrawComponent";

// 定义组件的 Props 类型
interface MyComponentProps {
  editor: Editor;
}

const ExcalidrawWrapper: React.FC<MyComponentProps> = ({ editor }) => {
  // console.log("ExcalidrawWrapper", editor);
  return (
    <div>
      {/* <div style={{ height: "500px", width: "500px" }}> */}
      {/* <Excalidraw /> */}
      <Suspense fallback={null}>
        <ExcalidrawComponent data="[]" nodeKey="excalidraw" editor={editor} />
      </Suspense>
    </div>
  );
};
export default ExcalidrawWrapper;
