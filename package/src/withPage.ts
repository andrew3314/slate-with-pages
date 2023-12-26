import { ReactEditor } from 'slate-react'
import normalizePage from './normalizePage';


const withPages = (editor: ReactEditor, ops: any) => {
  const { normalizeNode } = editor

  editor.normalizeNode = (entry) => {
      setTimeout(() => {
        normalizePage(entry, editor, ops)
      }, 10)
      normalizeNode(entry)
    }
  return editor
}

export default withPages