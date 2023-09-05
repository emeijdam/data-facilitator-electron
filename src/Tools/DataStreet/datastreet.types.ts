export enum NodeClass {
    SOURCENODE,
    EXPORTNODE
}

export enum FieldTypes {
    TEXT,
    TEXTAREA,
    FILEPATH,
    EXTERNAL_DIALOG
}

interface IFlowNodeProperty {
        name: string,
        label?: string,
        value?: string,
        field:  FieldTypes,
        readonly: boolean
}

type TFlowNodeProperty = {
    name: string,
    label?: string,
    value?: string,
    field:  FieldTypes,
    readonly: boolean
}

export type TFlowNode = {
    nodeID: string,
    nodeClass: NodeClass,
    name: string,
    description: string,
    type: unknown,
    properties: TFlowNodeProperty[]
}

export interface IFlowNode {
    nodeID: string,
    nodeClass: NodeClass,
    name: string,
    description: string,
    type: unknown,
    properties: Array<IFlowNodeProperty>
}

export const cbsTableCode:IFlowNodeProperty = {
    name: "CBSTableCode",
    label: "cbsTableCode",
    field: FieldTypes.EXTERNAL_DIALOG,
    readonly: false
}

export const url:IFlowNodeProperty = {
        name: "url",
        label: "URL",
        field: FieldTypes.FILEPATH,
        readonly: false
}

export const filename:IFlowNodeProperty = {
    name: "filepath",
    label: "FILEPATH",
    field: FieldTypes.FILEPATH,
    readonly: false
}

export enum connectorType {
    EXCEL,
    WORD,
    ONEDRIVE,
    SHAREPOINT,
    ODATA4,
    CSV,
    XML,
    JSON,
    CBS
}

export interface IConnector {
    id: string,
    name: string,
    description: string,
    type: connectorType,
    logoimage: string,
    properties:  IFlowNodeProperty[]
}

