import { ReactElement } from "react"
import { PropertyEditorProps } from "./_components/PropertyEditor"
import { IConnector, TFlowNode } from "./datastreet.types"


export interface IDialogState{
        open: boolean,
        saveButton: (values: unknown) => void | null,
        displayComponent: React.ReactElement
}

export interface IDialogStateNode{
    open: boolean,
    saveButton: (node:TFlowNode) => void,
    displayComponent: React.ReactElement
}

export interface IDataStreetGuiState {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode,
    dialogstate: IDialogState,
    dialogPropEditstate: IDialogStateNode
}


export type TDataStreetGuiState = {
    displayAssetDialog: string,
    showJSONStreet: boolean,
    loading: boolean,
    selectedAsset: IConnector | TFlowNode,
    dialogstate: IDialogState,
    dialogPropEditstate: IDialogStateNode
}

export const initialDataStreetGuiState:TDataStreetGuiState = {
    displayAssetDialog: "",
    showJSONStreet: false,
    loading: false,
    selectedAsset: null,
    dialogstate: {
        open: false,
        saveButton: null,
        displayComponent: null
    },
    dialogPropEditstate: {
        open: false,
        saveButton: null,
        displayComponent: null
    },
}