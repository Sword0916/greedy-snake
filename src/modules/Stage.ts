import Constant from "./Constant";
import Game from "./Game";


//舞台
class Stage {
    private _game: Game;

    private _board: number[][] = [];//面板
    private _boxes: HTMLElement[] = [];


    constructor(game: Game) {
        this._game = game;
        this._board = Array(this._game.row).fill(null).map(() => Array(this._game.col).fill(0));
        this._init();
    }

    private _init() {
        this._game.element.innerHTML = "";
        this._game.element.style.width = this._game.col * Constant.STEP + "px";
        this._game.element.style.height = this._game.row * Constant.STEP + "px";

        this._board.forEach((row, r) => {
            row.forEach((col, c) => {
                const div = document.createElement("div");
                this._game.element.appendChild(div);
                this._boxes.push(div);
            });
        });
    }


    //渲染
    public renderer() {
        this._board.forEach((row, r) => {
            row.forEach((col, c) => {
                const box = this._boxes[r * this._game.col + c];
                if(this._board[r][c] && !box.classList.contains(Constant.BLACK_CLASS)) {
                    box.classList.add(Constant.BLACK_CLASS);
                } else if(!this._board[r][c] && box.classList.contains(Constant.BLACK_CLASS)){
                    box.classList.remove(Constant.BLACK_CLASS);
                }
            });
        });
    }





}



export default Stage;