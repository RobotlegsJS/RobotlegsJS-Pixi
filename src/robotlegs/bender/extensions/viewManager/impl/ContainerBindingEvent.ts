// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

/**
 * @private
 */
export class ContainerBindingEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static BINDING_EMPTY: string = "bindingEmpty";

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(type: string) {
        super(type);
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ContainerBindingEvent {
        return new ContainerBindingEvent(this.type);
    }
}
