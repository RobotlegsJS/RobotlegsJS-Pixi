// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import { DisplayObject } from "pixi.js";

import { MediatorWatcher } from "./MediatorWatcher";

@injectable()
export class ExampleDisplayObjectMediator {
    @inject(MediatorWatcher) public mediatorWatcher: MediatorWatcher;

    @inject(DisplayObject) public view: DisplayObject;

    public initialize(): void {
        this.mediatorWatcher.notify("ExampleDisplayObjectMediator");
    }
}
