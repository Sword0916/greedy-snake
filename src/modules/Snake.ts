import Position from "./Position";
import Game from "./Game";

class Snake {
    private _game: Game;
    private _positions: Position[] = [];
    private _speed: Position = new Position(1, 0);
    private _turnSpeed: Position | null = null;

    constructor(game: Game) {
        this._game = game;
    }

    prepareSnake() {
        this._positions = [
            new Position(0, 0), //尾
            new Position(1, 0),
            new Position(2, 0), //头
        ];
        this._speed = new Position(1, 0);
    }

    move() {
        if(this._turnSpeed) {
            this._speed = this._turnSpeed;
            this._turnSpeed = null;
        }

        if(this._isEatFood(this._game.food.position)) {
            //吃到变长
            this._positions.push(this._game.food.position);
            if(this._game.isGameWin()) {
                this._game.gameOver("胜利！游戏结束！");
            } else {
                this._game.food.prepareFood();
                this._game.scorePanel.addScore();
            }
        } else {
            //没吃到前进
            for (let i = 0; i < this._positions.length; i++) {
                this._positions[i] = (
                    i === this._positions.length - 1 ?
                        this._positions[i].add(this._speed) : //头
                        this._positions[i + 1].copy()//尾
                )
            }
        }
    }

    get positions() {
        return this._positions;
    }

    //转向
    turn(position: Position) {
        if (this._speed.x === 0 && position.x !== 0) {
            //上下运动
            this._turnSpeed = position;
        } else if (this._speed.y === 0 && position.y !== 0) {
            //左右运动
            this._turnSpeed = position;
        } else {
            this._turnSpeed = null;
        }
    }

    private _isEatFood(foodPosition: Position) {
        let head = this._positions[this._positions.length - 1];
        head = head.add(this._speed);
        return head.equals(foodPosition);
    }

    touchFood(foodPosition: Position) {
        for (let i = 0; i < this._positions.length; i++) {
            if (this._positions[i].equals(foodPosition)) {
                return true;
            }
        }
        return false;
    }

    touchWall() {
        const head = this._positions[this._positions.length - 1];
        return !(0 <= head.x && head.x < this._game.x && 0 <= head.y && head.y < this._game.y);
    }

    touchSelf() {
        const head = this._positions[this._positions.length - 1];
        for (let i = 0; i < this._positions.length - 1; i++) {
            if (this._positions[i].equals(head)) {
                return true;
            }
        }
        return false;
    }

}

export default Snake;
