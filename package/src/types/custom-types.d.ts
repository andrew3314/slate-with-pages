import { Node } from "slate"

export type WithPageElementType = {
    type: opsType.pageTypeName,
    children: Node[]
}

export type opsType = {
    pageTypeName: string,
    emptyPage: WithPageElementType
}