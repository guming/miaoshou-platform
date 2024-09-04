import { isNodeSelection } from "@tiptap/core";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const useDrawComponent = (data, editor, nodeKey, isSelected) => {
  console.log("1");
  const [isModalOpen, setModalOpen] = useState<boolean>(data === "[]" && editor.isEditable);
  console.log("2");
  const imageContainerRef = useRef<HTMLImageElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const captionButtonRef = useRef<HTMLButtonElement | null>(null);
  const [isResizing, setIsResizing] = useState<boolean>(false);
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
  const openModal = useCallback(() => {
    setModalOpen(true);
  }, []);
  const { elements = [], files = {}, appState = {} } = useMemo(() => JSON.parse(data), [data]);

  return {
    isModalOpen,
    setModalOpen,
    imageContainerRef,
    buttonRef,
    captionButtonRef,
    isResizing,
    setIsResizing,
    deleteNode,
    onDelete,
    openModal,
    elements,
    files,
    appState,
  };
};

export default useDrawComponent;
