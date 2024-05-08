

class Position{
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    get x() {
        return this._x;
    }

    set x(x) {
        this._x = x;
    }

    get y() {
        return this._y;
    }

    set y(y) {
        this._y = y;
    }

    add(position: Position) {
        return new Position(this._x + position.x, this._y + position.y);
    }

    copy() {
        return new Position(this._x, this._y);
    }

    equals(position: Position) {
        return this._x === position.x && this._y === position.y;
    }
}

export default Position;