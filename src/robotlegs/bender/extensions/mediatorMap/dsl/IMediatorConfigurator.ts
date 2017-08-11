// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IGuard,
    IHook
} from "@robotlegsjs/core";

/**
 * Configures a mediator mapping
 */
export interface IMediatorConfigurator {
    /**
     * Guards to check before allowing a mediator to be created
     * @param guards Guards
     * @return Self
     */
    withGuards(...guards: IGuard[]): IMediatorConfigurator;

    /**
     * Hooks to run before a mediator is created
     * @param hooks Hooks
     * @return Self
     */
    withHooks(...hooks: IHook[]): IMediatorConfigurator;

    /**
     * Should the mediator be removed when the mediated item looses scope?
     *
     * <p>Usually this would be when the mediated item is a Display Object
     * and it leaves the stage.</p>
     *
     * @param value Boolean
     * @return Self
     */
    autoRemove(value: boolean): IMediatorConfigurator;
}
