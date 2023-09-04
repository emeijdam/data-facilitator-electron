import { TFlowActions, TFlowActionType } from "./datastreet.actions";
import { initFlowState } from "./datastreet.state";

export function flowReducer(state: initFlowState, action: TFlowActions): initFlowState {
    switch (action.type) {
        case TFlowActionType.ADDNODE:
            //console.log(state);
            return { nodes: [...state.nodes, action.payload] }
        case TFlowActionType.UPDATENODE:
            return {
                ...state,
                nodes: [...state.nodes.filter( node => node.nodeID !== action.payload.nodeID), action.payload]
            }
        case TFlowActionType.DELETENODE:
            //console.log(state)
            //console.log(action.payload)
            // console.log({ nodes: [...state.nodes.filter((node) => node.nodeID !== action.payload)] })
            return { nodes: [...state.nodes.filter((node) => node.nodeID !== action.payload)] }

        default:

            throw new Error();
    }
}