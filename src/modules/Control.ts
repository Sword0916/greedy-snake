import Game from "./Game";
import Snake from "./Snake";
import Position from "./Position";

class Control{
    private _game: Game;

    constructor(game: Game) {
        this._game = game;

        this.init();
    }

    private init() {
        document.addEventListener('keydown', (e) => {
            this.turn(e);
        });
    }

    private turn(event: KeyboardEvent){
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
        }
    }





}


export default Control;