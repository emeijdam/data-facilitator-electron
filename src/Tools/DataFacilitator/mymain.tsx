import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, shorthands } from "@fluentui/react-components";
import { useReducer, useState } from "react";
import ConnectorPicker from "./ConnectorPicker";
import Tabulate from "../_datahelpers/Tabulate";
import { nanoid } from 'nanoid';

const useStyles = makeStyles({
    dit: {

        //height: '100%;',
        // ...shorthands.overflow('scroll'),
    },
})

/// between 
enum nodeClass {
    SOURCENODE,
    EXPORTNODE
}

enum FlowActionType {
    ADDNODE,
    DELETENODE,
    EXECUTEFLOW
}

type FlowAction =
    | { type: FlowActionType.ADDNODE; node: FlowNode }
    | { type: FlowActionType.DELETENODE; nodeID: string }

type FlowNode = {
    nodeID: string,
    nodeClass: nodeClass,
    name: string,
    description: string,
    type: string,
    //properties: []
}


type initFlowState ={
    nodes: FlowNode[],
  }


const initialFlowState = 
    {
    nodes: [
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.SOURCENODE,
            name: 'CBS Table Observation',
            description: 'beschrijving',
            type: 'odata4',
            // properties: {
            //     url: ''
            // }
        },
        {
            nodeID: nanoid(),
            nodeClass: nodeClass.EXPORTNODE,
            name: 'SPSS Save',
            description: 'beschrijving',
            type: 'SPSS',
            // properties: {
            //     filename: 'c:\\temp\\spssfile.sav'
            // }
        },
    ]
}




function flowReducer(state: initFlowState, action: FlowAction): initFlowState {
  //  const { type, payload } = action;
    switch (action.type) {
        case FlowActionType.ADDNODE:
            console.log(state);
            return {nodes: [...state.nodes, action.node]}
        case FlowActionType.DELETENODE:
            console.log(state)
          //  items: state.items.filter((item) => item.id !== action.payload),
          
           // return state.filter( (node) => node.nodeID !== action.nodeID );
            return {nodes: [...state.nodes.filter((node) => node.nodeID !== action.nodeID )]}
        default:
            throw new Error();
    }
}
///


// const initialDataTables = [
//     {
//         nodeID: nanoid(),
//         name: 'CBS Table Observation',
//         description: 'beschrijving',
//         type: 'odata4',
//         connectorConfiguration: {
//             url: ''
//         }
//     },
//     {
//         nodeID: nanoid(),
//         name: 'CBS Table Metadata',
//         description: 'beschrijving',
//         type: 'odata4',
//         connectorConfiguration: {
//             url: ''
//         }
//     },
// ]

// const stateding =
// {
//     "imports": initialDataTables,
//     "exports": initialDataTables
// }



// enum UserActionType {
//     ADD = "addImport",
//     DELETE = "Delete"
// }

// interface Connection {
//     nodeID: string,
//     name: string,
//     description: string,
//     type: string
//     connectorConfiguration: { url: string }
// }

// type ImportConnectionsSTATE = Connection[];

// const initialImportConnections: ImportConnectionsSTATE = initialDataTables;

// type UserAction =
//     | { type: UserActionType.ADD; connection: Connection }
//     | { type: UserActionType.DELETE; nodeID: string }

// function userReducer(state: ImportConnectionsSTATE, action: UserAction): ImportConnectionsSTATE {
//     switch (action.type) {
//         case UserActionType.ADD:
//             console.log(state)
//             return [...state, action.connection];
//         case UserActionType.DELETE:
//             console.log(state)
//           //  items: state.items.filter((item) => item.id !== action.payload),
          
//             return state.filter( (node) => node.nodeID !== action.nodeID );
//         default:
//             throw new Error();
//     }
// }

const DOEN: React.FC = () => {
    // const [dataTables, setDataTables] = useState(stateding)
    const [flowDocument, flowActionDispatch] = useReducer(flowReducer, initialFlowState);
   // const [imports, userDispatch] = useReducer(userReducer, initialImportConnections);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    //const [error, setError] = useState(null);


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



    // const handleClickAdd = () => {
    //     userDispatch({
    //         type: UserActionType.ADD,
    //         connection: {
    //             nodeID: nanoid(),
    //             name: 'CBS Table Observation',
    //             description: 'beschrijving',
    //             type: 'odata4',
    //             connectorConfiguration: {
    //                 url: ''
    //             }
    //         },
    //     });
    // }

    const AddNode = () => {
        const x:FlowNode = {
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

    // const handleClickDelete = (nodeid: string) => {
    //     userDispatch({
    //         type: UserActionType.DELETE,
    //         nodeID: nodeid
    //         }
    //     );
    // }


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

export default DOEN;