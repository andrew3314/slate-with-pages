import { BaseEditor, Node } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type PageElement = { type: 'page'; children: Node[] }
export type ParagraphElement = {
  type: 'paragraph',
  children: Node[] 
}
export type CustomText = {
  type: 'text',
  text: string
}
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: PageElement | ParagraphElement
    Text: CustomText
  }
}