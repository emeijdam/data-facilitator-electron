import { webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { ThemeActions, ActionType} from "./themeActions";
import { ThemeState } from "./ThemeState";

export function themeReducer(state: ThemeState, action: ThemeActions) {
    switch (action.type) {
      case ActionType.SetTheme:
        return { ...state, theme: action.payload };
      case ActionType.ToggleTheme:
          return { ...state, theme: state.theme === webDarkTheme ? webLightTheme :  webDarkTheme};
      default:
        return state;
    }
  }