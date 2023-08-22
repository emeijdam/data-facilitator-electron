import { makeStyles, tokens, Button } from '@fluentui/react-components';
import PanelToolbarPrimarySideBar from './PanelToolbarPrimarySideBar'
import { Tree, TreeItem, TreeItemLayout } from "@fluentui/react-components/unstable";
import { useContext } from "react";
import { AppContext } from '../../../context';
import { ActionType } from '../../../actions';
import { WorkBenchItemType } from '../../../state';

const primarySideBarStyles = makeStyles({
  root: {
    display: 'grid',
    gridTemplateRows: '32px 1fr',
    height: '100%',
    '> .fui-Toolbar': {
      justifyContent: "space-between",
      marginTop: '0px',
      paddingBottom: '0px',
      paddingTop: '0px',
      columnGap: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      backgroundColor: tokens.colorNeutralBackground1,
    }
  },
  doctitle: {
    marginTop: '0px',
    paddingTop: '0px',
    paddingBottom: '0px',
    fontFamily: tokens.fontFamilyBase,
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    paddingLeft: '0px',
    paddingRight: '0px',
    backgroundColor: tokens.colorNeutralBackground1,
  }
})

// eslint-disable-next-line @typescript-eslint/ban-types
type primarySideBarProps = {
};

const PrimarySideBar: React.FC<primarySideBarProps> = () => {
  const classes = primarySideBarStyles();

  return (
    <div id='primarySideBar' className={classes.root}>
      <PanelToolbarPrimarySideBar />
      <div className={classes.doctitle}>
        <DefaultTreeItemLayout />
      </div>
    </div>
  )
}

export default PrimarySideBar;

const treeItemStyles = makeStyles({
  isaan: {
    color: tokens.colorNeutralForeground2Hover,
    backgroundColor: tokens.colorSubtleBackgroundHover,
  },
  isuit: {

  }
})

// eslint-disable-next-line @typescript-eslint/ban-types
type treeProps = {
};

const DefaultTreeItemLayout: React.FC<treeProps> = () => {
  const { state, dispatch } = useContext(AppContext);
  const classes = treeItemStyles();

  const listItems2 = state.workbenchItems.map((workBenchItem: any) =>
    <TreeItem key={workBenchItem.id} onClick={() => dispatch({ type: ActionType.SetActiveWorkbenchItem, payload: workBenchItem.id })} className={state.activeWorkBenchIndex === workBenchItem.id ? classes.isaan : classes.isuit}>
      <TreeItemLayout>{workBenchItem.title}</TreeItemLayout>
    </TreeItem>
  );

  return (
    <Tree aria-label="Tree" defaultOpenItems={['default-subtree-1']}>
      <TreeItem id="default-subtree-1">
        <TreeItemLayout>Tools</TreeItemLayout>
        <Tree>
          {listItems2}
          <TreeItem>
            <Button onClick={() => dispatch({ type: ActionType.AddWorkbenchTool, payload: { id: '', 'type': WorkBenchItemType.HTML, 'title': 'DEEP' } })}>New Tool Doc</Button>
          </TreeItem>
        </Tree>
      </TreeItem>
    </Tree>
  );
};