
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
            console.log('selected asset')
            console.log({...state, selectedAsset: action.payload})
            return { ...state, selectedAsset: action.payload }
        case TDataStreetGuiActionType.SHOWDIALOGNEW:
            console.log('showdialog new')
            console.log({...state, dialogstate:action.payload})
            return { ...state, dialogstate:action.payload}
        case TDataStreetGuiActionType.NODEPROPERTYEDITORDIALOG:
            console.log('showdialog new')
            console.log({...state, dialogPropEditstate:action.payload})
            return { ...state, dialogPropEditstate:action.payload}
        default:
            throw new Error();
    }
}