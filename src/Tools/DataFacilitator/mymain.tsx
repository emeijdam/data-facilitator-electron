import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Link, makeStyles, shorthands } from "@fluentui/react-components";
import { useState } from "react";
import ConnectorPicker from "./ConnectorPicker";
import { nanoid } from 'nanoid';
import { Parser } from '@json2csv/plainjs';
import DownloadLink from "react-download-link";

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
            url: 'https://odata4.cbs.nl/CBS/37422ned/Observations'
        }
    },
    {
        id: nanoid(),
        name: 'CBS Table Dimensions',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: 'https://odata4.cbs.nl/CBS/37422ned/Dimensions'
        }
    },
    {
        id: nanoid(),
        name: 'CBS Table MeasureCodes',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: 'https://odata4.cbs.nl/CBS/37422ned/MeasureCodes'
        }
    },
    {
        id: nanoid(),
        name: 'CBS Table Dimensions',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: 'https://odata4.cbs.nl/CBS/37422ned/Dimensions'
        }
    },
]

const DOEN: React.FC = () => {
    const [dataTables, setDataTables] = useState(initialDataTables)
    const [csvTable, setCsvTable] = useState('')
    const classes = useStyles();

    const addConnection = (iets: any) => {
        setDataTables([...dataTables, {
            id: nanoid(),
            name: iets.name,
            description: 'beschrijving ed',
            type: 'odata4',
            connectorConfiguration: {
                url: ''
            }
        }])
    }

    const deleteConn = (deleteMe: any) => {
        const newList = dataTables.filter((item) => item.id !== deleteMe.id);
        setDataTables(newList);
    }

    const fetchDataTable = () => {

        const table = dataTables[2];
        fetch(`${table.connectorConfiguration.url}`)
            .then(response => response.json())
            .then((usefulData) => {
                console.log(usefulData.value);
                try {
                    const opts = {
                        delimiter: ';',
                        // transforms: [
                        //     (item) => (
                        //         {...item,
                        //             Description.replace(/\n|\r/g, "<br/>")})
                        //   ]
                };
                    const parser = new Parser(opts);
                    //const csv = parser.parse(usefulData.value)
                    //console.log(csv);
                   const x = usefulData.value.map() // .replace(/\n|\r/g, ""
                    usefulData.value.forEach((item) => {
                        item.Description = item.Description.replace(/\n|\r/g, "<br/>")
                    })
                    const csv = parser.parse(usefulData.value)
                    setCsvTable(csv)
                  } catch (err) {
                    console.error(err);
                  }
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    };

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
                            <ConnectorPicker addConnection={addConnection} />
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
                    <li key={dataTable.id}>
                        <Link href={dataTable.connectorConfiguration.url} target='_blank'>{dataTable.name}</Link>
                        <Button size="small" onClick={() => deleteConn(dataTable)}>delete</Button>
                    </li>
                ))}
            </ul>
            <Button size="small" onClick={fetchDataTable}>fetch</Button>

            <DownloadLink
	label="Save"
	filename="myfile.csv"
	exportFile={() => csvTable}
/>

        </div>
    );
}

export default DOEN;