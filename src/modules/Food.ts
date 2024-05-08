import Position from "./Position";
import {randomInt} from "../util/index";
import Game from "./Game";

class Food {
    private _game: Game;
    private _position: Position = new Position(0, 0);//位置坐标

    constructor(game: Game) {
        this._game = game;
    }

    get position() {
        return this._position;
    }

    //创建食物
    createFood() {
        this._position = this._randomPosition();
        this._game.renderer.setCellValue(this._position, -1);
        this._game.renderer.needUpdate = true;
    }

    //随机坐标
    private _randomPosition(): Position {
        const position = new Position(randomInt(this._game.x), randomInt(this._game.y));
        return this._game.snake.touchFood(position) ? this._randomPosition() : position;
    }


}

export default Food;
