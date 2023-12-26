import { ReactEditor } from 'slate-react'
import normalizePage from './normalizePage';
import { opsType } from './types/custom-types';


const withPages = (editor: ReactEditor, ops: opsType) => {
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