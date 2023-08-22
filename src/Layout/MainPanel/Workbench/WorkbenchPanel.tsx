import { makeStyles, mergeClasses, shorthands, tokens } from '@fluentui/react-components';
import React, { Fragment } from 'react';
import PrimarySideBar from './PrimarySidebar/PrimarySideBar';
import Editor from './Editor/Editor'

const useStyles = makeStyles({
    root: {
        display: 'grid',
        height: '100%',
        maxHeight: '100%',
        ...shorthands.overflow('hidden'),
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
    grid: React.FC
};


  

const WorkbenchPanel: React.FC<workbenchPanelProps> = ({ PrimarySideBarOn }) => {
    const classes = useStyles();
    const merged = mergeClasses(classes.root, PrimarySideBarOn ? classes.panel : classes.paneloff)

    return (
        <div id='wbp' className={merged}>
            {PrimarySideBarOn && (
                <Fragment>
                    <PrimarySideBar />
                    <div id='seperator' className={classes.seperator}></div>
                </Fragment>
            )}
            <Editor unknow={undefined}/>
        </div>
    )
}

export default WorkbenchPanel;