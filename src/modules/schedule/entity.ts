class Schedule {
    scheduleId: string = ""
    scheduleDateTimeBegin: string = ""
    scheduleDateTimeEnd: string = ""
    scheduleTimeBegin: string = "00:00:01"
    scheduleTimeEnd: string = "11:00:00"
    scheduleRepeat: 0 | 1 | 2 | 3 | 4 // norepeat - daily - weekly - monthly - yearly
    scheduleRepeatValues: Array<string> = []
    scheduleRepeatValueDetails: Array<string>
    scheduleLoop: number
    scheduleComment: string = ""
    createdAt: string = ""
    updatedAt: string = ""

    constructor(schedule) {
        if (!schedule) return

        Object.keys(schedule).forEach(key => {
            if (typeof schedule[ key ] == "undefined") return
            this[ key ] = schedule[ key ]
        })
    }
}

export default Schedule