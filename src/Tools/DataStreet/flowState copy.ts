enum fieldtypes {
    TEXT,
    TEXTAREA,
    FILEPATH,
}

interface IFlowNodeProperty {
    [key: string]: {
        //    object,
        field: fieldtypes,
        readonly: boolean
    }
}

type TFlowNodeProperty = {
    [key: string]: {
        //    object,
        field: fieldtypes,
        readonly: boolean

    }
}


type TFlowNode = {
    name: string,
    description: string,
    properties: TFlowNodeProperty[]
}

interface IFlowNode {
    name: string,
    description: string,
    properties: TFlowNodeProperty[]
}

const test1: IFlowNodeProperty = {
    sleutel: {
        field: fieldtypes.FILEPATH,
        readonly: false
    }
}

const test2: IFlowNodeProperty = {
    sleutel: {
        field: fieldtypes.FILEPATH,
        readonly: false
    }
}

const mynode:TFlowNode = {
    name: 'CBS Table Observation',
    description: 'beschrijving',
    properties: [
        test1,
        test2,
        {
            geen: {
                field: fieldtypes.TEXT,
                readonly: false
            }
        }
    ]

}

// kenia

// ethiopie

// spss >> 