import { Moment } from 'moment';
import { useRef } from 'react';
type status = "init" | "success"
interface IRef {
    getRangeDate(): { dateFrom: Moment, dateTo: Moment };
    getDatePicker(format?: string): { date: Moment, dateString: Moment };
    status: string
}

const useFilterPeriod: () => IRef = () => {
    const ref = useRef({
        getRangeDate: () => {
            return { dateFrom: null, dateTo: null }
        },
        getDatePicker: () => {
            return { date: null, dateString: null }
        },
        status: "init",
    })

    const getRef = () => {
        return { ...ref.current };
    }

    return {
        ...getRef(),
    }
}

export default useFilterPeriod;