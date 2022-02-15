import { Os, Cli_websocekt, Serve_websocekt, Serve_http,Esp32Fun } from '../clib/public'
import * as fengniao from '../clib/fengniao'
import _ from 'lodash'
import {
    Config,
    GpioFengniaoLin1CallbackParam,
    cli_websocekt_sendParam,
    cli_websocekt_resParam
} from './ts'
type Serve_websocekt_resParam = { api: 'get' } | { api: 'set', db: Partial<Config> }
export default class {
    private Os: Os<Config>
    private Cli_websocekt: Cli_websocekt
    private Serve_websocekt: Serve_websocekt
    private Serve_http: Serve_http
    private fengniaolin1: fengniao.Lin1<GpioFengniaoLin1CallbackParam>
    constructor(constConfig: Config) {
        this.Os = new Os(constConfig)
        this.Cli_websocekt = new Cli_websocekt(
            this.Os.state.cli.websocket.uri,
            this.cli_websocekt_res
        )
        this.Serve_websocekt = new Serve_websocekt(
            this.Os.state.serve.websocekt.port,
            this.serve_websocekt_res
        )
        this.Serve_http = new Serve_http(
            this.Os.state.serve.http.port,
            this.serve_http_res
        )
        this.fengniaolin1 = new fengniao.Lin1<GpioFengniaoLin1CallbackParam>(
            this.Os.state.gpio.fengniaoLin1.ioNumber,
            this.fengniaolin1Callback
        )
    }
    loop() {
        this.fengniaolin1.loop()
    }
    private cli_websocekt_res(data: string) {
        const res = JSON.parse(data) as cli_websocekt_resParam
    }
    private cli_websocekt_send(api: cli_websocekt_sendParam['api']) {
        switch (api) {
            case 'kengwei':
                const apiData = Object.values(this.Os.state.gpio.fengniaoLin1.resDb).filter(v => v.type === api);
                const kenNowUseNumber = apiData.map(v => v.db).filter(v => v === 1).length
                const data = {
                    ... this.Os.state.door,
                    kenNumber: apiData.length,
                    kenNowUseNumber
                }
                return this.Cli_websocekt.send(JSON.stringify({ api, data }))
        }
    }
    private serve_websocket_send(api: 'get') {
        switch (api) {
            case 'get':
                this.Serve_websocekt.send(JSON.stringify({ api, data: this.Os.state }))
        }
    }
    private serve_websocekt_res(data: string) {
        const res = JSON.parse(data) as Serve_websocekt_resParam
        switch (res.api) {
            case 'get':
                return this.serve_websocket_send('get')
            case 'set':
                this.Os.state = _.assign(this.Os.state, res.db)
                return this.Os.setFile();
        }
    }
    private serve_http_res() {
        return 'html'
    }
    private fengniaolin1Callback(op: GpioFengniaoLin1CallbackParam) {
        const def = this.Os.state.gpio.fengniaoLin1.resDb[op.id] || { type: '', db: 0, name: '' }
        this.Os.assignState({
            gpio: {
                fengniaoLin1: {
                    resDb: {
                        [op.id]: {
                            id: op.id,
                            ...def
                        }
                    }
                }
            }
        }).setFile()
        if (def.type && def.name) {
            this.cli_websocekt_send(def.type)
        }
        this.serve_websocket_send('get')
    }
}
