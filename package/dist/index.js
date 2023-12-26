"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  withPages: () => withPage_default
});
module.exports = __toCommonJS(src_exports);

// src/normalizePage.ts
var import_slate = require("slate");
var import_slate_react = require("slate-react");
function normalizePage(entry, editor, ops) {
  const [node, path] = entry;
  if (import_slate.Element.isElement(node) && node.type === ops.pageTypeName) {
    let PageNode;
    let NextPageNode;
    let PageHeight;
    let ChildrenHeight = 0;
    try {
      PageNode = import_slate_react.ReactEditor.toDOMNode(editor, node);
      NextPageNode = PageNode.nextSibling;
      const styles = window.getComputedStyle(PageNode);
      PageHeight = PageNode.clientHeight - (parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom));
    } catch (e) {
      return;
    }
    let innerContainer = PageNode.children[0];
    for (const child of innerContainer.children) {
      ChildrenHeight += child.clientHeight;
    }
    const delta = PageHeight - ChildrenHeight;
    if (delta < 0 && NextPageNode == null) {
      import_slate.Transforms.liftNodes(editor);
      import_slate.Transforms.splitNodes(editor);
      import_slate.Transforms.wrapNodes(editor, ops.emptyPage);
    } else if (delta < 0 && NextPageNode != null) {
      try {
        import_slate.Transforms.moveNodes(editor, { to: [path[0] + 1, 0] });
      } catch (e) {
        return;
      }
    }
  }
}

// src/withPage.ts
var withPages = (editor, ops) => {
  const { normalizeNode } = editor;
  editor.normalizeNode = (entry) => {
    setTimeout(() => {
      normalizePage(entry, editor, ops);
    }, 10);
    normalizeNode(entry);
  };
  return editor;
};
var withPage_default = withPages;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withPages
});
//# sourceMappingURL=index.js.map