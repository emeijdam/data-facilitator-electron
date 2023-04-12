import { makeStyles, tokens } from '@fluentui/react-components';

const useStyles = makeStyles({
    root: { 
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase400,
        height: '100%',
        color: tokens.colorNeutralForeground1, 
        backgroundColor: tokens.colorNeutralBackground3, 
        textAlign: 'left',
        paddingTop: '3px',
        paddingLeft: '15px'
    }
  });

type mainPanelProps = {
    children?: React.ReactNode
};

const MainPanel: React.FC<mainPanelProps>  = ({children})  => {
    const classes = useStyles();

    return (<div id='helpme' className={classes.root}>
                {children}
            </div>
    )
}
export default MainPanel;