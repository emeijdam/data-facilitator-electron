import { makeStyles } from '@fluentui/react-components';
import { ToolbarProps } from "@fluentui/react-components";
import SettingsToolbarGroup from './SettingsToolbarGroup';
import SideToolbarRadioGroup from './SideToolbarRadioGroup';
import SideToolBar from './SideToolbar';

const useSideToolBarPanelStyles = makeStyles({
    root: { 
      height: '100%'
    }
  });

type SideToolBarProps = {
   // children?: React.ReactNode,
    xonChange: ToolbarProps["onCheckedValueChange"],
    checkedValues: any,
  //  handleClickView: (params: any) => any,
   // onClick: (params: any) => any,
};

const SideToolBarPanel:React.FC<SideToolBarProps> = ({ xonChange, checkedValues })  => {
   const classes = useSideToolBarPanelStyles();
    return (<div id='SideToolBarPanel' className={classes.root}>
                 <SideToolBar xonChange={xonChange} checkedValues={checkedValues}>
                  <SideToolbarRadioGroup/>
                  <SettingsToolbarGroup/>
                </SideToolBar>
            </div>
    )
}
export default SideToolBarPanel;