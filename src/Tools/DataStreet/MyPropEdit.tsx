import { Field, Input, Textarea, Button, tokens, makeResetStyles, makeStyles, shorthands, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { Fragment, useContext, useRef, useState } from "react";
import { TFlowNode, FieldTypes } from "./datastreet.types";
import { TDataStreetGuiActionType } from "./datastreet.gui.actions";
import { DataStreetGuiContext } from "./datastreet.gui.context";
import { FlowContext } from "./datastreet.context";
import { TFlowActionType } from "./datastreet.actions";

const useStackClassName = makeResetStyles({
    display: "flex",
    flexDirection: "column",
    rowGap: tokens.spacingVerticalL,
});

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

export { MyPropertyEditor, MyPropertyEditorProps , MyPropAppDialog};

// interface MyPropertyEditorDialogProps {
//     nodeid: string,
// }

const MyPropAppDialog: React.FC = () => {
    const { dataStreetGuiState, dataStreetGuiActionDispatch } = useContext(DataStreetGuiContext);
    const { flowState, flowActionDispatch } = useContext(FlowContext);
    
    return (
        <Dialog open={dataStreetGuiState.dialogPropEditstate.open} onOpenChange={(event, data) => {  dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.NODEPROPERTYEDITORDIALOG, payload: {open: data.open} });
          }} >
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Edit Node</DialogTitle>
                    <DialogContent>
                    <MyPropertyEditor nodeid={dataStreetGuiState.dialogPropEditstate.nodeid}/>
                    </DialogContent>
                    <DialogActions>
                       <Button appearance="primary" onClick={() => {
                        flowActionDispatch({type: TFlowActionType.UPDATENODE, payload: flowState.nodes.find(node => node.nodeID === dataStreetGuiState.dialogPropEditstate.nodeid)});
                        dataStreetGuiActionDispatch({ type: TDataStreetGuiActionType.NODEPROPERTYEDITORDIALOG, payload: {open: false} })
                       }}>Save</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}


// interface huh {
//     mystring: string,
// }

// const FCTEST: React.FC<huh> = ({mystring}) => {
//     return <div>testing func: {mystring}</div>
// }

const CBSTablePick= () => {
    return (
        <span>pickme</span>
    )
}


interface MyPropertyEditorProps {
    nodeid: string,
}
// const MyPropertyEditor= ({node}: MyPropertyEditorProps): JSX.Element => {
const MyPropertyEditor= ({nodeid}: MyPropertyEditorProps): JSX.Element => {
    const { flowState, flowActionDispatch } = useContext(FlowContext);
    const [node, setNode] = useState(flowState.nodes.find(node => node.nodeID === nodeid));
    const [openCBSTablePicker, setOpenCBSTablePicker] = useState(false);
    const classes = useStyles();
    const myRefname = useRef(null);

    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        console.log(node)
        // nodeState.properties = {...nodeState.properties, url: "test"}
        // setNode(nodeState => ({...nodeState, [name]: value}))
        setNode(nodeState => ({ ...nodeState, [name]: value }))
    }

    const handlePropertiesChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value)
        console.log(node.properties)
        const property = node.properties.find((property) => property.name == name);
        property.value = value;
        //nodeState.properties = {...nodeState.properties, [name]: value}
        console.log(property)
        setNode(nodeState => ({ ...nodeState, properties: nodeState.properties.filter((property) => property.name !== name).concat(property) }))
    }

    const handleFilePicker = async (name: string) => {
        const dialogConfig = {
            //title: 'Select a file',
            //buttonLabel: 'This one will do',
            properties: ['openFile']
        };

        // window.myAPI.doAThing()
        const { canceled, filePaths } = await window.electronD.openDialog('showOpenDialog', dialogConfig)

        if (canceled) return null;
        const property = node.properties.find((property) => property.name == name);
        property.value = filePaths;
        //nodeState.properties = {...nodeState.properties, [name]: value}
        //console.log(property)
        setNode(nodeState => ({ ...nodeState, properties: nodeState.properties.filter((property) => property.name !== name).concat(property) }))

        return filePaths
    }

    const handleCBSTablePicker = async (propertyname: string) => {
        const property = node.properties.find((property) => property.name == propertyname);

        setOpenCBSTablePicker(true)
        property.value = "566789";

         setNode(nodeState => ({ ...nodeState, properties: nodeState.properties.filter((property) => property.name !== propertyname).concat(property) }))
        return property.value
    }

    const properties = node.properties.map((property) => {
        switch (property.field) {
            case FieldTypes.TEXT:
                return <Field key={property.name} label={property.label}>
                    <Input name={property.name} defaultValue={property.value} onChange={handlePropertiesChange} />
                </Field>
            case FieldTypes.TEXTAREA:
                return <Field key={property.name} label={property.label}>
                    <Textarea name={property.name} defaultValue={property.value} onChange={handlePropertiesChange} />
                </Field>
            case FieldTypes.FILEPATH:
                return <Field key={property.name} label={property.label} className={classes.flexy}>
                    <Input ref={myRefname} name={property.name} type='text' defaultValue={property.value ?? ''} value={property.value ?? ''} onChange={handlePropertiesChange} />
                    <Button onClick={async () => {
                        myRefname.current.value = await handleFilePicker(property.name)
                    }}>
                        ...
                    </Button>
                </Field>

            case FieldTypes.EXTERNAL_DIALOG:

                return <Field key={property.name} label={property.label} className={classes.flexy}>
                    ext
                    <Input ref={myRefname} name={property.name} type='text' defaultValue={property.value ?? ''} value={property.value ?? ''} onChange={handlePropertiesChange} />
                    <Button onClick={async () => {
                        myRefname.current.value = await handleCBSTablePicker(property.name)
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
               { !openCBSTablePicker ?
               <Fragment>
                <Field label={node.name}>
                    <Input name="name" defaultValue={node.name} onChange={handleChange} />
                </Field>
                <Field label={node.description}>
                    <Input name="description" defaultValue={node.description} onChange={handleChange} />
                </Field>

                {properties}
                </Fragment>
                : <CBSTablePick/>
               }
            </div>

        </div>
    );
}




