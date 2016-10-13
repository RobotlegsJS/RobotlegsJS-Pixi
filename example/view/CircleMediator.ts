import { inject } from "robotlegs";
import { CircleView } from "./CircleView"
import { Mediator } from "../../src/index";

export class CircleMediator extends Mediator {

    @inject(CircleView)
    view: CircleView;

    initialize()
    {
        console.log("CircleMediator initialized!");
        this.view.interactive = true;
        this.addViewListener("click", this.onClick, this);
    }

    onClick (e) {
        console.log("clicked!");
    }

    destroy () {
        console.log("CircleMediator destroyed!");
    }

}
