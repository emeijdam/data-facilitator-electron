import { TFlowNode } from "./flowState";

export enum FlowActionType {
    ADDNODE,
    DELETENODE,
    UPDATENODE,
    EXECUTEFLOW
}

type TAddNode = { type: FlowActionType.ADDNODE; payload: TFlowNode }
type TDeleteNode = { type: FlowActionType.DELETENODE; payload: string }
type TUpdateNode = { type: FlowActionType.UPDATENODE; payload: TFlowNode }

export type flowActions = TAddNode| TDeleteNode | TUpdateNode;