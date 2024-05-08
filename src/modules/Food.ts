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
        this.createFood();
    }

    createFood() {
        //随机出新的食物
        this._position = this.randomPosition();
        this._game.renderer.setCellValue(this._position, 1);
        this._game.renderer.needUpdate = true;
    }

    //随机坐标
    private randomPosition(): Position {
        const position = new Position(randomInt(this._game.x), randomInt(this._game.y));
        return this._game.snake.touchFood(position)? this.randomPosition() : position;
    }


    get position() {
        return this._position;
    }


}

export default Food;
