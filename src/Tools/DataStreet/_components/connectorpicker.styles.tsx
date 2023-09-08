import { makeStyles, shorthands } from "@fluentui/react-components";

export {useStyles}

const useStyles = makeStyles({
    flexy: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
    },
    flexysel: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
        backgroundColor: '#2196F3',
    },
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
    }
});