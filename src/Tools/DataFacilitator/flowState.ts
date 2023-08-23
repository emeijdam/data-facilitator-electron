import { nanoid } from 'nanoid';

export enum WorkBenchItemType {
    MARKDOWN,
    HTML,
    TOOL,
    CBSTOOL,
    THEANALIST
}

export interface workBenchItem {
    id: string,
    title: string,
    type: WorkBenchItemType.MARKDOWN | WorkBenchItemType.HTML | WorkBenchItemType.TOOL | WorkBenchItemType.CBSTOOL | WorkBenchItemType.THEANALIST;
}

export type workBenchItems = workBenchItem[];

const initialWorkBenchItems: workBenchItems = [
    // { id: nanoid(), 'type': WorkBenchItemType.MARKDOWN, 'title': 'MARKDOWN File' },
    { id: nanoid(), 'type': WorkBenchItemType.TOOL, 'title': 'DATA Tool' },
    { id: nanoid(), 'type': WorkBenchItemType.CBSTOOL, 'title': 'CBS Tool' },
    { id: nanoid(), 'type': WorkBenchItemType.THEANALIST, 'title': 'FRIENDLY ANALIST' }
];

// An interface for our state
export interface AppState {
    userstatusBarMessagename: string;
    activeWorkBenchIndex: string; 
    workbenchItems: workBenchItem[];
}

export const initialAppState: AppState = {
    userstatusBarMessagename: '',
    activeWorkBenchIndex: initialWorkBenchItems[initialWorkBenchItems.length -1].id,
    workbenchItems: initialWorkBenchItems,
};

//

export type FlowNodeType = {
    nodeID: string,
    nodeClass: nodeClass,
    name: string,
    description: string,
    type: string,
    //properties: []
}

export enum nodeClass {
    SOURCENODE,
    EXPORTNODE
}

export type initFlowState ={
    nodes: FlowNodeType[],
  }

export const initialFlowState = 
    {
    nodes: [
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.SOURCENODE,
            name: 'CBS Table Observation',
            description: 'beschrijving',
            type: 'odata4',
            // properties: {
            //     url: ''
            // }
        },
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.EXPORTNODE,
            name: 'SPSS Save',
            description: 'beschrijving',
            type: 'SPSS',
            // properties: {
            //     filename: 'c:\\temp\\spssfile.sav'
            // }
        },
    ]
}
