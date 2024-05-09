class Time {
    private _startTime: number;//开始时间
    private _lastTime: number;//上次时间
    private _deltaTime: number;//间隔时间
    private _pauseTime: number;//暂停时间
    private _playTime: number;//继续时间


    constructor() {
        this._lastTime = 0;
        this._startTime = 0;
        this._deltaTime = 0;
        this._pauseTime = 0;
        this._playTime = 0;
    }

    get deltaTime() {
        const now = Date.now();
        this._deltaTime = now - this._lastTime - (this._playTime - this._pauseTime);
        return this._deltaTime;
    }

    start() {
        this._startTime = Date.now();
        this._lastTime = this._startTime;
        this._deltaTime = 0;
    }

    pause() {
        this._pauseTime = Date.now()
    }

    play() {
        this._playTime = Date.now();
    }

    correctTime(correctionValue: number) {
        this._playTime = 0;
        this._pauseTime = 0;
        //当前时间减去修正值
        this._lastTime = Date.now() - correctionValue;
    }
}


export default Time;