import { workBenchItem } from "./state";

export enum ActionType {
    SetStatusBarMessage,
    SetActiveWorkbenchItem,
    AddWorkbenchTool,
    RemoveWorkbenchTool,
}

type SetStatusBarMessage = { type: ActionType.SetStatusBarMessage; payload: string };
type SetActiveWorkbenchItem = { type: ActionType.SetActiveWorkbenchItem; payload: string };
type AddWorkbenchTool = { type: ActionType.AddWorkbenchTool; payload: workBenchItem };
type RemoveWorkbenchTool = { type: ActionType.RemoveWorkbenchTool; payload: string };

export type AppActions = SetStatusBarMessage | SetActiveWorkbenchItem | AddWorkbenchTool | RemoveWorkbenchTool