import type {
  BinaryFiles,
  ExcalidrawImperativeAPI,
  ExcalidrawInitialDataState,
} from "@excalidraw/excalidraw/types/types";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const useCallbackRefState = () => {
  const [refValue, setRefValue] = useState<ExcalidrawImperativeAPI | null>(null);
  const refCallback = useCallback((value: ExcalidrawImperativeAPI | null) => setRefValue(value), []);
  return [refValue, refCallback] as const;
};
export type ExcalidrawInitialElements = ExcalidrawInitialDataState["elements"];

const useDraw = (initialElements, initialFiles, closeOnClickOutside, onDelete) => {
  const excaliDrawModelRef = useRef<HTMLDivElement | null>(null);
  const [excalidrawAPI, excalidrawAPIRefCallback] = useCallbackRefState();
  const [discardModalOpen, setDiscardModalOpen] = useState(false);
  const [elements, setElements] = useState<ExcalidrawInitialElements>(initialElements);
  const [files, setFiles] = useState<BinaryFiles>(initialFiles);
  console.log("ne4");
  useEffect(() => {
    if (excaliDrawModelRef.current !== null) {
      excaliDrawModelRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement: HTMLElement | null = null;

    const clickOutsideHandler = (event: MouseEvent) => {
      const target = event.target;
      if (
        excaliDrawModelRef.current !== null &&
        !excaliDrawModelRef.current.contains(target as Node) &&
        closeOnClickOutside
      ) {
        onDelete();
      }
    };

    if (excaliDrawModelRef.current !== null) {
      modalOverlayElement = excaliDrawModelRef.current?.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement?.addEventListener("click", clickOutsideHandler);
      }
    }

    return () => {
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener("click", clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onDelete]);

  useLayoutEffect(() => {
    const currentModalRef = excaliDrawModelRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDelete();
      }
    };

    if (currentModalRef !== null) {
      currentModalRef.addEventListener("keydown", onKeyDown);
    }

    return () => {
      if (currentModalRef !== null) {
        currentModalRef.removeEventListener("keydown", onKeyDown);
      }
    };
  }, [elements, files, onDelete]);
  return {
    excaliDrawModelRef,
    excalidrawAPI,
    excalidrawAPIRefCallback,
    discardModalOpen,
    setDiscardModalOpen,
    elements,
    setElements,
    files,
    setFiles,
  };
};

export default useDraw;
