// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src";

import { ChildView } from "../view/ChildView";

export class RobotlegsMediator extends Mediator<ChildView> {
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
