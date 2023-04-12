import { Theme } from "@fluentui/react-components";
import {  webLightTheme } from '@fluentui/react-components';

// An interface for our state
export interface ThemeState {
    theme: Theme;
}

export const initialThemeState: ThemeState = {
    theme: webLightTheme,
};