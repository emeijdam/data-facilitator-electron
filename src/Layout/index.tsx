import './layout.css';
import SideToolBarPanel from './MainPanel/SideToolBarPanel'
import WorkbenchPanel from './MainPanel/Workbench/WorkbenchPanel';
import StatusBar from './MainPanel/StatusBar';
import { useState, useReducer, useEffect } from 'react';
import { ToolbarProps } from "@fluentui/react-components";
import { initialAppState} from './state'
import { ActionType} from './actions'
import { appReducer } from './reducer';
import { AppContext } from './context';

const AppLayoutGrid: React.FC = () => {
  const [state, dispatch] = useReducer(appReducer, initialAppState);
  const [checkedValues, setCheckedValues] = useState<Record<string, string[]>>({ textOptions: ["doc"], });

  const onChange: ToolbarProps["onCheckedValueChange"] = (e, { name, checkedItems }) => {
    dispatch({ type: ActionType.SetStatusBarMessage, payload: 'View changed: ' + checkedItems[0] })
    console.log(checkedItems)
    setCheckedValues((s) => {
      return s ? { ...s, [name]: checkedItems } : { [name]: checkedItems };
    });
  };

 

  useEffect(() => {
    //if (state.activeWorkBenchIndex === '') {state.activeWorkBenchIndex = state.workbenchItems.length !== 0 ? state.workbenchItems[state.workbenchItems.length -1].id : ''}
    dispatch({ type: ActionType.SetStatusBarMessage, payload: 'Welcome!' })
  }, [])
  
  return (
    <div id='grid-container-1' className='grid-container'>
      <GridItem name='menu'>
        <SideToolBarPanel xonChange={onChange} checkedValues={checkedValues} />
      </GridItem>
      <GridItem name='main'>
        <AppContext.Provider value={{state, dispatch}}>
          <WorkbenchPanel PrimarySideBarOn grid={undefined}/>
        </AppContext.Provider>
      </GridItem>
      <GridItem name='statusBar'>
        <StatusBar onClick={() => dispatch({ type: ActionType.SetStatusBarMessage, payload: 'hallo' })} message={state.userstatusBarMessagename}></StatusBar>
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