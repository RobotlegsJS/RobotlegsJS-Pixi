// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named } from "@robotlegsjs/core";

@injectable()
export class RectangleMediator {
    @inject(Number)
    @named("width")
    public width: number;

    @inject(Number)
    @named("height")
    public height: number;
}
