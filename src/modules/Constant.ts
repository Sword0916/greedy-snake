export const STEP = 10;//步长
export const SNAKE_CLASS = "snake";//蛇的class
export const FOOD_CLASS = "food";//食物的class
export const TICK_DURATION = 500;//渲染时间间隔
//单元格类型
export const enum CELL_TYPE {
    Empty,
    Snake,
    Food,
    Wall//墙壁（面板中的障碍物，增加难度使用，暂时用不到。）
}

