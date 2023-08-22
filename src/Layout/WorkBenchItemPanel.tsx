import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { workBenchItem, WorkBenchItemType } from './state'
import MarkDown from '../Tools/MarkDown';
import DataFacilitator from '../Tools/DataFacilitator';
import CBSTool from '../Tools/CBSConnector';
import TheAnalist from '../Tools/TheAnalist';
import DOEN from '../Tools/DataFacilitator/mymain';




const useStyles = makeStyles({
  root: {
      textAlign: 'left',
      paddingLeft: '20px',
      fontFamily: tokens.fontFamilyBase,
     // fontSize: tokens.fontSizeBase600,
    //  fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase400,
    //  marginLeft: '20px'
      height: '100%',
      maxHeight: '100%',
     // overflowY: 'scroll'
      ...shorthands.overflow('scroll'),
  },
  hidden: {
    display: 'none',
  }
});

interface WorkBenchItemPanelProps {
  workBenchItem: workBenchItem,
  activeIndex: string,
}

const WorkBenchItemPanel = ({ workBenchItem, activeIndex }: WorkBenchItemPanelProps) => {
  const classes = useStyles();
  
  function workBenchItemContent({ type }: workBenchItem) {
    switch (type) {
      case WorkBenchItemType.MARKDOWN:
        return <MarkDown file={require('../Tools/MarkDown/README.md')}/>
        //return <div>md not working</div>;
      case WorkBenchItemType.HTML:
        return <div>some html</div>;
      case WorkBenchItemType.TOOL:
        return <DOEN/>
        //return <DataFacilitator />;
      case WorkBenchItemType.CBSTOOL:
          return <CBSTool />;
      case WorkBenchItemType.THEANALIST:
            return <TheAnalist />;
      default:
        return null;
    }
  }

  return <div id='WorkBenchItemPanel' className={workBenchItem.id === activeIndex ? classes.root : classes.hidden}>{workBenchItemContent(workBenchItem)}</div>;
};

export default WorkBenchItemPanel;