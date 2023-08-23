import { FlowAction, FlowActionType } from "./flowActions";
import { initFlowState } from "./flowState";

export function flowReducer(state: initFlowState, action: FlowAction): initFlowState {
    //  const { type, payload } = action;
      switch (action.type) {
          case FlowActionType.ADDNODE:
              console.log(state);
              return {nodes: [...state.nodes, action.node]}
          case FlowActionType.DELETENODE:
              console.log(state)
            //  items: state.items.filter((item) => item.id !== action.payload),
            
             // return state.filter( (node) => node.nodeID !== action.nodeID );
              return {nodes: [...state.nodes.filter((node) => node.nodeID !== action.nodeID )]}
          default:
              throw new Error();
      }
  }