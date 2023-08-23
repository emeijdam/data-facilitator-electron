import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, shorthands } from "@fluentui/react-components";
import { useReducer, useState } from "react";
import ConnectorPicker from "./ConnectorPicker";
import Tabulate from "../_datahelpers/Tabulate";
import { nanoid } from 'nanoid';
import { flowReducer } from "./flowReducer";
import { FlowNodeType, initialFlowState, nodeClass } from "./flowState";
import { FlowActionType } from "./flowActions";


const useStyles = makeStyles({
    dit: {
        //height: '100%;',
        // ...shorthands.overflow('scroll'),
    },
})

const FlowEditor: React.FC = () => {
    const [flowDocument, flowActionDispatch] = useReducer(flowReducer, initialFlowState);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const AddNode = () => {
        const x:FlowNodeType = {
                nodeID: nanoid(),
                nodeClass: nodeClass.SOURCENODE,
                name: 'CBS Table Observation',
                description: 'beschrijving',
                type: 'odata4',
                // properties: {
                //     url: ''
                // }
            }
        
        flowActionDispatch({
            type: FlowActionType.ADDNODE,
            node: x
        });
    }

    const deleteNode = (nodeid: string) => {
        flowActionDispatch({
            type: FlowActionType.DELETENODE,
            nodeID: nodeid
            }
        );
    }

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
    const classes = useStyles();

    return (
        <div id='doen' className={classes.dit}>
            <h1>Import Connections</h1>
            <ul>
                {flowDocument.nodes.filter(node => node.nodeClass === nodeClass.SOURCENODE).map(node => (
                    <li key={node.name}>{node.name} <Button size="small" onClick={() => deleteNode(node.nodeID)}>delete</Button></li>
                ))}
            </ul>
            <Button onClick={AddNode}>Addx</Button>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            <ConnectorPicker />
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                            </DialogTrigger>
                            <Button appearance="primary">Do Something</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            {/* <ConnectorPicker/> */}
            <br></br>

            <h1>Export Connections</h1>
            <ul>
                {flowDocument.nodes.filter(node => node.nodeClass === nodeClass.EXPORTNODE).map(node => (
                    <li key={node.name}>{node.name} <Button size="small" onClick={() => deleteNode(node.nodeID)}>delete</Button></li>
                ))}
            </ul>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            <ConnectorPicker />
                        </DialogContent>
                        <DialogActions>
                            <DialogTrigger disableButtonEnhancement>
                                <Button appearance="secondary">Close</Button>
                            </DialogTrigger>
                            <Button appearance="primary">Do Something</Button>
                        </DialogActions>
                    </DialogBody>
                </DialogSurface>
            </Dialog>
            {/* <ConnectorPicker/> */}
            <br></br>
            <h1>Flow options</h1>
            <Button onClick={handleClick}>RUN FLOW</Button>
            <Button>SCHEDULE</Button>
            {/* <button type="submit" onClick={handleClick}>Connect</button> */}
            {/* {checkResponse(data)} */}
            <div className="App">
                {loading && <p>Loading...</p>}
                <p>
                    {checkResponse(data) && <div > <h4>Observations</h4><Tabulate arr={data} /> </div>}
                </p>
            </div>
        </div>
    );
}

export default FlowEditor;