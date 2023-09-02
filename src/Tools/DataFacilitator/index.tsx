import { Button, makeStyles, shorthands } from "@fluentui/react-components";
import { useReducer, useState } from "react";
import { ConnectorDialogTrigger } from "./ConnectorPicker";
import Tabulate from "../_datahelpers/Tabulate";
import { flowReducer } from "./flowReducer";
import { initialFlowState, nodeClass } from "./flowState";
import { FlowActionType } from "./flowActions";
import { FlowContext } from "./flowContext";
import { PropertyEditorDialogTrigger } from "./PropertyEditor";


const useStyles = makeStyles({
    dit: {
        //height: '100%;',
        // ...shorthands.overflow('scroll'),
    },
    flexy: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
    }

})

const FlowEditor: React.FC = () => {
    const [flowState, flowActionDispatch] = useReducer(flowReducer, initialFlowState);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [assetId, setAssetId] = useState("");

    const handleClick = () => {
        setLoading(true);
        // ?$filter=WijkenEnBuurten eq \'GM0363\'
        const tableid = '03763';

        fetch(`https://odata4.cbs.nl/CBS/${tableid}/Observations`)
            .then(response => response.json())
            .then((usefulData) => {
                setLoading(false);
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

    function setEditor(id: string) {
        setAssetId(id)
    }

    const classes = useStyles();

    return (
        <div id='doen' className={classes.dit}>
            <FlowContext.Provider value={{ flowState, flowActionDispatch }}>
                <h1>Data Source Nodes</h1>
                <ul>
                    {flowState.nodes.filter(node => node.nodeClass === nodeClass.SOURCENODE).map(node => (
                        <li key={node.nodeID} className={classes.flexy}>{node.name}
                            <PropertyEditorDialogTrigger buttonsize="small" nodeid={node.nodeID} opendialog={assetId == node.nodeID} setEditor={setEditor} />
                            <Button size="small" onClick={() => flowActionDispatch({ type: FlowActionType.DELETENODE, payload: node.nodeID })}>delete</Button></li>
                    ))}
                </ul>

                <ConnectorDialogTrigger setEditor={setEditor} />
                <br></br>

                <h1>Data Export Nodes</h1>
                <ul>
                    {flowState.nodes.filter(node => node.nodeClass === nodeClass.EXPORTNODE).map(node => (
                        <li key={node.nodeID} className={classes.flexy}>
                            {node.name}
                            <PropertyEditorDialogTrigger buttonsize="small" nodeid={node.nodeID} opendialog={false} setEditor={setEditor} />
                            <Button size="small" onClick={() => flowActionDispatch({ type: FlowActionType.DELETENODE, payload: node.nodeID })}>delete</Button>
                        </li>
                    ))}
                </ul>

                <ConnectorDialogTrigger setEditor={setEditor} />

                <br></br>
                <h1>Flow options</h1>
                <Button onClick={handleClick}>RUN FLOW</Button>
                <Button>SCHEDULE</Button>
                <div className="App">
                    {loading && <p>Loading...</p>}
                    <p>
                        {checkResponse(data) && <div > <h4>Observations</h4><Tabulate arr={data} /> </div>}
                    </p>
                </div>
            </FlowContext.Provider>
        </div>
    );
}

export default FlowEditor;