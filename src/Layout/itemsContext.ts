import { createContext } from 'react';
import { workBenchItem } from './state'
import { Dispatch } from "react";

type Action = { type: 'addDoc' } | { type: 'deleteDoc' }

type ItemsContextType = [
    workBenchItem[],
    Dispatch<React.SetStateAction<workBenchItem[]>>
]

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const MyItemsContext = createContext<ItemsContextType>([[], () => { }]);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const DisptachContext = createContext<Dispatch<Action>>(() => {});