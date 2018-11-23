// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IDisplayObject } from "./IDisplayObject";

/**
 *
 */
export interface IDisplayObjectObserver {
    displayObject: IDisplayObject;

    addAddedToStageHandler(handler: Function): void;

    addRemovedFromStageHandler(handler: Function): void;

    addConfigureViewHandler(handler: Function): void;

    destroy(): void;
}
