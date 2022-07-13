import devicesPresenter from "@modules/devices/presenter"
import deviceViewmodel from "@modules/devices/viewModel"
import { useAsync } from "@view/shared/hook/useAsync"
import React, { useEffect } from "react"
import "./style.scss"

const DeviceStatus = props => {
    const [ getTotalDeviceStatus ] = useAsync(devicesPresenter.getTotalDeviceStatus)
    const { statisticalDevice } = deviceViewmodel()

    useEffect(() => {
        getTotalDeviceStatus.execute()
    }, [])

    return <div className="device-status">

        {
            statisticalDevice(getTotalDeviceStatus.value).map(status => {

                const { color, name, percent, totalActive } = status

                return <div className="status">
                    <span className="label" style={{ color }}>{name}</span>
                    <div className="full-status-bar">
                        <div className="status-bar"
                             style={{
                                 backgroundColor: color,
                                 width: percent
                             }}>
                            {totalActive}
                        </div>
                    </div>
                </div>
            })
        }
    </div>
}

export default DeviceStatus