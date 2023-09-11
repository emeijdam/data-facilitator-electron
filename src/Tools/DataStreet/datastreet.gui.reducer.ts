
import { TDataStreetGuiActionType, TDataStreetGuiActions } from "./datastreet.gui.actions";
import { IDataStreetGuiState, initialDataStreetGuiState } from "./datastreet.gui.state";

export function dataStreetGuiReducer(state: IDataStreetGuiState, action: TDataStreetGuiActions) {
    switch (action.type) {
        case TDataStreetGuiActionType.SHOWDIALOG:
            return { ...state, displayAssetDialog: action.payload }
        case TDataStreetGuiActionType.DISMISSDIALOG:
            return { ...state, displayAssetDialog: "" }
        case TDataStreetGuiActionType.TOGGLEJSONVIEW:
            return { ...state, showJSONStreet: !state.showJSONStreet }
        case TDataStreetGuiActionType.TOGGLELOADING:
            return { ...state, loading: !state.loading }
        case TDataStreetGuiActionType.SETSELECTEDASSET:
            return { ...state, selectedAsset: action.payload }
        case TDataStreetGuiActionType.SHOWDIALOGNEW:
            console.log({...state, newdialog:action.payload})
            return { ...state, newdialog:action.payload}
        default:
            throw new Error();
    }
}