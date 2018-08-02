// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named, optional } from "@robotlegsjs/core";

@injectable()
export class CallbackMediator {
    @inject("Function")
    @named("executeCallback")
    @optional()
    public callback: Function;

    public initialize(): void {
        if (this.callback) {
            this.callback(this);
        }
    }

    public destroy(): void {}
}
