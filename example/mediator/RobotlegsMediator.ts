// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Mediator } from "../../src";

import { RobotlegsView } from "../view/RobotlegsView";
import { SmileyView } from "../view/SmileyView";

export class RobotlegsMediator extends Mediator<RobotlegsView> {
    public initialize(): void {
        console.log("CircleMediator initialized!");
        this.view.interactive = true;
        this.addViewListener("click", this.onClick, this);
    }

    public onClick(e: any): void {
        let radius: number = 50 + Math.random() * 50;
        this.view.parent.addChild(new SmileyView(radius));
    }

    public destroy(): void {
        console.log("CircleMediator destroyed!");
    }
}
