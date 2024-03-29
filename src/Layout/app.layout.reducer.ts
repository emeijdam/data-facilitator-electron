import { AppActions, ActionType } from "./app.layout.actions";
import { AppState } from "./app.layout.state";
import { nanoid } from 'nanoid';

export function appReducer(state: AppState, action: AppActions) {
  switch (action.type) {
    case ActionType.SetStatusBarMessage:
      return { ...state, userstatusBarMessagename: action.payload };
    case ActionType.SetActiveWorkbenchItem:
      return { ...state, activeWorkBenchIndex: action.payload };
    case ActionType.AddWorkbenchTool:
      action.payload.id = nanoid()
      return { ...state, workbenchItems: state.workbenchItems.concat(action.payload) };
    case ActionType.RemoveWorkbenchTool:
      // eslint-disable-next-line no-case-declarations
      const newWorkbenchItems = state.workbenchItems.filter((item) => item.id !== action.payload)
      console.log(newWorkbenchItems.length)
      return {
        ...state,
        activeWorkBenchIndex: newWorkbenchItems.length !== 0 ? newWorkbenchItems[0].id : '',
        workbenchItems: newWorkbenchItems,
      };
    default:
      return state;
  }
}