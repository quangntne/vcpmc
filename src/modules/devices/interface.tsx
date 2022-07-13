export interface IFaceLog {
    deviceLogId: string,
    deviceLogValue: {},
    deviceLogType: number,
    userId: string,
    userName: string,
    deviceLogCreatedAt: string
}

export interface DataTemp {
    date: string,
    listLog: Array<any>
}