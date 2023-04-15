import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, shorthands } from "@fluentui/react-components";
import { useState } from "react";
import ConnectorPicker from "./ConnectorPicker";
import { nanoid } from 'nanoid';

const useStyles = makeStyles({
    dit: {
    },
})

const initialDataTables = [
    {
        id: nanoid(),
        name: 'CBS Table Observation',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        id: nanoid(),
        name: 'CBS Table Metadata',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
]

const DOEN: React.FC = () => {
    const [dataTables, setDataTables] = useState(initialDataTables)
    const classes = useStyles();

    const addConnection= (iets:any ) => {
        setDataTables([...dataTables, {
            id: nanoid(),
            name: iets.name, 
            description: 'beschrijving ed', 
            type: 'odata4',
            connectorConfiguration: {
                url: ''
        }}])
    }

    const deleteConn = (deleteMe: any) => {
        const newList = dataTables.filter((item) => item.id !== deleteMe.id);
        setDataTables(newList);
    }

    return (
        <div id='doen' className={classes.dit}>
            <h1>Connectors</h1>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Add data</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                        <ConnectorPicker addConnection={addConnection}/>
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
            <ul>
                {dataTables.map(dataTable => (
                    <li key={dataTable.id}>{dataTable.name} <Button size="small" onClick={() => deleteConn(dataTable)}>delete</Button></li>
                ))}
            </ul>
        </div>
    );
}

export default DOEN;