import { makeStyles, shorthands, Image } from "@fluentui/react-components";
import { useState } from "react";



const useStyles = makeStyles({
    gridContainer: {
        display: 'inline-grid',
        height: '100%;',
        minHeight: '0px',
        width: '100%',
        minWidth: '0px',
        overflowY: 'scroll',
        gridTemplateColumns: 'auto auto auto auto',
        backgroundColor: '#2196F3',
        ...shorthands.padding('10px'),
        columnGap: '50px',
        rowGap: '50px',
        ...shorthands.overflow('hidden'),
    },
    root: {
        width: '250px',
        height: '150px',
        ...shorthands.padding('10px'),
        ...shorthands.border('1px', 'solid', 'red'),
        textAlign: 'center',
        backgroundColor: 'green',

    }
});


const initialConnectors = [
    {
        name: 'Excel',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/brand-icons/product/svg/excel_48x1.svg',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://devblogs.microsoft.com/odata/wp-content/uploads/sites/23/2019/02/ODataLogo-150.png',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'ODATA',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://devblogs.microsoft.com/odata/wp-content/uploads/sites/23/2019/02/ODataLogo-150.png',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://devblogs.microsoft.com/odata/wp-content/uploads/sites/23/2019/02/ODataLogo-150.png',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'XML',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Xml_logo.svg',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'JSON',
        description: 'beschrijving',
        type: 'odata4',
        iconUrl: 'https://www.json.org/img/json160.gif',
        connectorConfiguration: {
            url: ''
        }
    },
]

const resolveAsset = (asset: string) => {
    const ASSET_URL =
        "https://res-1.cdn.office.net/files/fabric-cdn-prod_20221209.001/assets/brand-icons/product/svg/";
    return `${ASSET_URL}${asset}`;
};

const excelLogo = resolveAsset("excel_48x1.svg");
const wordLogo = resolveAsset("word_48x1.svg");
const powerpointLogo = resolveAsset("powerpoint_48x1.svg");
const onedriveLogo = resolveAsset("onedrive_48x1.svg");
const sharepointLogo = resolveAsset("sharepoint_48x1.svg");
const odata4Logo = "https://devblogs.microsoft.com/odata/wp-content/uploads/sites/23/2019/02/ODataLogo-150.png"
// https://developer.microsoft.com/en-us/fluentui#/styles/web/m365-product-icons
const longlist = [...initialConnectors, ...initialConnectors, ...initialConnectors]

interface ConnectorPickerProps {
    addConnection: any
}

const ConnectorPicker: React.FC<ConnectorPickerProps> = ({addConnection}) => {
    const classes = useStyles();
    const [connectors, setconnectors] = useState(longlist)

    const listConnectors = connectors.map((connector: any) =>
        <div className={classes.root} onClick={() => (addConnection(connector))}> 
            <Image src={connector.iconUrl} />
            {connector.name}
        </div>
    )

    return (
        <div id='huh' className={classes.gridContainer}>
            {listConnectors}
        </div>
    );
}

export default ConnectorPicker;