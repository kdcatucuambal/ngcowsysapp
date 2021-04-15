export interface Payment {
    "paymentId": number,
    "paymentDate": string
    "paymentToDate": string,
    "paymentFromDate": string,
    "paymentTotalLiters": number,
    "paymentLiterValue": number,
    "paymentTotal": number,
    "records": Record[]
}

export interface Record {
    "recordId": number,
    "recordDate": string,
    "recordMorning": number,
    "recordAfternoon": number,
    "recordDescription": string
}