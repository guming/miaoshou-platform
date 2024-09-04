import dynamic from "next/dynamic";
const Excalidraw = dynamic(async () => (await import("@excalidraw/excalidraw")).Excalidraw, {
  ssr: false,
});
import type { EditorInstance } from "novel";

export default function ExcalidrawWrapper(editor: EditorInstance) {
  const handleChange = (elements, appState, files) => {};
  return (
    <Excalidraw
      renderTopRightUI={() => {
        return (
          <div>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              style={{
                background: "#70b1ec",
                border: "none",
                width: "max-content",
                fontWeight: "bold",
              }}
              onClick={() => {
                const draw = document.querySelector("div[data-draw]") as HTMLDivElement;
                draw.style.display = "none";
                editor.commands.deleteSelection();
              }}
            >
              Discard
            </button>
            <p>asd</p>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              style={{
                background: "#70b1ec",
                border: "none",
                width: "max-content",
                fontWeight: "bold",
              }}
              onClick={() => {
                const draw = document.querySelector("div[data-draw]") as HTMLDivElement;
                draw.style.display = "none";
                editor.commands.deleteSelection();
              }}
            >
              Save
            </button>
          </div>
        );
      }}
      onChange={handleChange}
    />
  );
}
