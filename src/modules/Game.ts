import Food from "./Food";
import Renderer from "./Renderer";
import Time from "./Time";
import {TICK_DURATION} from "./Constant";
import Snake from "./Snake";
import Control from "./Control";
import ScorePanel from "./ScorePanel";
import {GameOptions} from "./GameOptions";



class Game {
    private _x: number;//横轴
    private _y: number;//纵轴
    private _container: HTMLElement;
    private _food: Food;
    private _time: Time;
    private _snake: Snake;
    private _control: Control;
    private _renderer: Renderer;
    private _scorePanel: ScorePanel;
    private _isStart: boolean = false;
    private _isPause: boolean = false;

    private _onGameStart?: () => void;
    private _onGameOver?: (msg: string) => void;
    private _onGamePause?: () => void;
    private _onGamePlay?: () => void;

    constructor(options: GameOptions) {
        this._container = options.container;
        this._x = options.x && options.x > 5? Math.floor(options.x): 5;
        this._y = options.y && options.y > 5? Math.floor(options.y): 5;
        this._scorePanel = new ScorePanel(options);
        this._renderer = new Renderer(this);
        this._time = new Time();
        this._snake = new Snake(this);
        this._food = new Food(this);
        this._control = new Control(this);


        this._onGameStart = options.onGameStart;
        this._onGameOver = options.onGameOver;
        this._onGamePause = options.onGamePause;
        this._onGamePlay = options.onGamePlay;

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

    get container() {
        return this._container;
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

        this._renderer.renderer();//渲染开始界面
    }

    //开始
    start() {
        this._isStart = true;
        this._time.start();
        this._run();
        this._onGameStart && this._onGameStart();
    }

    //重新开始
    reStart() {
        this._prepare();
    }

    pause() {
        this._isPause = true;
        this._time.pause();
        this._onGamePause && this._onGamePause();
    }

    play() {
        this._isPause = false;
        this._time.play();
        this._run();
        this._onGamePlay && this._onGamePlay();
    }

    private _run() {
        const tickTime = TICK_DURATION * this.scorePanel.speedRatio;
        this._time.isTick(tickTime) && this._update();

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
        this._onGameOver && this._onGameOver(msg);
    }

    //验证是否胜利
    isGameWin() {
        return this._x * this._y === this._snake.positions.length;
    }

}

export default Game;
