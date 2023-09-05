import { nanoid } from "nanoid";
import { IConnector, cbsTableCode, connectorType, filename, url } from "../datastreet.types";

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

export const MSExcelConnector: IConnector = {
    id: nanoid(),
    name: 'Excel',
    description: 'beschrijving',
    type: connectorType.EXCEL,
    logoimage: resolveAsset("excel_48x1.svg"),
    properties: [
        filename
    ],
}

export const CBSConnector: IConnector = {
    id: nanoid(),
    name: 'CBS',
    description: 'beschrijving',
    type: connectorType.CBS,
    logoimage: "",
    properties: [
        cbsTableCode
    ],
}


export const initialConnectors: IConnector[] = [
    MSExcelConnector,
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
    CBSConnector,
]