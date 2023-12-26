# Logic
In essence, it is a normalizer that checks whether or not there is oveflow on the 'page' node. Case positive, it then checks if there already is a next page, then it splits the selection and wraps it around another node or just move the selection according to the former condition. 

## Usage
To use this package, install it through `npm i with-pages-slate`. Then, import it and extend the editor as follows:

```
// ... other imports
import { withPages } from 'with-pages-slate'

// then use it as a normal plugin
const editor = withPages(createEditor(), {
    pageTypeName: 'the name of the node type that will represent your page',
    emptyPage: Element // see [1] below
})
```

\[1] an element to be rendered as your blank page everytime a page break occurs. Be aware that you need to declare your custom node type. Check the demo editor and Slate documentation on the subject for better comprehension