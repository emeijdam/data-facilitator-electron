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




// https://developer.microsoft.com/en-us/fluentui#/styles/web/m365-product-icons
interface ConnectorPickerProps {
    handleConnectorSelected: (values: unknown) => void;
    handleConnectorDoubleClick: () => void;
    selcon?: IConnector
}

const ConnectorPicker: React.FC<ConnectorPickerProps> = ({ handleConnectorSelected, handleConnectorDoubleClick, selcon }) => {
    const classes = useStyles();
    const [connectors] = useState(initialConnectors)

    const listConnectors = connectors.map((connector: IConnector) =>
        <li id="eddd" key={connector.id} className={(selcon == connector) ? classes.flexysel : classes.flexy} onClick={(e) => { if (e.detail === 1) handleConnectorSelected(connector); if (e.detail === 2) handleConnectorDoubleClick(); }}>
            <Image src={connector.logoimage} height={20} width={20} />
            {connector.name}
        </li>
    )

    return (
        <div id='huh' className={classes.gridContainer}>
            <ul>{listConnectors}</ul>
        </div>
    );
}

//export default ConnectorPicker;

