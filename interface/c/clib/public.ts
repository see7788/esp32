import _ from 'lodash'
export type GpioCallbackParam<T> = {
    id: string,
    db: T
}
export type GpioCallbackFun<T extends GpioCallbackParam<any>> = (op: T) => void

export abstract class Gpio<T extends GpioCallbackParam<any>>  {
    callback: GpioCallbackFun<T>
    constructor(io: number, callback: GpioCallbackFun<T>) {
        this.callback = callback
    }
    abstract loop(): void
}
type DeepPartial<T extends Record<string, any>> = { [P in keyof T]?: DeepPartial<T[P]> }
export class Os<State extends Record<string, any>>{
    state: State
    constructor(constConfig: State) {
        this.state = constConfig
        this.readFile();
    }
    readFile(): this {
        const get = '' //读取
        this.assignState(this.parse(get) as any)
        return this
    }
    assignState(state: DeepPartial<State>): this {
        this.state = _.assign(this.state, state)
        return this
    }
    setFile(): this {
        const str = this.stringify(this.state)
        //存储
        return this
    }
    parse(str: string): Record<any, any> {
        return {}
    }
    stringify(json: Record<any, any>): string {
        return 'str'
    }
}
export class Esp32Fun {
    //本机ip
    ipv4(): string {
        return ''
    }
    mac(): string {
        return ''
    }
    //重启
    closeStart() { }
}
export class Cli_websocekt {
    constructor(uri: string, res: (data: string) => void) {
        this.start()
    }
    send(data: string) { }
    start() { }
    close() { }
}

export class Serve_websocekt {
    constructor(prot: number, res: (data: string) => void) {
        this.start()
    }
    send(data: string, toALLUser: boolean = true) { }
    start() { }
    close() { }
}
export class Serve_http {
    constructor(prot: number, res: (httpenv: any) => string) {
        this.start()
    }
    start() { }
    close() { }
}
