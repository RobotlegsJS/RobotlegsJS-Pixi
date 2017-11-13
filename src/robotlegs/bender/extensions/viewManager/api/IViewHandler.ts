// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { DisplayObject } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

/**
 * View handler contract
 */
export interface IViewHandler {
    /**
     * View handler method
     * @param view The view instance to handle
     * @param type The class of the view instance
     */
    handleView(view: DisplayObject, type: IClass<any>): void;
}
