// 引入样式
import './style/index.less'
import Game from "./modules/Game";


const game = new Game({
    container: document.getElementById("stage")!,
    x: 10,
    y: 10,
    onGameStart: () => {
        console.log("游戏开始");
    },
    onGameOver: (msg: string) => {
        alert(msg);
    },
    onGamePause: () => {
        console.log("游戏暂停");
    },
    onGamePlay: () => {
        console.log("游戏继续");
    },
    onAddScore: (score) => {
        const element = document.getElementById("score")!;
        element.innerText = score + '';
    },
    onLevelUp: (level) => {
        const element = document.getElementById("level")!;
        element.innerText = level + '';
    }
});


