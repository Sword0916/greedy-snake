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
        if (type !== this._type) {
            //类型不同再修改
            this._updateElementClass(this._type, type);
            this._type = type;
        }
    }

    private _updateElementClass(oldType: CELL_TYPE, newType: CELL_TYPE) {
        if (oldType !== CELL_TYPE.Empty) {
            this._element.classList.remove(
                oldType === CELL_TYPE.Food ?
                    FOOD_CLASS : SNAKE_CLASS
            );
        }

        if (newType !== CELL_TYPE.Empty) {
            this._element.classList.add(
                newType === CELL_TYPE.Food ?
                    FOOD_CLASS : SNAKE_CLASS
            );
        }
    }

}


export default Cell;
