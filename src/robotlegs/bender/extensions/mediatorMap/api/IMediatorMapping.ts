// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass, ITypeFilter } from "@robotlegsjs/core";

/**
 * Represents a Mediator mapping
 */
export interface IMediatorMapping {
    /**
     * The matcher for this mapping
     */
    matcher: ITypeFilter;

    /**
     * The concrete mediator class
     */
    mediatorClass: IClass<any>;

    /**
     * A list of guards to check before allowing mediator creation
     */
    guards: any[];

    /**
     * A list of hooks to run before creating a mediator
     */
    hooks: any[];

    /**
     * Should the mediator be removed when the mediated item looses scope?
     */
    autoRemoveEnabled: boolean;
}
