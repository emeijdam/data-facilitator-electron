import { DialogTriggerChildProps, Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger } from "@fluentui/react-components";
import { forwardRef, useContext, useState } from "react";
import { ConnectorPicker } from "./ConnectorPicker";

export { CustomDialogTrigger, ConnectorDialogTrigger }

const CustomDialogTrigger = forwardRef<HTMLButtonElement, DialogTriggerChildProps>((props, ref) => {
    return (
        <Button {...props} ref={ref}>
            Custom Trigger
        </Button>
    );
});

interface ConnectorDialogTriggerProps {
    buttonsize?: "medium" | "small" | "large",
    handleSave: (values: unknown) => void;
    // nodeid: string
}

const ConnectorDialogTrigger: React.FC<ConnectorDialogTriggerProps> = ({ buttonsize = "medium" , handleSave}) => {
    const [openEditor, setOpenEditor] = useState(false);

    return (
        <Dialog open={openEditor} onOpenChange={(event, data) => setOpenEditor(data.open)}>
            <DialogTrigger disableButtonEnhancement>
                {/* <Button size={buttonsize}>Get Data</Button> */}
                <CustomDialogTrigger />
            </DialogTrigger>
            <DialogSurface>
                <DialogBody>
                    <DialogTitle>Get Data</DialogTitle>
                    <DialogContent>
                        <ConnectorPicker handleSave={handleSave}/>
                    </DialogContent>
                    <DialogActions>
                       <Button appearance="primary" onClick={handleSave}>Connect</Button>
                        <DialogTrigger disableButtonEnhancement>
                            <Button appearance="secondary">Cancel</Button>
                        </DialogTrigger>
                    </DialogActions>
                </DialogBody>
            </DialogSurface>
        </Dialog>
    )
}

// const bcConnectorDialogTrigger: React.FC<ConnectorDialogTriggerProps> = ({ buttonsize = "medium", guiDispatch }) => {
//     const { flowActionDispatch } = useContext(FlowContext);
//     const [connector, setConnector] = useState<IConnector>();
//     const [openEditor, setOpenEditor] = useState(false);

//     // const handleConnectorSelectedChange = (connector) => {
//     //     setConnector(connector)
//     // }




//     return (
//         <Dialog open={openEditor} onOpenChange={(event, data) => setOpenEditor(data.open)}>
//             <DialogTrigger disableButtonEnhancement>
//              {/* <Button size={buttonsize}>Get Data</Button> */}
//                 <CustomDialogTrigger/>
//             </DialogTrigger>
//             <DialogSurface>
//                 <DialogBody>
//                     <DialogTitle>Get Data</DialogTitle>
//                     <DialogContent>
//                         <ConnectorPicker handleConnectorSelected={(connector: IConnector) => { setConnector(connector) }} handleConnectorDoubleClick={handleUpdate} selcon={connector} />
//                     </DialogContent>
//                     <DialogActions>
//                         <Button appearance="primary">Connect</Button>
//                         <DialogTrigger disableButtonEnhancement>
//                             <Button appearance="secondary">Cancel</Button>
//                         </DialogTrigger>
//                     </DialogActions>
//                 </DialogBody>
//             </DialogSurface>
//         </Dialog>
//     )
// }