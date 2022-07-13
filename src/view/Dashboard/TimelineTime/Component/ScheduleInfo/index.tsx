import Schedule from "@modules/schedule/Entity"
import User from "@modules/user/entity"
import React from "react"

interface IProps {
    schedule: Schedule,
    author: User
}

const ScheduleInfo = (props: IProps) => {
    return <div className="schedule-info">

    </div>
}

export default ScheduleInfo