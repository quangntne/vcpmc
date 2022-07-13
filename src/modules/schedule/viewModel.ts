const scheduleViewModel = () => {
    const listDeviceStatus = [
        {
            value: 1,
            name: "Active",
        },
        {
            value: 2,
            name: "In active",
        },
        {
            value: 0,
            name: "All device"
        },
    ]

    const getDeviceStatusByValue = (value: 0 | 1 | 2) => {
        let status = ""
        listDeviceStatus.forEach(item => {
            if (item.value == value) {
                status = item.name
            }
        })
        return status
    }

    return {
        listDeviceStatus,
        getDeviceStatusByValue,
    }
}

export default scheduleViewModel