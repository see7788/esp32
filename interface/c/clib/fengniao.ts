import { Gpio, GpioCallbackFun, GpioCallbackParam } from './public'
//只接收，距离100米
export class Lin1<T extends GpioCallbackParam<any>> extends Gpio<T>{
    constructor(io: number, callback: GpioCallbackFun<T>) {
        super(io, callback);
        this.setup()
    }
    private setup() {
        //你的代码

    }
    loop() {
        //你的代码
        // this.callback()
    }
}

export class Lin222x<T extends GpioCallbackParam<any>> extends Gpio<T>{
    constructor(io: number, callback: GpioCallbackFun<T>) {
        super(io, callback);
        this.setup()
    }
    private setup() {
        //你的代码

    }
    loop() {
        //你的代码
        // this.callback()
    }
    send(db:T){}
}
