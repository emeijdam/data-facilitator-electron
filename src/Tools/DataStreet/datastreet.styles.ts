import { makeStyles } from "@fluentui/react-components";

export {useStyles}

const useStyles = makeStyles({
    dit: {
        height: '100%;',
        // ...shorthands.overflow('scroll'),
    },
    flexy: {
        display: "flex",
        alignItems: "center",
        columnGap: "4px",
    },
  editor:{
    height: '100%',
    width: '100%',
    boxSizing: 'border-box'
  }

})