import React from "react"
import DeviceInfo from "@view/Dashboard/Component/Device"
import { useSelector } from "react-redux"
import { RootState } from "@modules/core/store/redux"


const ListDevice = (props) => {
    const { listDevice: ListDeviceCalendar } = useSelector((state: RootState) => state.deviceCalendar)

    return <div className="list-device">
        {
            ListDeviceCalendar.map(deviceCalendar => {
                if (!deviceCalendar.device) return

                return <DeviceInfo device={deviceCalendar.device} />
            })
        }
    </div>
}

export default ListDevice