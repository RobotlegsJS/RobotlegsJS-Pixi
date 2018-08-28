// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IDisplayObjectContainer } from "./IDisplayObjectContainer";

export const IDisplayObject = Symbol("IDisplayObject");
export interface IDisplayObject {
    parent: IDisplayObjectContainer;
}
