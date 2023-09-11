import { IConnector, TFlowNode } from "./datastreet.types"

export interface IDataStreetGuiState {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode,
    newdialog: boolean
}


export type TDataStreetGuiState = {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode,
    newdialog: boolean
}

export const initialDataStreetGuiState:TDataStreetGuiState = {
    displayAssetDialog: "",
    showJSONStreet: false,
    loading: false,
    selectedAsset: null,
    newdialog: false
}