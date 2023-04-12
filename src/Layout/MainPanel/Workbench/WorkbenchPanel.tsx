import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import React, { Fragment } from 'react';
import PrimarySideBar from './PrimarySidebar/PrimarySideBar';
import Editor from './Editor/Editor'

const useStyles = makeStyles({
    root: {
        display: 'grid',
        height: '100%',
    },
    panel: {
        gridTemplateColumns: '200px 1px 1fr',
    },
    paneloff: {
        gridTemplateColumns: '1fr',
    },
    seperator: {
        backgroundColor: tokens.colorNeutralBackground1,
        ': Hover': {
            backgroundColor: tokens.colorBrandForegroundInverted,
            width: '3px'
        }
    }
});

type workbenchPanelProps = {
    PrimarySideBarOn?: boolean,
};


const WorkbenchPanel: React.FC<workbenchPanelProps> = ({ PrimarySideBarOn }) => {
    const classes = useStyles();
    const merged = mergeClasses(classes.root, PrimarySideBarOn ? classes.panel : classes.paneloff)

    return (
        <div className={merged}>
            {PrimarySideBarOn && (
                <Fragment>
                    <PrimarySideBar/>
                    <div id='seperator' className={classes.seperator}></div>
                </Fragment>
            )}
            <Editor/>
        </div>
    )
}

export default WorkbenchPanel;