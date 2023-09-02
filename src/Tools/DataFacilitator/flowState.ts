import { nanoid } from 'nanoid';

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
    JSON
}

export interface IConnector {
    id: string,
    name: string,
    description: string,
    type: connectorType,
    logoimage: string,
    properties:  IFlowNodeProperty[] 

}

export type initFlowState = {
    nodes: TFlowNode[],
  }

export const initialFlowState:initFlowState = 
    {
    nodes: [
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.SOURCENODE,
            name: 'CBS Table Observation',
            description: 'beschrijving',
            type: 'odata4',
            properties: [
                url
            ]
        },
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.EXPORTNODE,
            name: 'SPSS Save',
            description: 'beschrijving',
            type: 'SPSS',
            properties: [
                filename
            ]
        },
    ]
}
