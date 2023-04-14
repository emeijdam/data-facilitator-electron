import { nanoid } from 'nanoid';

export enum WorkBenchItemType {
    MARKDOWN,
    HTML,
    TOOL,
    CBSTOOL
}

export interface workBenchItem {
    id: string,
    title: string,
    type: WorkBenchItemType.MARKDOWN | WorkBenchItemType.HTML | WorkBenchItemType.TOOL | WorkBenchItemType.CBSTOOL;
}

export type workBenchItems = workBenchItem[];

let initialWorkBenchItems: workBenchItems = [
    { id: nanoid(), 'type': WorkBenchItemType.MARKDOWN, 'title': 'MarkdownFile' },
    { id: nanoid(), 'type': WorkBenchItemType.CBSTOOL, 'title': 'CBS Tool' },
    { id: nanoid(), 'type': WorkBenchItemType.TOOL, 'title': 'Data Tool' },
];

// An interface for our state
export interface AppState {
    userstatusBarMessagename: string;
    activeWorkBenchIndex: string; 
    workbenchItems: workBenchItem[];
}

export const initialAppState: AppState = {
    userstatusBarMessagename: '',
    activeWorkBenchIndex: '',
    workbenchItems: initialWorkBenchItems,
};