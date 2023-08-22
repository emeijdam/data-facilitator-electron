import { makeStyles, shorthands, Image} from "@fluentui/react-components";
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

  const excelLogo = resolveAsset("excel_48x1.svg");
  const wordLogo = resolveAsset("word_48x1.svg");
  const powerpointLogo = resolveAsset("powerpoint_48x1.svg");
  const onedriveLogo = resolveAsset("onedrive_48x1.svg");
  const sharepointLogo = resolveAsset("sharepoint_48x1.svg");

const initialConnectors = [
    {
        name: 'Excel',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  excelLogo
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  excelLogo
    },
    {
        name: 'ODATA',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  onedriveLogo
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  excelLogo
    },
    {
        name: 'XML',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  excelLogo
    },
    {
        name: 'JSON',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        },
        image:  sharepointLogo
    },
]





 // https://developer.microsoft.com/en-us/fluentui#/styles/web/m365-product-icons
const longList = [...initialConnectors, ...initialConnectors, ...initialConnectors]
const shortList = [...initialConnectors]

const ConnectorPicker: React.FC = () => {
    const classes = useStyles();
    const [connectors, setconnectors] = useState(shortList)

    const listConnectors = connectors.map((connector: any) => 
        <div className={classes.root}> 
            <Image src={sharepointLogo}/>
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