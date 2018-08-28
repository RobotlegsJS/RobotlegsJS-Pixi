// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IDisplayObjectContainer } from "../../../displayList/api/IDisplayObjectContainer";

/**
 * Container existence event
 * @private
 */
export class ContainerRegistryEvent extends Event {
    /*============================================================================*/
    /* Public Static Properties                                                   */
    /*============================================================================*/

    public static CONTAINER_ADD: string = "containerAdd";

    public static CONTAINER_REMOVE: string = "containerRemove";

    public static ROOT_CONTAINER_ADD: string = "rootContainerAdd";

    public static ROOT_CONTAINER_REMOVE: string = "rootContainerRemove";

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

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * Creates a new container existence event
     * @param type The event type
     * @param container The container associated with this event
     */
    constructor(type: string, container: IDisplayObjectContainer) {
        super(type);
        this._container = container;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public clone(): ContainerRegistryEvent {
        return new ContainerRegistryEvent(this.type, this._container);
    }
}
