class Device {
    colorCode: string = "";
    createdAt: string = "";
    deviceComment: string = "";
    deviceExpired: 0 | 1 = 0;
    deviceId: string = "";
    deviceLocation: string = "";
    deviceMACAddress: string = "";
    deviceMemory: number;
    deviceName: string = "";
    devicePhoto: string = "";
    devicePlaylistDefault: string = "";
    deviceSku: string = "";
    deviceStatus: 1 | 2 = 1;
    deviceTokens: string = "";
    deviceType: number;
    deviceTypeId: string = "";
    loginName: string = "";
    updatedAt: string = "";

    constructor(device) {
        Object.keys(device).map(key => {
            if (device[ key ]) {
                this[ key ] = device[ key ]
            }
        })
    }
}

export default Device