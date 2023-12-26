import { WithPageElementType } from "./custom-types"

declare module 'slate' {
    interface CustomTypes {
      Editor: BaseEditor & ReactEditor
      Element: WithPageElementType
      Text: CustomText
    }
}