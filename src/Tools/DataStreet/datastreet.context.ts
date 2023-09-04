import React from "react";
import { initFlowState, initialFlowState } from "./datastreet.state"
import { TFlowActions } from "./datastreet.actions";

export const FlowContext = React.createContext<{flowState: initFlowState;flowActionDispatch: React.Dispatch<TFlowActions>;}>({flowState: initialFlowState, flowActionDispatch: () => undefined,});