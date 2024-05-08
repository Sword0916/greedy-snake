// 定义表示记分牌的类
class ScorePanel {
    private _score = 0;
    private _level = 1;

    private _scoreEle: HTMLElement;
    private _levelEle: HTMLElement;

    private _maxLevel: number;
    private _upScore: number;

    constructor(maxLevel: number, upScore: number) {
        this._scoreEle = document.getElementById('score')!;
        this._levelEle = document.getElementById('level')!;
        this._maxLevel = maxLevel;
        this._upScore = upScore;
    }

    //设置一个加分的方法
    addScore() {
        // 使分数自增
        this._scoreEle.innerHTML = ++this._score + '';
        // 判断分数是多少
        if (this._score % this._upScore === 0) {
            this._levelUp();
        }
    }

    // 提升等级的方法
    private _levelUp() {
        if (this._level < this._maxLevel) {
            this._levelEle.innerHTML = ++this._level + '';
        }
    }

    get level() {
        return this._level;
    }
}

export default ScorePanel;
