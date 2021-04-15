export interface Observation {
    "observationId": number,
    "observationDate": string,
    "observationDescription": string,
    "observationPrice": string,
    "cow": {
        "cowId": number,
        "cowName": string
        "cowActive": boolean
    },
    "type": typeObs
}

export interface typeObs {
    "typeId": number,
    "typeName": string
}