import { NodeEntry, Transforms, Element, Node } from "slate"
import { ReactEditor } from "slate-react"
import { opsType } from "./types/custom-types"

export default function normalizePage(entry: NodeEntry, editor: ReactEditor, ops: opsType){
    const [node, path] = entry

    if (Element.isElement(node) && node.type === ops.pageTypeName) {
      let PageNode: HTMLElement
      let NextPageNode: ChildNode | null
      let PageHeight: number
      let ChildrenHeight = 0
      try{
        PageNode = ReactEditor.toDOMNode(editor, node)
        NextPageNode = PageNode.nextSibling
        const styles = window.getComputedStyle(PageNode)
        PageHeight = PageNode.clientHeight - (parseFloat(styles.paddingTop) + parseFloat(styles.paddingBottom))
      }catch(e){
        return
      }
  
      let innerContainer = (PageNode.children[0] as HTMLElement)
  
      for (const child of innerContainer.children){
        ChildrenHeight += child.clientHeight
      }
  
      const delta = PageHeight - ChildrenHeight
      
      if (delta < 0  && NextPageNode == null){
        Transforms.liftNodes(editor)
        Transforms.splitNodes(editor)
        Transforms.wrapNodes(editor, ops.emptyPage)
      } else if (delta < 0 && NextPageNode != null){
        try {
          Transforms.moveNodes(editor, {to: [path[0] + 1, 0]})
        } catch (e){
          return 
        }
      }
    }
  }