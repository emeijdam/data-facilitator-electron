import { IConnector, TFlowNode } from "./datastreet.types"

export interface IDataStreetGuiState {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode
}


export type TDataStreetGuiState = {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode
}

export const initialDataStreetGuiState:TDataStreetGuiState = {
    displayAssetDialog: "",
    showJSONStreet: false,
    loading: false,
    selectedAsset: null
}