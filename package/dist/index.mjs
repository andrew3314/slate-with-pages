// src/normalizePage.ts
import { Transforms, Element } from "slate";
import { ReactEditor } from "slate-react";
function normalizePage(entry, editor, ops) {
  const [node, path] = entry;
  if (Element.isElement(node) && node.type === ops.pageTypeName) {
    let PageNode;
    let NextPageNode;
    let PageHeight;
    let ChildrenHeight = 0;
    try {
      PageNode = ReactEditor.toDOMNode(editor, node);
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
      Transforms.liftNodes(editor);
      Transforms.splitNodes(editor);
      Transforms.wrapNodes(editor, ops.emptyPage);
    } else if (delta < 0 && NextPageNode != null) {
      try {
        Transforms.moveNodes(editor, { to: [path[0] + 1, 0] });
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
export {
  withPage_default as withPages
};
//# sourceMappingURL=index.mjs.map