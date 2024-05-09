import Position from "./Position";
import Game from "./Game";

class Snake {
    private _game: Game;
    private _positions: Position[] = [];
    private _speed: Position = new Position(1, 0);
    private _isGrow: boolean = false;//吃到食物长大一格
    private _turnSpeed: Position | null = null;


    constructor(game: Game) {
        this._game = game;
        this.createSnake();
    }

    createSnake() {
        this._positions = [
            new Position(0, 0), //尾
            new Position(1, 0),
            new Position(2, 0), //头
        ];
        this._speed = new Position(1, 0);
        this._isGrow = false;

        this._game.renderer.needUpdate = true;
    }

    move() {
        if(this._turnSpeed) {
            this._speed = this._turnSpeed;
            this._turnSpeed = null;
        }

        if(this._isEatFood(this._game.food.position)) {
            //吃到变长
            this._growUp(this._game.food.position);
            this._game.food.createFood();
            this._game.scorePanel.addScore();
        } else {
            //没吃到前进
            for (let i = 0; i < this._positions.length; i++) {
                if (i === this._positions.length - 1) {
                    //头
                    this._positions[i] = this._positions[i].add(this._speed);
                } else {
                    //尾
                    this._positions[i] = this._positions[i + 1].copy();
                }
            }
        }
        this._game.renderer.needUpdate = true;

    }

    //长大
    private _growUp(position: Position) {
        this._positions.push(position);
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
