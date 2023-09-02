import React from "react";
import { initFlowState, initialFlowState } from "./flowState"
import { flowActions } from "./flowActions";

export const FlowContext = React.createContext<{flowState: initFlowState;flowActionDispatch: React.Dispatch<flowActions>;}>({flowState: initialFlowState, flowActionDispatch: () => undefined,});