// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IDisplayObjectContainer } from "../../../displayList/api/IDisplayObjectContainer";

import { IViewHandler } from "../api/IViewHandler";

/**
 * Container existence event
 * @private
 */
export class ViewManagerEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONTAINER_ADD: string = "containerAdd";

    public static CONTAINER_REMOVE: string = "containerRemove";

    public static HANDLER_ADD: string = "handlerAdd";

    public static HANDLER_REMOVE: string = "handlerRemove";

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _container: IDisplayObjectContainer;

    /**
     * The container associated with this event
     */
    public get container(): IDisplayObjectContainer {
        return this._container;
    }

    private _handler: IViewHandler;

    /**
     * The view handler associated with this event
     */
    public get handler(): IViewHandler {
        return this._handler;
    }

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a view manager event
     * @param type The event type
     * @param container The container associated with this event
     * @param handler The view handler associated with this event
     */
    constructor(type: string, container?: IDisplayObjectContainer, handler?: IViewHandler) {
        super(type);
        this._container = container;
        this._handler = handler;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ViewManagerEvent {
        return new ViewManagerEvent(this.type, this._container, this._handler);
    }
}
