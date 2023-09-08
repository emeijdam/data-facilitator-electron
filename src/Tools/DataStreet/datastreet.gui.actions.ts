import { IConnector, IFlowNode } from "./datastreet.types";

export enum TDataStreetGuiActionType {
    SHOWDIALOG,
    DISMISSDIALOG,
    TOGGLEJSONVIEW,
    TOGGLELOADING,
    SETSELECTEDASSET,
}

type TASSET =  IConnector | IFlowNode
type TDisplayDialog = { type: TDataStreetGuiActionType.SHOWDIALOG; payload: string }
type TDismissDialog = { type: TDataStreetGuiActionType.DISMISSDIALOG; payload: boolean }
type TToggleJsonView = { type: TDataStreetGuiActionType.TOGGLEJSONVIEW}
type TTOGGLELOADING = { type: TDataStreetGuiActionType.TOGGLELOADING}
type TSETCONNECTOR = { type: TDataStreetGuiActionType.SETSELECTEDASSET; payload: TASSET}

export type TDataStreetGuiActions = TDisplayDialog | TDismissDialog | TToggleJsonView | TTOGGLELOADING | TSETCONNECTOR;