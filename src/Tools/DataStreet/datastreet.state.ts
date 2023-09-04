//import { initFlowState } from "./name.types";
import {TFlowNode} from './datastreet.types'

export type initFlowState = {
    nodes: TFlowNode[],
  }

export const initialFlowState:initFlowState = 
    {
    nodes: [
        // {
        //     nodeID: nanoid(),
        //     nodeClass: nodeClass.SOURCENODE,
        //     name: 'CBS Table Observation',
        //     description: 'beschrijving',
        //     type: 'odata4',
        //     properties: [
        //         url
        //     ]
        // },
        // {
        //     nodeID: nanoid(),
        //     nodeClass: nodeClass.EXPORTNODE,
        //     name: 'SPSS Save',
        //     description: 'beschrijving',
        //     type: 'SPSS',
        //     properties: [
        //         filename
        //     ]
        // },
    ]
}
export { TFlowNode }

