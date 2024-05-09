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

    createFood() {
        this._position = this._randomPosition();
    }

    private _randomPosition(): Position {
        const position = new Position(randomInt(this._game.x), randomInt(this._game.y));
        return this._game.snake.touchFood(position) ? this._randomPosition() : position;
    }


}

export default Food;
