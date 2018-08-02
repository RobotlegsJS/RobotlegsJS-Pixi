// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, named, optional } from "@robotlegsjs/core";

@injectable()
export class LifecycleReportingMediator {
    @inject("Function")
    @named("preInitializeCallback")
    @optional()
    public preInitializeCallback: Function;

    @inject("Function")
    @named("initializeCallback")
    @optional()
    public initializeCallback: Function;

    @inject("Function")
    @named("postInitializeCallback")
    @optional()
    public postInitializeCallback: Function;

    @inject("Function")
    @named("preDestroyCallback")
    @optional()
    public preDestroyCallback: Function;

    @inject("Function")
    @named("destroyCallback")
    @optional()
    public destroyCallback: Function;

    @inject("Function")
    @named("postDestroyCallback")
    @optional()
    public postDestroyCallback: Function;

    public initialized: Boolean = false;

    public destroyed: Boolean = false;

    public view: any = undefined;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    public preInitialize(): void {
        if (this.preInitializeCallback) {
            this.preInitializeCallback("preInitialize");
        }
    }

    public initialize(): void {
        this.initialized = true;
        if (this.initializeCallback) {
            this.initializeCallback("initialize");
        }
    }

    public postInitialize(): void {
        if (this.postInitializeCallback) {
            this.postInitializeCallback("postInitialize");
        }
    }

    public preDestroy(): void {
        if (this.preDestroyCallback) {
            this.preDestroyCallback("preDestroy");
        }
    }

    public destroy(): void {
        this.destroyed = true;
        if (this.destroyCallback) {
            this.destroyCallback("destroy");
        }
    }

    public postDestroy(): void {
        if (this.postDestroyCallback) {
            this.postDestroyCallback("postDestroy");
        }
    }
}
