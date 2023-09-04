import { TFlowNode } from "./datastreet.state";

export enum TFlowActionType {
    ADDNODE,
    DELETENODE,
    UPDATENODE,
    EXECUTEFLOW
}

type TAddNode = { type: TFlowActionType.ADDNODE; payload: TFlowNode }
type TDeleteNode = { type: TFlowActionType.DELETENODE; payload: string }
type TUpdateNode = { type: TFlowActionType.UPDATENODE; payload: TFlowNode }

export type TFlowActions = TAddNode| TDeleteNode | TUpdateNode;