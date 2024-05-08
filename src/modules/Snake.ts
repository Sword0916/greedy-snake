import Position from "./Position";
import Game from "./Game";

class Snake {
    private _game: Game;
    private _positions: Position[];
    private _speed: Position;
    private _isTurn: boolean;
    private _isGrow: boolean = false;//吃到食物长大一格

    constructor(game: Game) {
        this._game = game;
        this._positions = [
            new Position(0, 0), //尾
            new Position(1, 0),
            new Position(2, 0), //头
        ];
        this._speed = new Position(1, 0);
        this._isTurn = false;
        this.init();
    }

    private init() {
        this._positions.forEach((p) => {
            this._game.renderer.setCellValue(p, 1);
        })
        this._game.renderer.needUpdate = true;
    }


    move() {
        for(let i = 0; i < this._positions.length; i ++) {
            if(i === this._positions.length - 1) {
                //头
                this._positions[i] = this._positions[i].add(this._speed);
                this._game.renderer.setCellValue(this._positions[i], 1);
            } else {
                //尾
                if(i === 0) {
                    this._game.renderer.setCellValue(this._positions[i], 0);
                }
                //身体向前移一位
                this._positions[i] = this._positions[i + 1].copy();
                this._game.renderer.setCellValue(this._positions[i], 1);
            }
        }
        this._game.renderer.needUpdate = true;
        this._isTurn = false;
    }

    //长大
    growUp(position: Position) {
        this._positions.unshift(position);
    }

    //转向
    turn(position: Position) {
        if(!this._isTurn) {
            if(this._speed.x === 0 && position.x !== 0) {
                //上下运动
                this._speed = position;
                this._isTurn = true;
            } else if(this._speed.y === 0 && position.y !== 0) {
                //左右运动
                this._speed = position;
                this._isTurn = true;
            }
        }
    }

    //碰到食物
    touchFood(foodPosition: Position) {
        for(let i = this._positions.length -1; i >= 0; i--) {
            if(this._positions[i].equals(foodPosition)) {
                return true;
            }
        }
        return false;
    }

    //碰到墙
    touchWall() {
        const head = this._positions[this._positions.length - 1];
        return !(0 <= head.x && head.x < this._game.x && 0 <= head.y && head.y < this._game.y);
    }

    //碰到自己
    touchSelf() {
        const head = this._positions[this._positions.length - 1];
        for(let i = 0; i < this._positions.length - 1; i++) {
            if(this._positions[i].equals(head)) {
                return true;
            }
        }
        return false;
    }
}

export default Snake;
