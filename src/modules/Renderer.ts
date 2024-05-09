import {CELL_TYPE, STEP} from "./Constant";
import Cell from "./Cell";
import Game from "./Game";
import Position from "./Position";


//渲染器
class Renderer {
    private _game: Game;
    private _needUpdate: boolean = false; //更新标志位
    private _cells: Cell[][]; //面板

    constructor(game: Game) {
        this._game = game;
        this._cells = [];
    }

    createRenderer() {
        this._needUpdate = false;

        this._game.element.innerHTML = "";
        this._game.element.style.width = this._game.x * STEP + "px";
        this._game.element.style.height = this._game.y * STEP + "px";

        for(let y = 0; y < this._game.y; y++) {
            this._cells.push([]);
            for(let x = 0; x < this._game.x; x++) {
                this._cells[y].push(new Cell(this._game.element));
            }
        }
    }

    set needUpdate(needUpdate: boolean) {
        this._needUpdate = needUpdate;
    }

    //渲染
    renderer() {
        if (this._needUpdate) {
            this._needUpdate = false;
            const snakePositions = this._game.snake.positions;
            const foodPosition = this._game.food.position;
            this._cells.forEach((row, y) => {
                row.forEach((col, x) => {
                    col.type = this._getCellType(snakePositions, foodPosition, x, y);
                })
            })
        }
    }

    private _getCellType(snakePositions: Position[], foodPosition: Position, x: number, y: number) {
        if(foodPosition.x === x && foodPosition.y === y) {
            return CELL_TYPE.Food;
        }

        for(let i = 0; i < snakePositions.length; i ++) {
            const s = snakePositions[i];
            if(s.x === x && s.y === y) {
                return CELL_TYPE.Snake;
            }
        }

        return CELL_TYPE.Empty;
    }

}

export default Renderer;