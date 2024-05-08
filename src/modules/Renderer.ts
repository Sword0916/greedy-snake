import Constant from "./Constant";
import Game from "./Game";
import Position from "./Position";


//渲染器
class Renderer {
    private _game: Game;
    private _needUpdate: boolean = false; //更新标志位
    private _board: number[][] = [];//面板二维数组
    private _boxes: HTMLElement[] = [];

    constructor(game: Game) {
        this._game = game;
    }

    createRenderer() {
        this._needUpdate = false;
        this._board = Array(this._game.y).fill(null).map(() => Array(this._game.x).fill(0));
        this._boxes = [];

        this._game.element.innerHTML = "";
        this._game.element.style.width = this._game.x * Constant.STEP + "px";
        this._game.element.style.height = this._game.y * Constant.STEP + "px";

        this._board.forEach((row, r) => {
            row.forEach((col, c) => {
                const div = document.createElement("div");
                this._game.element.appendChild(div);
                this._boxes.push(div);
            });
        });
    }

    set needUpdate(needUpdate: boolean) {
        this._needUpdate = needUpdate;
    }

    //渲染
    renderer() {
        if (this._needUpdate) {
            this._needUpdate = false;
            this._board.forEach((row, r) => {
                row.forEach((col, c) => {
                    const box = this._boxes[r * this._game.x + c];
                    if (this._board[r][c] == 1 && !box.classList.contains(Constant.SNAKE_CLASS)) {
                        box.classList.add(Constant.SNAKE_CLASS);
                    } else if (this._board[r][c] != 1 && box.classList.contains(Constant.SNAKE_CLASS)) {
                        box.classList.remove(Constant.SNAKE_CLASS);
                    }

                    if (this._board[r][c] == -1 && !box.classList.contains(Constant.FOOD_CLASS)) {
                        box.classList.add(Constant.FOOD_CLASS);
                    } else if (this._board[r][c] != -1 && box.classList.contains(Constant.FOOD_CLASS)) {
                        box.classList.remove(Constant.FOOD_CLASS);
                    }
                });
            });
        }
    }

    //修改值
    setCellValue(position: Position, value: number) {
        if (this._board[position.y] && this._board[position.y][position.x] >= 0) {
            this._board[position.y][position.x] = value;
        }
    }

}

export default Renderer;