/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import type { ExcalidrawInitialElements } from "./ExcalidrawModal";

import type { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Editor } from "@tiptap/core";
import * as React from "react";
import ExcalidrawImage from "./ExcalidrawImage";
import ExcalidrawModal from "./ExcalidrawModal";
console.log("version", React.version);

export default function ExcalidrawComponent({
  nodeKey,
  data,
  editor,
}: {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data: any | null;
  nodeKey: string;
  editor: Editor;
}): JSX.Element {
  // console.log("ExcalidrawComponent", editor.isEditable);
  // if (!editor?.isEditable) return React.createElement("div");
  const [isModalOpen, setModalOpen] = useState<boolean>(data === "[]" && editor?.isEditable);
  const imageContainerRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const captionButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const [isSelected, setSelected] = useState<boolean>();
  // const onDelete = useCallback(
  //   (event: KeyboardEvent) => {
  //     if (isNodeSelection(editor?.state.selection)) {
  //       event.preventDefault();
  //       const isExcalidraw = editor?.isActive("Excalidraw");
  //       if (isExcalidraw) {
  //         editor?.commands.deleteSelection();
  //       }
  //       return true;
  //     }
  //     return false;
  //   },
  //   [editor, isSelected, nodeKey],
  // );

  // Set editor to readOnly if excalidraw is open to prevent unwanted changes
  useEffect(() => {
    if (isModalOpen) {
      editor.setEditable(false);
    } else {
      editor.setEditable(true);
    }
  }, [isModalOpen, editor]);

  const deleteNode = useCallback(() => {
    setModalOpen(false);
    const { state } = editor.view;
    const { tr } = state;

    const { selection } = editor.state;
    const selectedNode = selection.$from.node();

    console.log(`deleteNode Selected node type: ${selectedNode.type.name}`);
    editor.chain().focus().deleteCurrentNode().run();
  }, [editor, nodeKey]);

  const setData = (els: ExcalidrawInitialElements, aps: Partial<AppState>, fls: BinaryFiles) => {
    if (!editor.isEditable) {
      return;
    }
    if ((els && els.length > 0) || Object.keys(fls).length > 0) {
      console.log(
        JSON.stringify({
          appState: aps,
          elements: els,
          files: fls,
        }),
      );
      editor.commands.updateAttributes("Excalidraw", {
        data: {
          appState: aps,
          elements: els,
          files: fls,
        },
      });

      // console.log("Selected node :", editor.state.selection);
    } else {
      editor.commands.deleteSelection();
    }
  };

  const handleButtonClick = () => {
    setSelected(true);
  };
  const onResizeStart = () => {
    setIsResizing(true);
  };

  const onResizeEnd = (nextWidth: "inherit" | number, nextHeight: "inherit" | number) => {
    // Delay hiding the resize bars for click case
    setTimeout(() => {
      setIsResizing(false);
    }, 200);
  };

  const openModal = useCallback(() => {
    // console.log("openModal");
    setModalOpen(true);
  }, []);
  const { elements = [], files = {}, appState = {} } = useMemo(() => (data === "[]" ? JSON.parse(data) : data), [data]);
  // console.log("before return");
  // console.log("isModalOpen", isModalOpen);
  return (
    <>
      <ExcalidrawModal
        initialElements={elements}
        initialFiles={files}
        initialAppState={appState}
        isShown={isModalOpen}
        onDelete={deleteNode}
        onClose={() => setModalOpen(false)}
        onSave={(els, aps, fls) => {
          editor.setEditable(true);
          setData(els, aps, fls);
          setModalOpen(false);
          const { tr } = editor.state;
          console.log("position onSave", tr.selection);
          editor.view.dispatch(tr);
        }}
        closeOnClickOutside={false}
      />
      {elements.length > 0 && (
        <span className="editor-image">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            ref={buttonRef}
            className={`excalidraw-button ${isSelected ? "selected" : ""}`}
            onClick={handleButtonClick}
          >
            <ExcalidrawImage
              imageContainerRef={imageContainerRef}
              className="image"
              elements={elements}
              files={files}
              appState={appState}
            />
            {isSelected && (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <div
                className="image-edit-button"
                role="button"
                tabIndex={0}
                onMouseDown={(event) => event.preventDefault()}
                onClick={openModal}
              />
            )}
          </button>
        </span>
      )}
    </>
  );
}
