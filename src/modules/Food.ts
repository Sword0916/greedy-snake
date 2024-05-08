// 定义食物类Food
import Position from "./Position";
import {randomInt} from "../util/index";
import Game from "./Game";

class Food {
    private _game: Game;
    //位置坐标
    private _position: Position = new Position(0, 0);

    constructor(game: Game) {
        this._game = game;
        this.randomPosition();
    }

    //随机坐标
    randomPosition() {
        //随机出新的食物
        this._position = new Position(randomInt(this._game.row), randomInt(this._game.col));
    }

    get position() {
        return this._position;
    }


}

export default Food;
