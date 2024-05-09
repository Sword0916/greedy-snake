import {CELL_TYPE, FOOD_CLASS, SNAKE_CLASS} from "./Constant";

class Cell {
    private _element: HTMLElement;
    private _type: CELL_TYPE;

    constructor(stage: HTMLElement) {
        this._element = document.createElement("div");
        this._type = CELL_TYPE.Empty;
        stage.appendChild(this._element);
    }

    get type() {
        return this._type;
    }

    set type(type) {
        if(type !== this._type) {
            //类型不同再修改
            this._type = type;
            this._updateElementClass();
        }
    }

    private _updateElementClass() {
        if(this._type === CELL_TYPE.Empty) {
            this._element.classList.contains(SNAKE_CLASS) && this._element.classList.remove(SNAKE_CLASS);
            this._element.classList.contains(FOOD_CLASS) && this._element.classList.remove(FOOD_CLASS);
        } else if(this._type === CELL_TYPE.Snake) {
            this._element.classList.contains(FOOD_CLASS) && this._element.classList.remove(FOOD_CLASS);
            this._element.classList.add(SNAKE_CLASS);
        } else if(this._type === CELL_TYPE.Food) {
            this._element.classList.contains(SNAKE_CLASS) && this._element.classList.remove(SNAKE_CLASS);
            this._element.classList.add(FOOD_CLASS);
        } else if(this._type === CELL_TYPE.Wall) {
            //
        }
    }

}


export default Cell;
