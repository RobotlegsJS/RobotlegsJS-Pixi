// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IDisplayObject } from "./IDisplayObject";
import { IDisplayObjectObserver } from "./IDisplayObjectObserver";

/**
 *
 */
export const IDisplayObjectObserverFactory = Symbol("IDisplayObjectObserverFactory");
export type IDisplayObjectObserverFactory = (view: IDisplayObject, useCapture: boolean) => IDisplayObjectObserver;
