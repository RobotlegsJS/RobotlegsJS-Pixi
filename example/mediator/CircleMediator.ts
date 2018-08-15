// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src";

import { CircleView } from "../view/CircleView";
import { ChildView } from "../view/ChildView";

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
