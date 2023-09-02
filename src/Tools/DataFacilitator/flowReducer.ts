import { flowActions, FlowActionType } from "./flowActions";
import { initFlowState } from "./flowState";

export function flowReducer(state: initFlowState, action: flowActions): initFlowState {
    switch (action.type) {
        case FlowActionType.ADDNODE:
            //console.log(state);
            return { nodes: [...state.nodes, action.payload] }
        case FlowActionType.UPDATENODE:
            return {
                ...state,
                nodes: [...state.nodes.filter( node => node.nodeID !== action.payload.nodeID), action.payload]
            }
        case FlowActionType.DELETENODE:
            //console.log(state)
            //console.log(action.payload)
            // console.log({ nodes: [...state.nodes.filter((node) => node.nodeID !== action.payload)] })
            return { nodes: [...state.nodes.filter((node) => node.nodeID !== action.payload)] }

        default:

            throw new Error();
    }
}