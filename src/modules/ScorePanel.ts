import {GameOptions} from "./GameOptions";

class ScorePanel {
    private _score: number = 0;
    private _level: number = 1;
    private _maxLevel: number;
    private _upScore: number;
    private _speedRatio: number = 1;
    private _onAddScore?: (score: number) => void;
    private _onLevelUp?: (level: number) => void;

    constructor(options: GameOptions) {
        this._maxLevel = options.maxLevel && 3 < options.maxLevel && options.maxLevel < 10? Math.floor(options.maxLevel) : 10;
        this._upScore = options.upScore && 3 < options.upScore && options.upScore < 10? Math.floor(options.upScore) : 10;

        this._onAddScore = options.onAddScore;
        this._onLevelUp = options.onLevelUp;
    }

    prepareScorePanel() {
        this._score = 0;
        this._level = 1;
        this._speedRatio = 1;
    }

    get speedRatio() {
        return this._speedRatio;
    }

    addScore() {
        this._score++;
        this._onAddScore && this._onAddScore(this._score);

        if (this._score % this._upScore === 0) {
            this._levelUp();
        }
    }

    private _levelUp() {
        if (this._level < this._maxLevel) {
            this._level++;
            this._speedRatio = 1 - (this._level - 1) / this._maxLevel;
            this._onLevelUp && this._onLevelUp(this._level);
        }
    }

}

export default ScorePanel;
