import Food from "./Food";
import Renderer from "./Renderer";
import Time from "./Time";
import {TICK_DURATION} from "./Constant";
import Snake from "./Snake";
import Control from "./Control";
import ScorePanel from "./ScorePanel";


class Game {
    private _x: number;//横轴
    private _y: number;//纵轴
    private _element: HTMLElement;
    private _food: Food;
    private _time: Time;
    private _snake: Snake;
    private _control: Control;
    private _renderer: Renderer;
    private _scorePanel: ScorePanel;
    private _isStart: boolean = false;
    private _isPause: boolean = false;

    constructor(element: HTMLElement, x: number = 20, y: number = 20, maxLevel: number = 10, upScore: number = 10) {
        this._element = element;
        this._x = x > 5? Math.floor(x): 5;
        this._y = y > 5? Math.floor(y): 5;
        this._scorePanel = new ScorePanel(maxLevel, upScore);
        this._renderer = new Renderer(this);
        this._time = new Time();
        this._snake = new Snake(this);
        this._food = new Food(this);
        this._control = new Control(this);

        this._run = this._run.bind(this);
        this._prepare();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get isPause() {
        return this._isPause;
    }

    get element() {
        return this._element;
    }

    get snake() {
        return this._snake;
    }

    get food() {
        return this._food;
    }

    get isStart() {
        return this._isStart;
    }

    get scorePanel() {
        return this._scorePanel;
    }

    private _prepare() {
        this._isStart = false;
        this._isPause = false;
        this._renderer.prepareRenderer();
        this._scorePanel.prepareScorePanel();
        this._snake.prepareSnake();
        this._food.prepareFood();
        this._control.prepareControl();

        this._renderer.renderer();//渲染开始界面
    }

    //开始
    start() {
        this._isStart = true;
        this._time.start();
        this._run();
    }

    //重新开始
    reStart() {
        this._prepare();
    }

    pause() {
        this._isPause = true;
        this._time.pause();
    }

    play() {
        this._isPause = false;
        this._time.play();
        this._run();
    }

    private _run() {
        const deltaTime = this._time.deltaTime;
        const tickDuration = TICK_DURATION / this._scorePanel.level;
        if (deltaTime >= tickDuration) {
            this._time.correctTime(deltaTime - tickDuration);
            this._update();
        }

        this._isStart && !this._isPause && requestAnimationFrame(this._run);
    }

    private _update() {
        this._snake.move();

        if (this._snake.touchWall()) {
            this.gameOver("撞到墙，游戏结束！");
            return;
        }

        if (this._snake.touchSelf()) {
            this.gameOver("撞到自己，游戏结束！");
            return;
        }

        this._renderer.renderer();
    }

    //游戏结束
    gameOver(msg: string) {
        this._isStart = false;
        alert(msg);
    }

    //验证是否胜利
    isGameWin() {
        return this._x * this._y === this._snake.positions.length;
    }

}

export default Game;
