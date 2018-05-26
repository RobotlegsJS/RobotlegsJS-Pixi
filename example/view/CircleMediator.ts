import { CircleView } from "./CircleView";
import { Mediator } from "../../src/index";
import { ChildView } from "./ChildView";

export class CircleMediator extends Mediator<CircleView> {
    public initialize(): void {
        console.log("CircleMediator initialized!");
        this.view.interactive = true;
        this.addViewListener("click", this.onClick, this);
    }

    public onClick(e: any): void {
        this.view.parent.addChild(new ChildView());
    }

    public destroy(): void {
        console.log("CircleMediator destroyed!");
    }
}
