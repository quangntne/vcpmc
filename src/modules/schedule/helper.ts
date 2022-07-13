import moment, { Moment } from 'moment'
import Schedule from './Entity'


export const getTotalDayInMonth = (__moment: Moment) => {
    if(__moment==null){
        return {};
    }
    let _moment= __moment;
    if(typeof __moment=="string"){
        _moment=moment(__moment)
    }
    const year = _moment.year()
    const month = _moment.month() + 1
    const totalDay = new Date(year, month, 0).getDate()
    return {
        totalDay,
        listDayInMonth: Array.from(
            { length: totalDay },
            (x, i) => i + 1
        )
    }
}

export const getHourInDay = () => {
    return Array.from(
        { length: 24 },
        (x, i) => {
            const suffixes = i < 12 ? "AM" : "PM"
            return `${ i }:00 ${ suffixes }`
        }
    )
}

interface IGetHourInRange {
    startTime: string,
    endTime: string,
}

export const getListHourInRange = ({ startTime, endTime }: IGetHourInRange) => {
    // hh:mm:ss

    const getHour = (time: string) => {
        return +time.split(':')[ 0 ]
    }

    const hourInDay = Array.from(
        { length: 24 },
        (x, i) => {
            return i
        })

    let listHourInRange = []

    hourInDay.forEach(hour => {
        if (hour >= getHour(startTime) && hour <= getHour(endTime)) {
            listHourInRange.push(hour)
        }
    })
    return listHourInRange
}

interface IGetDayInSchedule {
    format: string
    scheduleRepeat: number, // 0 | 1 | 2 | 3 | 4 // norepeat - daily - weekly - monthly - yearly
    scheduleDateTimeBegin: Moment
    scheduleDateTimeEnd: Moment
    scheduleRepeatValues: Array<string>
}

export const getDayInSchedule = (schedule: IGetDayInSchedule) => {
    const startYear = schedule.scheduleDateTimeBegin.year()
    const endYear = schedule.scheduleDateTimeEnd.year()

    const startMonth = schedule.scheduleDateTimeBegin.month() + 1
    const endMonth = schedule.scheduleDateTimeEnd.month() + 1

    const yearRange = Array.from(
        { length: endYear - startYear + 1 },
        (x, i) => i + startYear
    )

    const monthRange = Array.from(
        { length: endMonth - startMonth + 1 },
        (x, i) => String(i + startMonth).padStart(2, '0')
    )

    let dayInSchedule = new Set()

    switch (schedule.scheduleRepeat) {
        case 2:
            let weekdays = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ]
            let termDayInSchedule = new Set()
            schedule.scheduleRepeatValues.forEach(weekday => {
                let day = weekdays.indexOf(weekday)
                let termDayBegin = schedule.scheduleDateTimeBegin.clone()
                termDayInSchedule.add(termDayBegin.day(day).format(schedule.format))

                while (termDayBegin.day(7 + day).isSameOrBefore(schedule.scheduleDateTimeEnd)) {
                    termDayInSchedule.add(termDayBegin.format(schedule.format))
                }
            })

            termDayInSchedule.forEach(day => {
                if (
                    moment(day, "YYYY-MM-DD").isSameOrAfter(schedule.scheduleDateTimeBegin) &&
                    moment(day, "YYYY-MM-DD").isSameOrBefore(schedule.scheduleDateTimeEnd)
                ) {
                    dayInSchedule.add(day)
                }
            })

            break
        case 3:
            schedule.scheduleRepeatValues.forEach(day => {
                yearRange.forEach(year => {
                    monthRange.forEach(month => {
                        dayInSchedule.add(moment(`${ year }-${ month }-${ String(day).padStart(2, '0') }`, "YYYY-MM-DD").format(schedule.format))
                    })
                })
            })
            break
        case 4:
            schedule.scheduleRepeatValues.forEach(monthDay => {
                yearRange.forEach(year => {
                    dayInSchedule.add(moment(`${ year }-${ monthDay }`, "YYYY-MM-DD").format(schedule.format))
                })
            });

            break;
        default:
            break
    }
    console.log(Array.from(dayInSchedule), 'Array.from(dayInSchedule)====')
    return Array.from(dayInSchedule)
};
