class Time {
    private _lastTime: number;//上次时间
    private _pauseTime: number;//暂停时间

    constructor() {
        this._lastTime = 0;
        this._pauseTime = 0;
    }

    get deltaTime() {
        return Date.now() - this._lastTime;
    }

    start() {
        this._lastTime = Date.now();
    }

    pause() {
        this._pauseTime = Date.now()
    }

    play() {
        this._lastTime += (Date.now() - this._pauseTime);
    }

    correctTime(correctionValue: number) {
        this._lastTime = Date.now() - correctionValue;
    }
}


export default Time;