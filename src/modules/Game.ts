// 引入其他的类
import Snake from "./Snake";
import Food from "./Food";
import Stage from "./Stage";

// 游戏控制器，控制其他的所有类
class Game {
    private _row: number;
    private _col: number;
    private _element: HTMLElement;
    private _stage: Stage;
    private _food: Food;
    private _time: Time;

    constructor(element: HTMLElement, row: number, col: number) {
        this._element = element;
        this._row = Math.floor(row);
        this._col = Math.floor(col);

        this._stage = new Stage(this);
        this._food = new Food(this);
        this._time = new Time();


        setInterval(() => {
            this._food.randomPosition();
        }, 2000)

    }


    start() {
        const deltaTime = this._time.deltaTime;


        this._stage.renderer();

        requestAnimationFrame(() => {
            this.start();
        });
    }



    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }

    get element() {
        return this._element;
    }

}

export default Game;
