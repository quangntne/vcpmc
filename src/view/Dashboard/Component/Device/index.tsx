import Device from "@modules/devices/entity"
import deviceViewmodel from "@modules/devices/viewModel"
import { Dropdown, Tooltip } from "antd"
import React from "react"
import "./style.scss"

interface IProps {
    action?: boolean,
    device: Device
}

const DeviceInfo = (props: IProps) => {
    const { action = true } = props
    const device = deviceViewmodel(props.device)

    const deviceAction = <div className="dropdown-menu">
        <div className="status">Device Log</div>
        <div className="status">Edit Device</div>
    </div>

    if (!device) return
    return <div className="device">
        <img src="https://resize.hswstatic.com/w_1188/gif/black-screen.jpg" alt="" />
        <div className="device-info pr-2">
            <div className="d-flex justify-content-between">
                <Tooltip title={device.deviceName}>
                    <div className="name">{device.deviceName}</div>
                </Tooltip>
                {
                    action &&
                    <Dropdown overlay={deviceAction} trigger={[ 'click' ]}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            <i className="fas fa-ellipsis-v"></i>
                        </a>
                    </Dropdown>
                }
            </div>
            <Tooltip title={device.deviceSku}>
                <div className="id">SKU/ID: {device.deviceSku || "000000000"}</div>
            </Tooltip>
            <div className="status" style={{ color: device.deviceStatus.color }}>
                <i className="fas fa-circle mr-1"></i>
                <span>{device.deviceStatus.statusName}</span>
            </div>
        </div>
    </div>
}

export default DeviceInfo