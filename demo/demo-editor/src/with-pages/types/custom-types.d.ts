import { BaseElement, Node } from "slate"
import { PageElement } from "../../custom-types"

export type WithPageElementType = {
    type: opsType.pageTypeName,
    children: Node[]
}

export type opsType = {
    pageTypeName: string,
    emptyPage: WithPageElementType
}