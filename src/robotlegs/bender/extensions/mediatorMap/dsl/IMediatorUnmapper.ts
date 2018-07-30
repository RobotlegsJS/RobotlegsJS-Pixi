// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

/**
 * Unmaps a Mediator
 */
export interface IMediatorUnmapper {
    /**
     * Unmaps a mediator from this matcher
     * @param mediatorClass Mediator to unmap
     */
    fromMediator(mediatorClass: IClass<any>): void;

    /**
     * Unmaps all mediator mappings for this matcher
     */
    fromAll(): void;
}
