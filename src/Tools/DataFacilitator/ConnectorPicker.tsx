import { useState } from "react";

const initialConnectors = [
    {
        name: 'Excel',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'ODATA',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
    {
        name: 'CSV',
        description: 'beschrijving',
        type: 'odata4',
        connectorConfiguration: {
            url: ''
        }
    },
]


const ConnectorPicker: React.FC = () => {
    const [connectors, setconnectors] = useState(initialConnectors)

    const listConnectors = connectors.map((connector: any) => 
        <div>{connector.name}</div>
    )

    return (
        <div>
            <h1>Choose a datasource:</h1>
            {listConnectors}
            
        </div>
    );
}

export default ConnectorPicker;