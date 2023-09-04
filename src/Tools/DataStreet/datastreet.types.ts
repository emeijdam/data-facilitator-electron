export enum nodeClass {
    SOURCENODE,
    EXPORTNODE
}

export enum fieldtypes {
    TEXT,
    TEXTAREA,
    FILEPATH,
}

interface IFlowNodeProperty {
        name: string,
        label?: string,
        value?: string,
        field:  fieldtypes,
        readonly: boolean
}

type TFlowNodeProperty = {
    name: string,
    label?: string,
    value?: string,
    field:  fieldtypes,
    readonly: boolean
}

export type TFlowNode = {
    nodeID: string,
    nodeClass: nodeClass,
    name: string,
    description: string,
    type: unknown,
    properties: TFlowNodeProperty[]
}

export interface IFlowNode {
    nodeID: string,
    nodeClass: nodeClass,
    name: string,
    description: string,
    type: unknown,
    properties: Array<IFlowNodeProperty>
}

export const cbsTableCode:IFlowNodeProperty = {
    name: "cbsTableCode",
    label: "cbsTableCode",
    field: fieldtypes.TEXT,
    readonly: false
}

export const url:IFlowNodeProperty = {
        name: "url",
        label: "URL",
        field: fieldtypes.FILEPATH,
        readonly: false
}

export const filename:IFlowNodeProperty = {
    name: "filepath",
    label: "FILEPATH",
    field: fieldtypes.FILEPATH,
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

