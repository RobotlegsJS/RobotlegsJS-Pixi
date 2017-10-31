// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";

/**
 * @private
 */
export class CallbackViewHandler implements IViewHandler {
    private _callback: Function;

    constructor(callback: Function = null) {
        this._callback = callback;
    }

    public handleView(view: Container, type: FunctionConstructor): void {
        if (this._callback) {
            this._callback(view, type);
        }
    }
}
