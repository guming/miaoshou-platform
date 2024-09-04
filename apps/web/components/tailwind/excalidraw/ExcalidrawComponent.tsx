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

import { isNodeSelection } from "@tiptap/core";
import type { EditorInstance } from "novel";
import ExcalidrawImage from "./ExcalidrawImage";
import ExcalidrawModal from "./ExcalidrawModal";

export default function ExcalidrawComponent({
  nodeKey,
  data,
  editor,
}: {
  data: string;
  nodeKey: string;
  editor: EditorInstance;
}): JSX.Element {
  const [isModalOpen, setModalOpen] = useState<boolean>(data === "[]" && editor.isEditable);
  const imageContainerRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const captionButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);

  const isSelected = isNodeSelection(editor.state.selection);

  const onDelete = useCallback(
    (event: KeyboardEvent) => {
      if (isNodeSelection(editor.state.selection)) {
        event.preventDefault();
        const isExcalidraw = editor.isActive("Excalidraw");
        if (isExcalidraw) {
          editor.commands.deleteSelection();
        }
        return true;
      }
      return false;
    },
    [editor, isSelected, nodeKey],
  );

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
    editor.commands.deleteSelection();
  }, [editor, nodeKey]);

  const setData = (els: ExcalidrawInitialElements, aps: Partial<AppState>, fls: BinaryFiles) => {
    if (!editor.isEditable) {
      return;
    }
    return () => {
      const selection = editor.state.selection;
      if (isNodeSelection(selection)) {
        if ((els && els.length > 0) || Object.keys(fls).length > 0) {
          console.log(
            JSON.stringify({
              appState: aps,
              elements: els,
              files: fls,
            }),
          );
        } else {
          editor.commands.deleteSelection();
        }
      }
    };
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
    setModalOpen(true);
  }, []);

  const { elements = [], files = {}, appState = {} } = useMemo(() => JSON.parse(data), [data]);

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
        }}
        closeOnClickOutside={false}
      />
      {elements.length > 0 && (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button ref={buttonRef} className={`excalidraw-button ${isSelected ? "selected" : ""}`}>
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
      )}
    </>
  );
}
