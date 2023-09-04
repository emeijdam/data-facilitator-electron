import { makeStyles, shorthands, Image, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { useState, useContext } from "react";
import { FlowContext } from "../datastreet.context";
import { TFlowActionType } from "../datastreet.actions";
import { nanoid } from "nanoid";
import { IConnector, TFlowNode, cbsTableCode, connectorType, filename, nodeClass, url } from '../datastreet.types'

const useStyles = makeStyles({
    flexy: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
    },
    flexysel: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
        backgroundColor: '#2196F3',
    },
    gridContainer: {
        display: 'inline-grid',
        height: '400px;',
        minHeight: '0px',
        width: '600px',
        minWidth: '0px',
        overflowY: 'scroll',
        gridTemplateColumns: 'auto auto auto auto',
        // backgroundColor: '#2196F3',
        ...shorthands.padding('10px'),
        columnGap: '50px',
        rowGap: '50px',
        ...shorthands.overflow('hidden'),
    },
    root: {
        width: '64px',
        height: '64px',
        ...shorthands.padding('10px'),
        ...shorthands.border('1px', 'solid', 'red'),
        textAlign: 'center',
        backgroundColor: 'green',
    }
});

const resolveAsset = (asset: string) => {
    const ASSET_URL =
        "https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/brand-icons/product/svg/";
    return `${ASSET_URL}${asset}`;
};

// const excelLogo = resolveAsset("excel_48x1.svg");
// const wordLogo = resolveAsset("word_48x1.svg");
// const powerpointLogo = resolveAsset("powerpoint_48x1.svg");
// const onedriveLogo = resolveAsset("onedrive_48x1.svg");
// const sharepointLogo = resolveAsset("sharepoint_48x1.svg");

export const excelconn: IConnector = {
    id: nanoid(),
    name: 'Excel',
    description: 'beschrijving',
    type: connectorType.EXCEL,
    logoimage: resolveAsset("excel_48x1.svg"),
    properties: [
        filename
    ],
}


const initialConnectors: IConnector[] = [
    excelconn,
    {
        id: nanoid(),
        name: 'SharePoint',
        description: 'beschrijving',
        type: connectorType.ODATA4,
        logoimage: resolveAsset("sharepoint_48x1.svg"),
        properties: [
            filename
        ],
    },
    {
        id: nanoid(),
        name: 'CSV',
        description: 'beschrijving',
        type: connectorType.CSV,
        logoimage: resolveAsset("excel_48x1.svg"),
        properties: [
            filename
        ],
    },
    {
        id: nanoid(),
        name: 'OneDrive',
        description: 'beschrijving',
        type: connectorType.ONEDRIVE,
        logoimage: resolveAsset("onedrive_48x1.svg"),
        properties: [
            url
        ],
    },
    {
        id: nanoid(),
        name: 'CBS',
        description: 'beschrijving',
        type: connectorType.CBS,
        logoimage: "",
        properties: [
            cbsTableCode
        ],
    },
]

interface ConnectorDialogTriggerProps {
    buttonsize?: "medium" | "small" | "large",
    setEditor: (values: unknown) => void;
    // nodeid: string
}

export const ConnectorDialogTrigger: React.FC<ConnectorDialogTriggerProps> = ({ buttonsize = "medium", setEditor }) => {
    const { flowActionDispatch } = useContext(FlowContext);
    const [connector, setConnector] = useState<IConnector>();
    const [openEditor, setOpenEditor] = useState(false);

    // const handleConnectorSelectedChange = (connector) => {
    //     setConnector(connector)
    // }

    const handleUpdate = () => {
        if (connector.type == connectorType.CBS) {
            // show cbs dialog
        }
        const node: TFlowNode = {
            nodeID: nanoid(),
            nodeClass: nodeClass.SOURCENODE,
            name: connector.name,
            description: connector.description,
            type: connector.type,
            properties: connector.properties
        }

        flowActionDispatch({ type: TFlowActionType.ADDNODE, payload: node })
        setOpenEditor(false)
        setEditor(node.nodeID)
    }


    return (
        <Dialog open={openEditor} onOpenChange={(event, data) => setOpenEditor(data.open)}>
            <DialogTrigger disableButtonEnhancement>
                <Button size={buttonsize}>Get Data</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Get Data</DialogTitle>
                    <DialogContent>
                        <ConnectorPicker handleConnectorSelected={(connector: IConnector) => { setConnector(connector) }} handleConnectorDoubleClick={handleUpdate} selcon={connector} />
                    </DialogContent>
                    <DialogActions>
                        <Button appearance="primary" onClick={handleUpdate}>Connect</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

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

export default ConnectorPicker;

