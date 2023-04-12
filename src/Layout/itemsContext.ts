import { createContext } from 'react';
import { workBenchItem } from './state'
import { Dispatch } from "react";

type Action = { type: 'addDoc' } | { type: 'deleteDoc' }

type ItemsContextType = [
    workBenchItem[],
    Dispatch<React.SetStateAction<workBenchItem[]>>
]

export const MyItemsContext = createContext<ItemsContextType>([[], () => { }]);

export const DisptachContext = createContext<Dispatch<Action>>(() => {});