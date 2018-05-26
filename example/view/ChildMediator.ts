import { ChildView } from "./ChildView";
import { Mediator } from "../../src/index";

export class ChildMediator extends Mediator<ChildView> {
    public initialize(): void {
        console.log("ChildMediator initialized!");
        this.view.interactive = true;
        this.addViewListener("click", this.onClick, this);
    }

    public onClick(e: any): void {
        this.view.parent.removeChild(this.view);
    }

    public destroy(): void {
        console.log("ChildMediator destroyed!");
    }
}
