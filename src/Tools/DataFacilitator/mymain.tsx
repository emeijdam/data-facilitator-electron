import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { useState } from "react";
import ConnectorPicker from "./ConnectorPicker";

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

const DOEN: React.FC = () => {
    const [dataTables, setDataTables] = useState(initialDataTables)

    return (
        <div>
            <h1>Connectors</h1>
            <Dialog>
                <DialogTrigger disableButtonEnhancement>
                    <Button>Open dialog</Button>
                </DialogTrigger>
                <DialogSurface>
                    <DialogBody>
                        <DialogTitle>Dialog title</DialogTitle>
                        <DialogContent>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
                            exercitationem cumque repellendus eaque est dolor eius expedita
                            nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates
                            in natus iure cumque eaque?
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
                    <li key={dataTable.name}>{dataTable.name} <Button size="small">delete</Button></li>
                ))}
            </ul>
            <ConnectorPicker/>

        </div>
    );
}

export default DOEN;