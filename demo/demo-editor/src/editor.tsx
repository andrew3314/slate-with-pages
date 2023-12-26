import { useState } from 'react'
import { createEditor } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withPages } from 'with-pages-slate'
import { PageElement } from './custom-types'
const initialValue: any = [
  {
    type: 'page',
    children: [
      { 
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: 'Hey you!'
          }
        ],
      },
    ],
  }
]

const emptyPage: PageElement = 
  {
    type: 'page',
    children: [
      { 
        type: 'paragraph',
        children: [
          {
            type: 'text',
            text: ''
          }
        ],
      },
    ],
  }

const ops = {
  pageTypeName: 'page',
  emptyPage: emptyPage
}
const DemoEditor = () => {
  const [base] = useState(() => withReact(createEditor()))
  const editorWithPagination = withPages(base, ops)
  return (
    <div className='editor-pages'>
      <Slate editor={editorWithPagination} initialValue={initialValue}>
        <Editable 
          style={{outline: 'none'}}
          renderElement={(props): any => {
          const type = props.element.type 
          switch (type){
            case 'page':
              return ( 
              <div className="page" {...props.attributes} >
                <div className="inner-page-container">
                  {props.children}
                </div>
              </div>
              )
            case 'paragraph':
              return (
                <div className='paragrapph' {...props.attributes}>
                  {props.children}
                </div>
              )
          }
        }}
       />
      </Slate>
    </div>
  )
}


export default DemoEditor