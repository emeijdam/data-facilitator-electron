import { Field, Input, Textarea, Button, tokens, makeResetStyles, makeStyles, shorthands } from "@fluentui/react-components";
import { useRef, useState } from "react";
import { TFlowNode, FieldTypes } from "./datastreet.types";

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


export { MyPropertyEditor, MyPropertyEditorProps , FCTEST, huh};

interface huh {
    mystring: string,
}

const FCTEST: React.FC<huh> = ({mystring}) => {
    return <div>testing func: {mystring}</div>
}


interface MyPropertyEditorProps {
    node: TFlowNode,
}
// const MyPropertyEditor= ({node}: MyPropertyEditorProps): JSX.Element => {
const MyPropertyEditor= ({node}: MyPropertyEditorProps): JSX.Element => {
    const [nodeState, setNode] = useState(node);
    const [openCBSTablePicker, setOpenCBSTablePicker] = useState(false);
    const classes = useStyles();
    const myRefname = useRef(null);

    

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

    const handleFilePicker = async (name: string) => {
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

    const handleCBSTablePicker = async (name: string) => {
        setOpenCBSTablePicker(true)

        return "566789"
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

