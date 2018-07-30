// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import { DisplayObject } from "pixi.js";

@injectable()
export class ViewInjectedAsRequestedMediator {
    @inject(DisplayObject)
    public mediatedItem: DisplayObject;

    public initialize(): void {}

    public destroy(): void {}
}
