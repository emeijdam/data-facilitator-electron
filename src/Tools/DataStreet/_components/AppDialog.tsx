import { DialogTriggerChildProps, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { Context, Dispatch, forwardRef, useState , useContext, useRef} from "react";
import { ConnectorPicker } from "./ConnectorPicker";
import { DataStreetGuiContext } from "../datastreet.gui.context";
import { TDataStreetGuiActionType, TDataStreetGuiActions } from "../datastreet.gui.actions";
import { TDataStreetGuiState } from "../datastreet.gui.state";

export { MyAppDialog, MyPropAppDialog}

const CustomDialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerChildProps>((props, ref) => {
    return (
        <Button {...props} ref={ref}>
            Custom Trigger
        </Button>
    );
});

interface IAppDialogProps {
    openstate: boolean,
    opendispatch: (values: unknown) => void,
 //   component: React.FC
}


// Action 1 save selected connector
// Action 2 Update node

const MyAppDialog: React.FC = () => {
    const { dataStreetGuiState, dataStreetGuiActionDispatch } = useContext(DataStreetGuiContext);
    
    return (
        <Dialog open={dataStreetGuiState.dialogstate.open} onOpenChange={(event, data) => {  dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOGNEW, payload: {open: data.open,  displayComponent: dataStreetGuiState.dialogstate.displayComponent, saveButton: dataStreetGuiState.dialogstate.saveButton} });
          }} >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Add Data</DialogTitle>
                    <DialogContent>
                        {/* <ConnectorPicker handleSave={handleSave}/> */}
                        {dataStreetGuiState.dialogstate.displayComponent !== null  ? dataStreetGuiState.dialogstate.displayComponent
                        : <>not set</>
                        }
                    </DialogContent>
                    <DialogActions>
                       <Button appearance="primary" onClick={()=> dataStreetGuiState.dialogstate.saveButton(dataStreetGuiState.selectedAsset)}>Connect</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

const MyPropAppDialog: React.FC = () => {
    const { dataStreetGuiState, dataStreetGuiActionDispatch } = useContext(DataStreetGuiContext);
    
    return (
        <Dialog open={dataStreetGuiState.dialogPropEditstate.open} onOpenChange={(event, data) => {  dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.NODEPROPERTYEDITORDIALOG, payload: {open: data.open,  displayComponent: dataStreetGuiState.dialogPropEditstate.displayComponent, saveButton: dataStreetGuiState.dialogPropEditstate.saveButton} });
          }} >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Edit Node</DialogTitle>
                    <DialogContent>
                        {/* <ConnectorPicker handleSave={handleSave}/> */}
                        {dataStreetGuiState.dialogPropEditstate.displayComponent !== null  ? dataStreetGuiState.dialogPropEditstate.displayComponent
                        : <>not set</>
                        }
                    </DialogContent>
                    <DialogActions>
                       <Button appearance="primary">Save</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}
