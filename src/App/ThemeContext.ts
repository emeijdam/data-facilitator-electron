import React from "react";
import { ThemeState, initialThemeState } from "./ThemeState";
import { ThemeActions } from "./themeActions";

export const ThemeContext = React.createContext<{state: ThemeState;dispatch: React.Dispatch<ThemeActions>;}>({state: initialThemeState, dispatch: () => undefined,});