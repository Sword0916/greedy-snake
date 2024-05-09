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
    private _isGameOver: boolean = false;
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

    get renderer() {
        return this._renderer;
    }

    get scorePanel() {
        return this._scorePanel;
    }

    private _prepare() {
        this._isGameOver = false;
        this._isPause = false;
        this._renderer.createRenderer();
        this._scorePanel.createScorePanel();
        this._snake.createSnake();
        this._food.createFood();
        this._control.createControl();

        this._renderer.renderer();//渲染开始界面
    }

    //开始
    start() {
        this._time.start();
        this._run();
    }

    //重新开始
    reStart() {
        this._prepare();
        this._time.start();
        this._run();
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

        !this._isGameOver && !this._isPause && requestAnimationFrame(this._run);
    }

    private _update() {
        this._snake.move();

        if (this._snake.touchWall()) {
            this._gameOver("撞到墙，游戏结束！");
            return;
        }

        if (this._snake.touchSelf()) {
            this._gameOver("撞到自己，游戏结束！");
            return;
        }

        this._renderer.renderer();
    }

    //游戏结束
    private _gameOver(msg: string) {
        this._isGameOver = true;
        alert(msg);
    }

    //验证是否胜利
    checkWin() {
        if(this._x * this._y === this._snake.positions.length){
            this._isGameOver = true;
            alert("胜利！游戏结束！");
        }
    }

}

export default Game;
