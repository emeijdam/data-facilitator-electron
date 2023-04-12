import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { ToolbarRadioGroup, ToolbarRadioButton} from "@fluentui/react-components";
import { Document32Regular, AlignCenterHorizontal24Regular, AlignRight24Regular} from "@fluentui/react-icons";


const useSideToolBarStyles = makeStyles({
    toolBarClass: {
      height: '100%',
      justifyContent: "space-between",
      backgroundColor: tokens.colorNeutralBackgroundStatic,
    },
    iconClass: {
      ':hover': {
        color: 'white'
      },
      color: 'grey' // g
    },
    toolBarButtonClass: {
      backgroundColor: 'Transparent',
      ...shorthands.border('none'),
      ...shorthands.borderStyle('none'),
      '[aria-checked="true"]': {
        color: 'white',
        ...shorthands.borderLeft('1px', 'solid', 'white'),
        ...shorthands.borderRadius('0px')
      },
      color: 'grey',
      ':hover': {
        backgroundColor: 'Transparent',
        color: 'white',
      }
    },
    radioGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
  });

type mainToolbarRadioGroupProps = {
   // handleClickView: (params: any) => any,
  };

const SideToolbarRadioGroup: React.FC<mainToolbarRadioGroupProps>  = () => {
    const classes = useSideToolBarStyles();
return (
  <ToolbarRadioGroup className={classes.radioGroup}>
    
  <ToolbarRadioButton
    aria-label="Align left"
    name="textOptions"
    value="doc"
    className={classes.toolBarButtonClass}
    icon={<Document32Regular />}
  />
  <ToolbarRadioButton
    aria-label="Align Center"
    name="textOptions"
    value="center"
    className={classes.toolBarButtonClass}
    icon={<AlignCenterHorizontal24Regular />}
  />

  <ToolbarRadioButton
    aria-label="Align Right"
    name="textOptions"
    value="right"
    className={classes.toolBarButtonClass}
    icon={<AlignRight24Regular />}
  />
 
</ToolbarRadioGroup>
)
}

export default SideToolbarRadioGroup;