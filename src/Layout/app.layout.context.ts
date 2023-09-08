import React from "react";
import { AppState, initialAppState } from "./app.layout.state";
import { AppActions } from "./app.layout.actions";

export const AppContext = React.createContext<{state: AppState;dispatch: React.Dispatch<AppActions>;}>({state: initialAppState, dispatch: () => undefined,});