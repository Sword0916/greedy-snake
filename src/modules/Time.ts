

class Time {
    private _startTime: number;//开始时间
    private _lastTime: number;//上次时间

    constructor() {
        this._lastTime = 0;
        this._startTime = 0;
        this._deltaTime = 0;
    }

    start() {
        this._lastTime = Date.now();
        this._startTime = this._lastTime;
        this._deltaTime = 0;
    }

    private _deltaTime: number;//间隔时间

    get deltaTime() {
        const now = Date.now();
        this._deltaTime = now - this._lastTime;
        return this._deltaTime;
    }

    tick(correctionValue: number) {
        //当前时间减去修正值
        this._lastTime = Date.now() - correctionValue;
    }
}


export default Time;