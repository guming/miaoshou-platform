import { Extension } from "@tiptap/core";
// import { DrawNode } from "./excalidraw";
const DrawStorage = Extension.create({
  name: "DrawStorage",

  addStorage() {
    return {
      awesomeness: 1,
    };
  },

  onUpdate() {
    console.log("storage updated");
    this.storage.awesomeness += 1;
  },
});

export default DrawStorage;
