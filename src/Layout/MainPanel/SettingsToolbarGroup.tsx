import { makeStyles, teamsLightTheme } from '@fluentui/react-components';
import { ToolbarGroup, ToolbarButton } from "@fluentui/react-components";
import { Settings32Regular, WeatherSunny32Regular } from "@fluentui/react-icons";
import { ActionType } from '../../App/themeActions';
import { useContext } from 'react';
import { ThemeContext } from '../../App/ThemeContext';


const useSideToolBarStyles = makeStyles({
  iconClass: {
    ':hover': {
      color: 'white'
    },
    color: 'grey', // g
  },
  toolBarButtonClass: {
    backgroundColor: 'Transparent',
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

type settingsToolbarGroupProps = {
 // onClick: (params: any) => any,
};


const SettingsToolbarGroup: React.FC<settingsToolbarGroupProps> = () => {
  const classes = useSideToolBarStyles();
  const { dispatch } = useContext(ThemeContext);

  return (
    <ToolbarGroup role="presentation" className={classes.radioGroup}>
      <ToolbarButton
        aria-label="Reset Font Size"
        className={classes.toolBarButtonClass}
        onClick={() => dispatch({type: ActionType.ToggleTheme})}
        icon={<WeatherSunny32Regular className={classes.iconClass} />}
      />

      <ToolbarButton
        aria-label="Reset Font Size"
        className={classes.toolBarButtonClass}
        onClick={() => dispatch({type: ActionType.SetTheme, payload: teamsLightTheme})}
        icon={<Settings32Regular />}
      />

    </ToolbarGroup>
  )
}

export default SettingsToolbarGroup