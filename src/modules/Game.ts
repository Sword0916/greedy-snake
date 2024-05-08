// 引入其他的类
import Food from "./Food";
import Renderer from "./Renderer";
import Time from "./Time";
import Constant from "./Constant";
import Snake from "./Snake";
import Control from "./Control";
import ScorePanel from "./ScorePanel";


// 游戏控制器，控制其他的所有类
class Game {
    private _x: number;//横轴
    private _y: number;//纵轴
    private _element: HTMLElement;
    private _food: Food;
    private _time: Time;
    private _snake: Snake;
    private _renderer: Renderer;
    private _control: Control;
    private _scorePanel: ScorePanel;
    private _isGameOver: boolean = false;


    constructor(element: HTMLElement, x: number = 20, y: number = 20, maxLevel: number = 10, upScore: number = 1) {
        this._element = element;
        this._x = Math.floor(x);
        this._y = Math.floor(y);

        this._renderer = new Renderer(this);
        this._scorePanel = new ScorePanel(maxLevel, upScore);

        this._time = new Time();
        this._snake = new Snake(this);
        this._food = new Food(this);

        this._control = new Control(this);
        this._renderer.renderer();//初始化开始界面
        this._run = this._run.bind(this);

    }


    get renderer() {
        return this._renderer;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get element() {
        return this._element;
    }

    get snake() {
        return this._snake;
    }

    start() {
        this._time.start();
        this._run();
    }

    private _run() {
        const deltaTime = this._time.deltaTime;
        if (deltaTime >= Constant.TICK_DURATION / this._scorePanel.level) {
            console.log(Constant.TICK_DURATION / this._scorePanel.level);
            this.update();
            this._time.tick(deltaTime - Constant.TICK_DURATION);
        }

        !this._isGameOver && requestAnimationFrame(this._run);
    }

    private update() {
        this._snake.move();

        if(this._snake.touchWall()) {
            this._gameOver("撞到墙，游戏结束！");
            return;
        }

        if(this._snake.touchSelf()) {
            this._gameOver("撞到自己，游戏结束！");
            return;
        }

        if(this._snake.touchFood(this._food.position)) {
            this._snake.growUp(this._food.position);
            this._food.createFood();
            this._scorePanel.addScore();
        }
        this._renderer.renderer();
    }

    //游戏结束
    private _gameOver(msg: string) {
        this._isGameOver = true;
        alert(msg);
    }

}

export default Game;
