import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, shorthands } from "@fluentui/react-components";
import { useReducer, useState } from "react";
import ConnectorPicker from "./ConnectorPicker";
import Tabulate from "../_datahelpers/Tabulate";

const useStyles = makeStyles({
    dit: {
     
        //height: '100%;',
       // ...shorthands.overflow('scroll'),
      
    },
})

const initialDataTables = [
    {
        name: 'CBS Table Observation',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'CBS Table Metadata',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
]

const stateding = 
    {
       "imports": initialDataTables,
       "exports": initialDataTables 
    }



enum UserActionType {
    ADD = "addImport"
  }

interface Connection {
    name: string,
    description: string,
    type: string
    connectorConfiguration : {url: string}
}

type ImportConnectionsSTATE = Connection[];

const initialImportConnections: ImportConnectionsSTATE = initialDataTables;

type UserAction =
| { type: UserActionType.ADD; connection: Connection }

function userReducer(state: ImportConnectionsSTATE, action: UserAction): ImportConnectionsSTATE {
    switch (action.type) {
      case UserActionType.ADD:
        console.log(state)
        return [...state, action.connection];
      default:
        throw new Error();
    }
  }

const DOEN: React.FC = () => {
   // const [dataTables, setDataTables] = useState(stateding)
    const [imports, userDispatch] = useReducer(userReducer, initialImportConnections);

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


      
    const handleClickAdd = () => {
        userDispatch({
            type: UserActionType.ADD,
            connection: {
                name: 'CBS Table Observation',
                description: 'beschrijving',
                type: 'odata4',
                connectorConfiguration: {
                    url: ''
                }
            },
          });
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
                {imports.map(dataTable => (
                    <li key={dataTable.name}>{dataTable.name} <Button size="small">delete</Button></li>
                ))}
            </ul>
            <Button onClick={handleClickAdd}>Addx</Button>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            <ConnectorPicker/>
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
                {/* {dataTables.map(dataTable => (
                    <li key={dataTable.name}>{dataTable.name} <Button size="small">delete</Button></li>
                ))} */}
                <li key={"spss"}>SPSS OUTPUT.SAV <Button size="small">delete</Button></li>
            </ul>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            <ConnectorPicker/>
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