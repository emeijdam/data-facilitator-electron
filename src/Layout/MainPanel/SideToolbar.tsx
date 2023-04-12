import { makeStyles, tokens } from '@fluentui/react-components';
import { Toolbar, ToolbarProps } from "@fluentui/react-components";

const useSideToolBarStyles = makeStyles({
  toolBarClass: {
    height: '100%',
    justifyContent: "space-between",
    backgroundColor: tokens.colorNeutralBackgroundStatic,
    width: '50px',
    paddingLeft: '0px',
    paddingRight: '0px'
  },
});

type sideToolBarProps = {
  children?: React.ReactNode,
  xonChange: ToolbarProps["onCheckedValueChange"],
  checkedValues: any,
};

const SideToolBar: React.FC<sideToolBarProps>  = ({children, xonChange, checkedValues}) => {
  const classes = useSideToolBarStyles();

  return (

    <Toolbar
      vertical
      size="large"
      aria-label="with controlled Radio Button"
      className={classes.toolBarClass}
      checkedValues={checkedValues}
      onCheckedValueChange={xonChange}
    >
      {children}

    </Toolbar>
  );
};

export default SideToolBar;