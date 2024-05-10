// 定义表示记分牌的类
class ScorePanel {
    private _scoreEle: HTMLElement;
    private _levelEle: HTMLElement;
    private _score: number = 0;
    private _level: number = 1;
    private _maxLevel: number;
    private _upScore: number;

    constructor(maxLevel: number, upScore: number) {
        this._scoreEle = document.getElementById('score')!;
        this._levelEle = document.getElementById('level')!;
        this._maxLevel = 3 < maxLevel && maxLevel < 11? Math.floor(maxLevel) : 10;
        this._upScore = 3 < upScore && upScore < 30? Math.floor(upScore) : 10;
    }

    prepareScorePanel() {
        this._score = 0;
        this._level = 1;
    }

    get level() {
        return this._level;
    }

    addScore() {
        this._scoreEle.innerHTML = ++this._score + '';
        if (this._score % this._upScore === 0) {
            this._levelUp();
        }
    }

    private _levelUp() {
        if (this._level < this._maxLevel) {
            this._levelEle.innerHTML = ++this._level + '';
        }
    }
}

export default ScorePanel;
