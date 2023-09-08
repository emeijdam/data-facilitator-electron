import React from "react";
import { TDataStreetGuiState, initialDataStreetGuiState } from "./datastreet.gui.state";
import { TDataStreetGuiActions } from "./datastreet.gui.actions";

export const DataStreetGuiContext = React.createContext<
{dataStreetGuiState:TDataStreetGuiState;dataStreetGuiActionDispatch: React.Dispatch<TDataStreetGuiActions>;}
>({dataStreetGuiState: initialDataStreetGuiState, dataStreetGuiActionDispatch: () => undefined,});
