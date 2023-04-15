import { makeStyles, tokens} from '@fluentui/react-components';

const useStyles = makeStyles({
    root: { 
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase200,
        lineHeight: tokens.lineHeightBase200,
        height: '100%',
        color: tokens.colorNeutralBackground1, 
        backgroundColor: tokens.colorBrandBackground, 
        textAlign: 'left',
        verticalAlign: 'middle',
        // paddingTop: '3px',
        paddingLeft: '20px',
        paddingBottom: '0px',
        marginBottom: '0px;',
        marginTop: '0px',
        paddingTop: '3px',
    }
  });

type StatusBarProps = {
   // children?: React.ReactNode,
    onClick: (params: any) => any,
    message: string
};

const StatusBar: React.FC<StatusBarProps>  = ({message, onClick})  => {
    const classes = useStyles();

    return (<div className={classes.root} onClick={onClick}>{message}</div>
    )
}
export default StatusBar;