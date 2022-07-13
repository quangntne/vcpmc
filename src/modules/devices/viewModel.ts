import Device from "../devices/entity";

const deviceViewmodel = (device?: Device) => {
    const getDetailStatus = (device: Device) => {
        if (!device) return
        if (device.deviceStatus == 1) return {
            statusName: "Active",
            color: "#7FB800"
        }

        if (device.deviceStatus == 2) return {
            statusName: "In-active",
            color: "#E15554"
        }
    }

    interface INumberOfDevice {
        totalActive: number,
        totalDeactive: number,
        totalWarranty: number,
        total: number,
    }

    const calcPersent = (number, total) => {
        return (number * 100) / total + "%"
    }

    const statisticalDevice = (numberOfDevice: INumberOfDevice) => {
        if (!numberOfDevice) return []

        const { totalActive, totalDeactive, totalWarranty, total } = numberOfDevice

        return [
            {
                name: "Active",
                totalActive: totalActive,
                percent: calcPersent(totalActive, total),
                color: "#7FB800"
            },
            {
                name: "In Active",
                totalActive: totalDeactive,
                percent: calcPersent(totalDeactive, total),
                color: "#E15554"
            },
            {
                name: "Warranty",
                totalActive: totalWarranty,
                percent: calcPersent(totalWarranty, total),
                color: '#FFC81E'
            }
        ]
    }

    return {
        ...device,
        deviceStatus: getDetailStatus(device),
        statisticalDevice
    }
}

export default deviceViewmodel