//游戏参数
export interface GameOptions {
    readonly container: HTMLElement,
    readonly x?: number,
    readonly y?: number,
    maxLevel?: number,
    upScore?: number,
    onGameStart?: () => void,
    onGameOver?: (msg: string) => void,
    onGamePause?: () => void,
    onGamePlay?: () => void,
    onAddScore?: (score: number) => void,
    onLevelUp?: (level: number) => void
}


