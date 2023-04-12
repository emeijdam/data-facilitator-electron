import { makeStyles, tokens} from '@fluentui/react-components';

const useStyles = makeStyles({
    root: { 
        fontFamily: tokens.fontFamilyBase,
        fontSize: tokens.fontSizeBase200,
        height: '100%',
        color: tokens.colorNeutralBackground1, 
        backgroundColor: tokens.colorBrandBackground, 
        textAlign: 'left',
        paddingTop: '3px',
        paddingLeft: '3px'
    }
  });

type StatusBarProps = {
    children?: React.ReactNode,
    onClick: (params: any) => any,
};

const StatusBar: React.FC<StatusBarProps>  = ({children, onClick})  => {
    const classes = useStyles();

    return (<div className={classes.root} onClick={onClick}>
                {children}
            </div>
    )
}
export default StatusBar;