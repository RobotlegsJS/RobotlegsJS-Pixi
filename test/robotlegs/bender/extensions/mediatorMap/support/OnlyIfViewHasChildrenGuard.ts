// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Sprite } from "pixi.js";

import { injectable, inject, IGuard } from "@robotlegsjs/core";

@injectable()
export class OnlyIfViewHasChildrenGuard implements IGuard {
    @inject(Sprite)
    public view: Sprite;

    public approve(): boolean {
        return this.view.children.length > 0;
    }
}
