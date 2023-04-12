import React, { useReducer }from 'react';
import './App.css';
import { AppLayoutGrid } from '../Layout'
import { FluentProvider } from '@fluentui/react-components';
import { ThemeContext } from './ThemeContext';
import { themeReducer } from './ThemeReducer';
import { initialThemeState } from './ThemeState';
import { ActionType } from './themeActions';

function App() {
  const [state, dispatch] = useReducer(themeReducer, initialThemeState);

    function mode() {
      dispatch({type: ActionType.ToggleTheme})
    }
      
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{state, dispatch}}>
      <FluentProvider theme={state.theme}>
        <div className="App">
            <AppLayoutGrid/>
        </div>
      </FluentProvider>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
}

export default App;