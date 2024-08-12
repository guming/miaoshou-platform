import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer, type ReactNodeViewRendererOptions } from "@tiptap/react";
import React from "react";


const DrawComponent = ({ node }: { node: Partial<ReactNodeViewRendererOptions> }) => {
  
    return (
      <NodeViewWrapper>
        
      </NodeViewWrapper>
    );
  };



  export const Draw = Node.create({
    name: "twitter",
  
    addOptions() {
      return {
        addPasteHandler: true,
        HTMLAttributes: {},
        inline: false,
        origin: "",
      };
    },
  
    addNodeView() {
      return ReactNodeViewRenderer(DrawComponent, { attrs: this.options.HTMLAttributes });
    },
  
    inline() {
      return this.options.inline;
    },
  
    group() {
      return this.options.inline ? "inline" : "block";
    },
  
    draggable: true,
  
    addAttributes() {
      return {
        src: {
          default: null,
        },
      };
    },
  
    parseHTML() {
      return [
        {
          tag: "div[data-twitter]",
        },
      ];
    },
  
    addCommands() {
      return {
        setTweet:
          (options: SetTweetOptions) =>
          ({ commands }) => {
            if (!isValidTwitterUrl(options.src)) {
              return false;
            }
  
            return commands.insertContent({
              type: this.name,
              attrs: options,
            });
          },
      };
    },
  
    addPasteRules() {
      if (!this.options.addPasteHandler) {
        return [];
      }
  
      return [
        nodePasteRule({
          find: TWITTER_REGEX_GLOBAL,
          type: this.type,
          getAttributes: (match) => {
            return { src: match.input };
          },
        }),
      ];
    },
  
    renderHTML({ HTMLAttributes }) {
      return ["div", mergeAttributes({ "data-twitter": "" }, HTMLAttributes)];
    },
  });