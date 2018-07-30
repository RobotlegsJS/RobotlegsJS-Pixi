// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IMediatorConfigurator } from "./IMediatorConfigurator";

/**
 * Maps a matcher to a concrete Mediator class
 */
export interface IMediatorMapper {
    /**
     * Maps a matcher to a concrete Mediator class
     * @param mediatorClass The concrete mediator class
     * @return Mapping configurator
     */
    toMediator(mediatorClass: IClass<any>): IMediatorConfigurator;
}
