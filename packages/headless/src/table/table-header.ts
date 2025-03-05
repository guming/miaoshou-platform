import { posToDOMRect } from "@tiptap/core";
import {
  TableHeader as TTableHeader,
  type TableHeaderOptions as TTableHeaderOptions,
} from "@tiptap/extension-table-header";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import { FloatMenuView } from "../float-menu/view";
import { getCellsInRow, isCellSelection, isColumnSelected, isTableSelected, selectColumn } from "../utils/editor";

import { icon } from "../utils/icons";

export interface TableHeaderOptions extends TTableHeaderOptions {
  dictionary: {
    insertLeft: string;
    insertRight: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    deleteCol: string;
  };
}

export const TableHeader = TTableHeader.extend<TableHeaderOptions>({
  name: "tableHeader",
  addOptions() {
    return {
      ...this.parent?.(),
      dictionary: {
        insertLeft: "Insert column on the left",
        insertRight: "Insert column on the right",
        alignLeft: "Left alignment",
        alignCenter: "Center alignment",
        alignRight: "Right alignment",
        deleteCol: "Delete column",
      },
    };
  },
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: null,
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      ...(TTableHeader.config.addProseMirrorPlugins?.apply(this) ?? []),
      new Plugin({
        key: new PluginKey(`${this.name}-float-menu`),
        view: FloatMenuView.create({
          editor: this.editor,
          show: ({ editor }) => {
            if (!editor.isEditable) {
              return false;
            }
            const selection = editor.state.selection;
            if (isTableSelected(selection)) {
              return false;
            }
            const cells = getCellsInRow(selection, 0);
            return !!cells?.some((_cell, index) => isColumnSelected(selection, index));
          },
          rect: ({ editor }) => {
            const { view, state } = editor;
            if (isCellSelection(state.selection)) {
              const cell = view.nodeDOM(state.selection.$headCell.pos) as HTMLElement;
              if (cell) {
                const grip = cell.querySelector(".ProseMirror-table-grip-col");
                if (grip) {
                  return grip.getBoundingClientRect();
                  // biome-ignore lint/style/noUselessElse: <explanation>
                } else {
                  return cell.getBoundingClientRect();
                }
              }
            }
            return posToDOMRect(view, state.selection.from, state.selection.to);
          },
          onInit: ({ view, editor, root }) => {
            const insertLeft = view.createButton({
              id: "insert-left",
              name: this.options.dictionary.insertLeft,
              icon: icon("left"),
              onClick: () => editor.chain().addColumnBefore().run(),
            });
            const insertRight = view.createButton({
              id: "insert-right",
              name: this.options.dictionary.insertRight,
              icon: icon("right"),
              onClick: () => editor.chain().addColumnAfter().run(),
            });
            const alignLeft = view.createButton({
              id: "align-left",
              name: this.options.dictionary.alignLeft,
              icon: icon("align-left"),
              onClick: () => editor.chain().setCellAttribute("align", "left").run(),
            });
            const alignCenter = view.createButton({
              id: "align-center",
              name: this.options.dictionary.alignCenter,
              icon: icon("align-center"),
              onClick: () => editor.chain().setCellAttribute("align", "center").run(),
            });
            const alignRight = view.createButton({
              id: "align-right",
              name: this.options.dictionary.alignRight,
              icon: icon("align-right"),
              onClick: () => editor.chain().setCellAttribute("align", "right").run(),
            });
            const deleteCol = view.createButton({
              id: "remove",
              name: this.options.dictionary.deleteCol,
              icon: icon("remove"),
              onClick: () => editor.chain().deleteColumn().run(),
            });

            root.append(insertLeft);
            root.append(insertRight);
            root.append(alignLeft);
            root.append(alignCenter);
            root.append(alignRight);
            root.append(deleteCol);
          },
        }),
        props: {
          decorations: (state) => {
            const { tr, doc, selection } = state;
            const decorations: Array<Decoration> = [];
            if (this.editor.isEditable) {
              const cells = getCellsInRow(selection, 0);
              if (cells) {
                for (let index = 0; index < cells.length; index++) {
                  decorations.push(
                    Decoration.widget(cells[index]!.pos + 1, () => {
                      const grip = document.createElement("div");
                      grip.classList.add("ProseMirror-table-grip-col");
                      if (isColumnSelected(selection, index)) {
                        grip.classList.add("active");
                      }
                      if (index === 0) {
                        grip.classList.add("first");
                      } else if (index === cells.length - 1) {
                        grip.classList.add("last");
                      }
                      const drag = document.createElement("div");
                      drag.classList.add("ProseMirror-table-grip-drag");
                      drag.innerHTML = icon("drag");
                      drag.addEventListener("mousedown", (event) => {
                        event.preventDefault();
                        event.stopImmediatePropagation();
                        this.editor.view.dispatch(selectColumn(tr, index));
                      });
                      grip.append(drag);
                      return grip;
                    }),
                  );
                }
              }
            }
            return DecorationSet.create(doc, decorations);
          },
        },
      }),
    ];
  },
});
