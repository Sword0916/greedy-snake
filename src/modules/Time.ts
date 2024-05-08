

class Time{
    private _startTime: number;
    private _nowTime: number;

    constructor() {
        this._nowTime = Date.now();
        this._startTime = this._nowTime;
    }


    get deltaTime() {
        this._nowTime = Date.now();
        return this._nowTime - this._startTime;
    }
}