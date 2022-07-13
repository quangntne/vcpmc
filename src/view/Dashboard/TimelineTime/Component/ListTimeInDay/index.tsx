import { getHourInDay } from "@modules/schedule/helper"
import React from "react"
import "./style.scss"

const ListTimeInDay = (props) => {
    return <div className="list-time-in-day">
        {
            getHourInDay().map((hour, index) => {
                return <div className="time">
                    {hour}
                </div>
            })
        }
    </div>
}

export default ListTimeInDay