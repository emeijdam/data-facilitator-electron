import { FlowNodeType } from "./flowState";

export enum FlowActionType {
    ADDNODE,
    DELETENODE,
    EXECUTEFLOW
}

type AddNodeType = { type: FlowActionType.ADDNODE; node: FlowNodeType }
type DeleteNodeType = { type: FlowActionType.DELETENODE; nodeID: string }

export type FlowAction = AddNodeType | DeleteNodeType