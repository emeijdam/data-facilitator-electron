import './layout.css';
import SideToolBarPanel from './MainPanel/SideToolBarPanel'
import WorkbenchPanel from './MainPanel/Workbench/WorkbenchPanel';
import StatusBar from './MainPanel/StatusBar';
import { useState, useReducer } from 'react';
import { ToolbarProps } from "@fluentui/react-components";
import { initialAppState} from './state'
import { ActionType} from './actions'
import { appReducer } from './reducer';
import { AppContext } from './context';

type GridProps = {
};

const AppLayoutGrid: React.FC<GridProps> = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({ textOptions: ["doc"], });

  const onChange: ToolbarProps["onCheckedValueChange"] = (e, { name, checkedItems }) => {
    dispatch({ type: ActionType.SetStatusBarMessage, payload: 'View changed: ' + checkedItems[0] })
    console.log(checkedItems)
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

  if (state.activeWorkBenchIndex === '') {state.activeWorkBenchIndex = state.workbenchItems.length !== 0 ? state.workbenchItems[0].id : ''}

  return (
    <div id='grid-container-1' className='grid-container'>
      <GridItem name='menu'>
        <SideToolBarPanel xonChange={onChange} checkedValues={checkedValues} />
      </GridItem>
      <GridItem name='main'>
        <AppContext.Provider value={{state, dispatch}}>
          <WorkbenchPanel PrimarySideBarOn/>
        </AppContext.Provider>
      </GridItem>
      <GridItem name='statusBar'>
        <StatusBar onClick={() => dispatch({ type: ActionType.SetStatusBarMessage, payload: 'hallo' })}>{state.userstatusBarMessagename}</StatusBar>
      </GridItem>
    </div>
  );
};
export { AppLayoutGrid };

type gridItemProps = {
  name: string,
  children: React.ReactNode,
};

const GridItem: React.FC<gridItemProps> = ({ name, children }) => <div id={name} className="grid-item">{children}</div>;