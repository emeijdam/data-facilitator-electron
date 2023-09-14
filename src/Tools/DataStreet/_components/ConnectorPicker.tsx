import { makeStyles, shorthands, Image, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, DialogTriggerChildProps } from "@fluentui/react-components";
import { useState, useContext, forwardRef } from "react";
import { FlowContext } from "../datastreet.context";
import { TFlowActionType } from "../datastreet.actions";
import { nanoid } from "nanoid";
import { IConnector, TFlowNode, cbsTableCode, connectorType, filename, NodeClass, url } from '../datastreet.types'
import { initialConnectors } from "./connectors.state";
import { TDataStreetGuiActionType } from "../datastreet.gui.actions";
import { useStyles } from "./connectorpicker.styles";
import { CustomDialogTrigger } from "./DiaStuff";
import { DataStreetGuiContext } from "../datastreet.gui.context";

export { ConnectorPicker};

// https://developer.microsoft.com/en-us/fluentui#/styles/web/m365-product-icons
interface ConnectorPickerProps {
    handleSave?: (values: unknown) => void
}

const ConnectorPicker: React.FC<ConnectorPickerProps> = ({ handleSave}) => {
    const { dataStreetGuiState, dataStreetGuiActionDispatch } = useContext(DataStreetGuiContext);
    const [connectors] = useState(initialConnectors)

    const classes = useStyles();

    const listConnectors = connectors.map((connector: IConnector) =>
            <li id="eddd" key={connector.id} className={(dataStreetGuiState.selectedAsset == connector) ? classes.flexysel : classes.flexy} 
            onClick={() =>  dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SETSELECTEDASSET, payload: connector}) } 
            onDoubleClick={()=> dataStreetGuiState.dialogstate.saveButton(dataStreetGuiState.selectedAsset)}>
            <Image src={connector.logoimage} height={20} width={20} />
            {connector.name}
        </li>
    )

    return (
        <div id='huh' className={classes.gridContainer}>
            deze
            <ul>{listConnectors}</ul>
        </div>
    );
}