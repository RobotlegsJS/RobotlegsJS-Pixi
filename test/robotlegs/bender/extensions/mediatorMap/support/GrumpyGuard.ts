// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable } from "inversify";

import { IGuard } from "@robotlegsjs/core";

@injectable()
export class GrumpyGuard implements IGuard {
    public approve(): boolean {
        return false;
    }
}
