// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Sprite } from "pixi.js";

import { injectable, inject, named, optional } from "inversify";

import { IHook } from "@robotlegsjs/core";

import { ViewInjectedMediator } from "./ViewInjectedMediator";

@injectable()
export class MediatorHook implements IHook {
    @inject("Function")
    @named("callback")
    @optional()
    public callback: Function;

    @inject(Sprite)
    public mediatedItem: Sprite;

    @inject(ViewInjectedMediator)
    public mediator: ViewInjectedMediator;

    public hook(): void {
        if (this.callback) {
            this.callback(this);
        }
    }
}
