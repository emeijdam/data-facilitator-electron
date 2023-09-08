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
    { id: nanoid(), 'type': WorkBenchItemType.MARKDOWN, 'title': 'MARKDOWN File' },
    { id: nanoid(), 'type': WorkBenchItemType.TOOL, 'title': 'DataStreet Document Editor' },
    { id: nanoid(), 'type': WorkBenchItemType.CBSTOOL, 'title': 'CBS Tool' },
   // { id: nanoid(), 'type': WorkBenchItemType.THEANALIST, 'title': 'FRIENDLY ANALIST' }
];

// An interface for our state
export interface AppState {
    userstatusBarMessagename: string;
    activeWorkBenchIndex: string; 
    workbenchItems: workBenchItem[];
}

export const initialAppState: AppState = {
    userstatusBarMessagename: '',
    activeWorkBenchIndex: initialWorkBenchItems[1].id,
    workbenchItems: initialWorkBenchItems,
};