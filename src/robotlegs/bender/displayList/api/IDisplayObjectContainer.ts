// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IDisplayObject } from "./IDisplayObject";

export const IDisplayObjectContainer = Symbol("IDisplayObjectContainer");
export interface IDisplayObjectContainer extends IDisplayObject {
    children?: IDisplayObject[];

    numChildren?: number;
    getChildAt?(index: number): IDisplayObject;

    contains(child: IDisplayObject): boolean;
}
