// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IDisplayObject } from "../../../displayList/api/IDisplayObject";

/**
 * View handler contract
 */
export interface IViewHandler {
    /**
     * View handler method
     * @param view The view instance to handle
     * @param type The class of the view instance
     */
    handleView(view: IDisplayObject, type: IClass<any>): void;
}
