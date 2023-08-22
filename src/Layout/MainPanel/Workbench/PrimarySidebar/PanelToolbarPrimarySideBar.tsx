import { Toolbar, ToolbarProps, } from "@fluentui/react-components";
import * as React from "react";
import PrimarySideBarToolBarGroup from './PrimarySideBarToolBarGroup'

type panelToolbarPrimarySideBarProps = ToolbarProps 
//& {

//};

const PanelToolbarPrimarySideBar: React.FC<panelToolbarPrimarySideBarProps> = () => {
  return (
    <Toolbar aria-label="Default" size="small">
      <PrimarySideBarToolBarGroup title='Explorer'></PrimarySideBarToolBarGroup>
    </Toolbar>
  )
};
export default PanelToolbarPrimarySideBar;