import Constant from "./Constant";
import Game from "./Game";
import Position from "./Position";


//渲染器
class Renderer {
    private _game: Game;

    private _board: number[][] = [];//面板二维数组
    private _boxes: HTMLElement[] = [];

    constructor(game: Game) {
        this._game = game;
        this._needUpdate = false;
        this._board = Array(this._game.y).fill(null).map(() => Array(this._game.x).fill(0));
        this._init();
    }

    private _needUpdate: boolean; //更新标志位

    private _init() {
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
    public renderer() {
        if (this._needUpdate) {
            this._needUpdate = false;
            this._board.forEach((row, r) => {
                row.forEach((col, c) => {
                    const box = this._boxes[r * this._game.x + c];
                    if (this._board[r][c] && !box.classList.contains(Constant.BLACK_CLASS)) {
                        box.classList.add(Constant.BLACK_CLASS);
                    } else if (!this._board[r][c] && box.classList.contains(Constant.BLACK_CLASS)) {
                        box.classList.remove(Constant.BLACK_CLASS);
                    }
                });
            });
        }
    }

    //修改值
    setCellValue(position: Position, value: number) {
        if(this._board[position.y] && this._board[position.y][position.x] >= 0) {
            this._board[position.y][position.x] = value;
        }
    }


}

export default Renderer;