import { makeStyles, tokens } from '@fluentui/react-components';
import { workBenchItem, WorkBenchItemType } from './state'
import MarkDown from '../Tools/MarkDown';
import DataFacilitator from '../Tools/DataFacilitator';
import CBSTool from '../Tools/CBSConnector';

const useStyles = makeStyles({
  root: {
      textAlign: 'left',
      paddingLeft: '20px',
      fontFamily: tokens.fontFamilyBase,
     // fontSize: tokens.fontSizeBase600,
    //  fontWeight: tokens.fontWeightBold,
      lineHeight: tokens.lineHeightBase400,
    //  marginLeft: '20px'
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
  //const { state } = useContext(AppContext);
  const classes = useStyles();
  //const file = require('../Tools/MarkDown/README.md');

  // useEffect(() => {
  //   // This code will be run every time count is changed
  //   console.log(state); // or any other manipulation like HTTP request
  // }, [state]);
  
  function workBenchItemContent({ type }: workBenchItem) {
    switch (type) {
      case WorkBenchItemType.MARKDOWN:
        return <div>md not working</div>;
      case WorkBenchItemType.HTML:
        return <div>some html</div>;
      case WorkBenchItemType.TOOL:
        return <DataFacilitator />;
      case WorkBenchItemType.CBSTOOL:
          return <CBSTool />;
      default:
        return null;
    }
  }

  return <div id='WorkBenchItemPanel' className={workBenchItem.id === activeIndex ? classes.root : classes.hidden}>{workBenchItemContent(workBenchItem)}</div>;
};

export default WorkBenchItemPanel;