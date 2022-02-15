import * as yibailong from '../clib/yibailong'
import {GpioCallbackParam} from '../clib/public'
export type GpioFengniaoLin1CallbackParam =GpioCallbackParam<yibailong.D1.Db>
export type Config = {
    cli: {
        websocket: {
            uri: string
        }
        wifi:{
            ssid:string
            password:string
        }
    }
    serve: {
        websocekt: {
            port: number
        }
        http: {
            port: number
        }
        ap:{
            ssid:string
            password:string
        }
    }
    gpio: {
        fengniaoLin1: {
            ioNumber: 0
            resDb: Record<string, GpioFengniaoLin1CallbackParam & { type: 'kengwei'|'', name: string}>
        }
    }
    door: {
        doorName: string,
        doorFloor: number
    }
}

export type cli_websocekt_sendParam={
    api: 'kengwei'
    db:Config['door']&{kenNumber:number,kenNowUseNumber:number}
}
export type cli_websocekt_resParam={
    api: cli_websocekt_sendParam['api']
}
