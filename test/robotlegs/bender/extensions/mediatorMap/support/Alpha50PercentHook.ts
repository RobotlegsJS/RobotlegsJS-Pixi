// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Sprite } from "pixi.js";

import { injectable, inject } from "inversify";

import { IHook } from "@robotlegsjs/core";

@injectable()
export class Alpha50PercentHook implements IHook {
    @inject(Sprite) public view: Sprite;

    public hook(): void {
        this.view.alpha = 0.5;
    }
}
