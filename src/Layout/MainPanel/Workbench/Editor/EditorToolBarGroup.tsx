
import { makeStyles, tokens, ToolbarButton,ToolbarGroup, shorthands, Toolbar} from "@fluentui/react-components";
import React, { useContext } from 'react';
import { MoreHorizontal24Filled,} from "@fluentui/react-icons";
import { DataTrending16Filled, Autosum16Filled, Dismiss16Regular} from "@fluentui/react-icons";
import { AppContext } from "../../../context";
import { ActionType } from "../../../actions";

const useStyles = makeStyles({
  toolbar: {
    justifyContent: "space-between",
    marginTop: '0px',
    paddingBottom: '0px',
    paddingTop: '0px',
    columnGap: '0px',
    paddingLeft: '0px',
    paddingRight: '0px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  default: {
    backgroundColor: tokens.colorNeutralBackground6,
    paddingLeft: '0px',
    marginLeft: '0px',
    paddingRight: '0px',
    ...shorthands.borderRadius('0px'),
    ...shorthands.borderRight('2px', 'solid', 'transparent'),
  },
  active: {
    backgroundColor: tokens.colorNeutralBackground2,
    paddingLeft: '0px',
    marginLeft: '0px',
    paddingRight: '0px',
    ...shorthands.borderRadius('0px'),
    ...shorthands.borderRight('2px', 'solid', 'transparent'),
  },
  tg: {
    columnGap: '0px'
  }
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {
  // workBenchItems: workBenchItems,
  // SetActiveWorkbenchItem: (params: any) => any,
  // activeIndex: string
}

const EditorToolBarGroup: React.FC<Props> = () => {
  const classes = useStyles();
  const { state, dispatch } = useContext(AppContext);
  
  const handleClick = (e: any, id: string) => {
    e.stopPropagation();
    dispatch({type: ActionType.RemoveWorkbenchTool, payload: id})
  }


  const listItems = state.workbenchItems.map(workBenchItem =>
    <ToolbarButton icon={<DataTrending16Filled />} key={workBenchItem.id} onClick={() =>  dispatch({ type: ActionType.SetActiveWorkbenchItem, payload: workBenchItem.id })} className={workBenchItem.id === state.activeWorkBenchIndex ? classes.active : classes.default}>
      {workBenchItem.title}<Dismiss16Regular onClick={(e) => { e.stopPropagation(); dispatch({type: ActionType.RemoveWorkbenchTool, payload: workBenchItem.id})}}/>
    </ToolbarButton>
  );

  return (
    <Toolbar aria-label="Default" size="small" className={classes.toolbar}>
      <ToolbarGroup role="presentation" className={classes.tg}>
        {listItems}
      </ToolbarGroup>
      <ToolbarGroup role="presentation" className={classes.tg}>
        <ToolbarButton aria-label="More" icon={<MoreHorizontal24Filled />} />
      </ToolbarGroup>
    </Toolbar>
  )
};

export default EditorToolBarGroup;