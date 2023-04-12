import { Theme } from "@fluentui/react-components";

export enum ActionType {
    SetTheme,
    ToggleTheme
}

type SetTheme = { type: ActionType.SetTheme; payload: Theme };
type ToggleTheme = { type: ActionType.ToggleTheme; };

export type ThemeActions = SetTheme | ToggleTheme;