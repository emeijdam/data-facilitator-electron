import { Button, useRestoreFocusTarget} from "@fluentui/react-components";
import { useReducer, useState } from "react";
import Tabulate from "../_datahelpers/Tabulate";
import { flowReducer } from "./datastreet.reducer";
import { initialFlowState } from "./datastreet.state";
import { TFlowActionType } from "./datastreet.actions";
import { FlowContext } from "./datastreet.context";
import PropertyEditor, { PropertyEditorDialogTrigger } from "./_components/PropertyEditor";

import { IConnector, NodeClass, TFlowNode } from "./datastreet.types"
import { useStyles } from "./datastreet.styles";
import { dataStreetGuiReducer } from "./datastreet.gui.reducer";
import { initialDataStreetGuiState } from "./datastreet.gui.state";
import { TDataStreetGuiActionType } from "./datastreet.gui.actions";
import { ConnectorDialogTrigger } from "./_components/DiaStuff";
import { nanoid } from "nanoid";
import { DataStreetGuiContext } from "./datastreet.gui.context";
import { MyAppDialog, MyPropAppDialog } from "./_components/AppDialog";
import { ConnectorPicker } from "./_components/ConnectorPicker";
import { FCTEST, MyPropertyEditor, MyPropertyEditorProps, huh } from "./MyPropEdit";

export { DataStreetDocumentEditor };

const DataStreetDocumentEditor: React.FC = () => {
    const [flowState, flowActionDispatch] = useReducer(flowReducer, initialFlowState);
    const [dataStreetGuiState, dataStreetGuiActionDispatch] = useReducer(dataStreetGuiReducer, initialDataStreetGuiState);
    const [data, setData] = useState(null);
    const restoreFocusTargetAttribute = useRestoreFocusTarget();

    const classes = useStyles();

    // useEffect(() => {
    //     window.electronAPI.setTitle('hoi')

    // },[])

    const handleClick = () => {
        dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.TOGGLELOADING })
        // ?$filter=WijkenEnBuurten eq \'GM0363\'
        const tableid = '03763';

        fetch(`https://odata4.cbs.nl/CBS/${tableid}/Observations`)
            .then(response => response.json())
            .then((usefulData) => {
                dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.TOGGLELOADING })
                setData(usefulData.value);
                //setData(usefulData.value.slice(0,9));

            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    };

    function checkResponse(data: any) {
        if (data) {
            for (let i = 0; i < data.length; i++) {
                const obj = data[i];

                //  console.log(obj);
            }

            return <p>Fetched</p>;
        } else {
            return null;
        }
    }

    // saveConnector and close
    const handleSaveAsset = (item) => {
        //  ataStreetGuiState.selectedAsset  = cbsconnector
        // display cbs gui
        console.log('save!', item)
        if (item !== null) {
            const node: TFlowNode = {
                nodeID: nanoid(),
                nodeClass: NodeClass.SOURCENODE,
                name: item.name,
                description: item.description,
                type: item.type,
                properties: item.properties
            }

            flowActionDispatch({ type: TFlowActionType.ADDNODE, payload: node })
           
           // dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOG, payload: node.nodeID })
        }
        dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOGNEW, payload: {open: false, displayComponent: null, saveButton: null} })
        console.log('close save!')
    }

    function simple(node){
        console.log('simple', node)
    }
   
    const onEdit = (snode: TFlowNode) => {

        const propy: MyPropertyEditorProps = {
            node: snode
        }
        
        const dialogp = {
            open: true,
            displayComponent: FCTEST, 
            saveButton: simple
        }

        dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOGNEW, payload: {open: true, displayComponent: <FCTEST mystring="test"/>, saveButton: simple}})
    }

    return (
        <div id='doen' className={classes.dit}>
            {!dataStreetGuiState.showJSONStreet ? <FlowContext.Provider value={{ flowState, flowActionDispatch }}>
                
                <h1>Data Source Nodes</h1>
                <ul>
                    {flowState.nodes.filter(node => node.nodeClass === NodeClass.SOURCENODE).map(node => (
                        <li key={node.nodeID} className={classes.flexy}>{node.name}
                            {/* <PropertyEditorDialogTrigger buttonsize="small" nodeid={node.nodeID} opendialog={dataStreetGuiState.displayAssetDialog == node.nodeID} setPropertyEditorOpenId={() => dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOG, payload: node.nodeID })} /> */}
                            <Button size="small" onClick={()=> dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.NODEPROPERTYEDITORDIALOG, payload: {open: true, displayComponent: <MyPropertyEditor node={node}/>, saveButton: simple}})}>Edit node</Button>
                            <Button size="small" onClick={() => flowActionDispatch({ type: TFlowActionType.DELETENODE, payload: node.nodeID })}>delete</Button></li>
                    ))}
                </ul>
                <DataStreetGuiContext.Provider value={{ dataStreetGuiState, dataStreetGuiActionDispatch }}>
                    {/* <ConnectorDialogTrigger handleSave={handleSaveAsset} /> */}
               
                <Button  {...restoreFocusTargetAttribute} onClick={() => dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.SHOWDIALOGNEW, payload: {open: true, displayComponent: <ConnectorPicker/>, saveButton: handleSaveAsset} })}>Add Data Asset</Button>
                <MyAppDialog/>
                <MyPropAppDialog/>
                </DataStreetGuiContext.Provider>
                <br></br>

                <h1>Data Export Nodes</h1>
                <ul>
                    {flowState.nodes.filter(node => node.nodeClass === NodeClass.EXPORTNODE).map(node => (
                        <li key={node.nodeID} className={classes.flexy}>
                            {node.name}
                            {/* <PropertyEditorDialogTrigger buttonsize="small" nodeid={node.nodeID} opendialog={false} setPropertyEditorOpenId={() => dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.DISMISSDIALOG, payload: false })} /> */}
                            <Button size="small" onClick={() => flowActionDispatch({ type: TFlowActionType.DELETENODE, payload: node.nodeID })}>delete</Button>
                        </li>
                    ))}
                </ul>
                {/* <DataStreetGuiContext.Provider value={{ dataStreetGuiState, dataStreetGuiActionDispatch }}>
                    <ConnectorDialogTrigger handleSave={handleSaveAsset} />
                </DataStreetGuiContext.Provider> */}
                <br></br>
                <h1>Flow options</h1>
                <Button onClick={handleClick}>RUN FLOW</Button>
                <Button>SCHEDULE</Button>
                <div className="App">
                    {dataStreetGuiState.loading && <p>Loading...</p>}
                    <p>
                        {checkResponse(data) && <div > <h4>Observations</h4><Tabulate arr={data} /> </div>}
                    </p>
                </div>
            </FlowContext.Provider>
                :
                <div className={classes.editor} >
                    <pre>{JSON.stringify(flowState, null, 2)}</pre>
                </div>
            }
          
        </div>
    );
}