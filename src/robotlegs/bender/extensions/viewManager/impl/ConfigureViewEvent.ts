// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { Container } from "pixi.js";

/**
 * View Configuration Event
 * @private
 */
export class ConfigureViewEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONFIGURE_VIEW: string = "configureView";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _view: Container;

    /**
     * The view instance associated with this event
     */
    public get view(): Container {
        return this._view;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a view configuration event
     * @param type The event type
     * @param view The associated view instance
     */
    constructor(type: string, view: Container) {
        super(type, { bubbles: true });
        this._view = view;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ConfigureViewEvent {
        return new ConfigureViewEvent(this.type, this._view);
    }
}
