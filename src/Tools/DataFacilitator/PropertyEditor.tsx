import {
    Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, makeStyles, shorthands, Checkbox, Field,
    Combobox, tokens, Title3,
    Input,
    makeResetStyles,
    Option,
    Radio,
    RadioGroup,
    Slider,
    SpinButton,
    Switch,
    Textarea
} from "@fluentui/react-components";
import { TFlowNode, fieldtypes } from "./flowState";
import { useContext, useEffect, useImperativeHandle, useRef, useState } from "react";
import { FlowContext } from "./flowContext";
import { FlowActionType } from "./flowActions";

// declare global {
//     interface Window {
//         electronD?: any;
//     }
//   }
//window.electronAPI.loadPreferences()
//https://stackoverflow.com/questions/66152989/contextbridge-exposeinmainworld-and-ipc-with-typescript-in-electron-app-cannot

const useStyles = makeStyles({
    gridContainer: {
        display: 'inline-grid',
        height: '400px;',
        minHeight: '0px',
        width: '600px',
        minWidth: '0px',
        overflowY: 'scroll',
        gridTemplateColumns: 'auto auto auto auto',
        // backgroundColor: '#2196F3',
        ...shorthands.padding('10px'),
        columnGap: '50px',
        rowGap: '50px',
        ...shorthands.overflow('hidden'),
    },
    root: {
        width: '64px',
        height: '64px',
        ...shorthands.padding('10px'),
        ...shorthands.border('1px', 'solid', 'red'),
        textAlign: 'center',
        backgroundColor: 'green',

    }, props: {
        display: "flex",
        flexDirection: "column",
        rowGap: tokens.spacingVerticalL,
    },
    flexy: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
    }

});

const useStackClassName = makeResetStyles({
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
});


function getNode(nodeid: string, nodes): TFlowNode {
    return nodes.find(node => node.nodeID === nodeid);
}


interface PropertyEditorDialogProps {
    buttonsize?: "medium" | "small" | "large",
    opendialog: boolean,
    nodeid: string,
    setEditor: (values: unknown) => void;
}

export const PropertyEditorDialogTrigger: React.FC<PropertyEditorDialogProps> = ({ buttonsize = "medium", nodeid, opendialog, setEditor }) => {
    const { flowState, flowActionDispatch } = useContext(FlowContext);
    const [nodeState, setNode] = useState(getNode(nodeid, flowState.nodes));
    const [open, setOpen] = useState(opendialog);

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        console.log(nodeState)
        // nodeState.properties = {...nodeState.properties, url: "test"}
        // setNode(nodeState => ({...nodeState, [name]: value}))
        setNode(nodeState => ({ ...nodeState, [name]: value }))
    }

    const handlePropertiesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        console.log(nodeState.properties)
        const property = nodeState.properties.find((property) => property.name == name);
        property.value = value;
        //nodeState.properties = {...nodeState.properties, [name]: value}
        console.log(property)
        setNode(nodeState => ({ ...nodeState, properties: nodeState.properties.filter((property) => property.name !== name).concat(property) }))
    }

    const handleUpdate = () => {
        console.log(nodeState)
        flowActionDispatch({ type: FlowActionType.UPDATENODE, payload: nodeState })
        setOpen(false)
        setEditor("")
    }


    const buttonclick = async (name: string) => {
        const dialogConfig = {
            //title: 'Select a file',
            //buttonLabel: 'This one will do',
            properties: ['openFile']
        };

        // window.myAPI.doAThing()
        const { canceled, filePaths } = await window.electronD.openDialog('showOpenDialog', dialogConfig)

        if (canceled) return null;
        const property = nodeState.properties.find((property) => property.name == name);
        property.value = filePaths;
        //nodeState.properties = {...nodeState.properties, [name]: value}
        //console.log(property)
        setNode(nodeState => ({ ...nodeState, properties: nodeState.properties.filter((property) => property.name !== name).concat(property) }))

        return filePaths
    }

    return (
        <Dialog open={open} onOpenChange={(event, data) => setOpen(data.open)}>
            <DialogTrigger disableButtonEnhancement>
                <Button size={buttonsize}>edit</Button>
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>{nodeState.name}</DialogTitle>
                    <DialogContent>
                        <PropertyEditor node={nodeState} handleChange={handleChange} handlePropertiesChange={handlePropertiesChange} buttonclick={buttonclick} />
                    </DialogContent>
                    <DialogActions>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                        <Button appearance="primary" onClick={handleUpdate}>Save</Button>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

interface PropertyEditorProps {
    buttonsize?: "medium" | "small" | "large",
    node: TFlowNode,
    handleChange: (values: unknown) => void,
    handlePropertiesChange: (values: unknown) => void,
    buttonclick: (values: unknown) => void,
}

const PropertyEditor: React.FC<PropertyEditorProps> = ({ node, handleChange, handlePropertiesChange, buttonclick }) => {
    const classes = useStyles();
    const myRefname = useRef(null);

    function triggerEvent(element, eventName) {
        //   const event = document.createEvent("HTMLEvents");
        const event = new Event(eventName);
        myRefname.current.value = "hallo"
        element.dispatchEvent(event);
    }


    const properties = node.properties.map((property) => {
        switch (property.field) {
            case fieldtypes.TEXT:
                return <Field key={property.name} label={property.label}>
                    <Input name={property.name} defaultValue={property.value} onChange={handlePropertiesChange} />
                </Field>
            case fieldtypes.TEXTAREA:
                return <Field key={property.name} label={property.label}>
                    <Textarea name={property.name} defaultValue={property.value} onChange={handlePropertiesChange} />
                </Field>
            case fieldtypes.FILEPATH:

                return <Field key={property.name} label={property.label} className={classes.flexy}>
                    <Input ref={myRefname} name={property.name} type='text' defaultValue={property.value ?? ''} value={property.value ?? ''} onChange={handlePropertiesChange} />
                    <Button onClick={async () => {


                        myRefname.current.value = await buttonclick(property.name)
                        // console.log(myRefname.current.value)
                        // triggerEvent(myRefname.current, "change");
                    }}>
                        ...
                    </Button>
                </Field>
            default:
                return null;
        }

    }

    )

    return (
        <div id='huh' className={classes.gridContainer}>
            <div className={useStackClassName()}>
                {/* <label>Node name: <input type="text" name="name" defaultValue={node.name} onChange={handleChange} /></label> */}
                <Field label={node.name}>
                    <Input name="name" defaultValue={node.name} onChange={handleChange} />
                </Field>
                {/* <label>Node name: <input type="text" name="description" defaultValue={node.description} onChange={handleChange} /></label> */}
                <Field label={node.description}>
                    <Input name="description" defaultValue={node.description} onChange={handleChange} />
                </Field>
                {properties}
            </div>

        </div>
    );
}

export default PropertyEditor;

