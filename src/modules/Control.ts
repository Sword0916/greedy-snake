import Game from "./Game";
import Position from "./Position";

class Control {
    private _game: Game;
    private _isCreated: boolean = false;
    
    constructor(game: Game) {
        this._game = game;
    }

    createControl() {
        if(!this._isCreated) {
            document.addEventListener('keydown', (e) => {
                this._turn(e);
            });

            // document.addEventListener("visibilitychange", () => {
            //     if (document.visibilityState === "visible") {
            //         this._game.pause();
            //     }
            // });
        }
    }

    private _turn(event: KeyboardEvent) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this._game.snake.turn(new Position(0, -1));
                break;

            case 'ArrowRight':
            case 'd':
                this._game.snake.turn(new Position(1, 0));
                break;

            case 'ArrowDown':
            case 's':
                this._game.snake.turn(new Position(0, 1));
                break;

            case 'ArrowLeft':
            case 'a':
                this._game.snake.turn(new Position(-1, 0));
                break;

            case 'Enter':
                this._game.start();
                break;

            case 'r':
                this._game.reStart();
                break;

            case 'p':
                this._game.isPause? this._game.play() : this._game.pause();
                break;
        }
    }
}


export default Control;