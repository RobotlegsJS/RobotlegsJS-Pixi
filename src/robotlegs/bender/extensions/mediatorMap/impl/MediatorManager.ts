// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IMediatorMapping } from "../api/IMediatorMapping";
import { MediatorFactory } from "./MediatorFactory";

/**
 * @private
 */
export class MediatorManager {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _factory: MediatorFactory;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: MediatorFactory) {
        this._factory = factory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        // Watch Display Object for removal
        if (item.addEventListener !== undefined && mapping.autoRemoveEnabled) {
            item.addEventListener("removedFromStage", this.onRemovedFromStage);
        }

        // Synchronize with item life-cycle
        this.initializeMediator(mediator, item);
    }

    /**
     * @private
     */
    public removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        // Watch Display Object for removal
        if (item.removeEventListener !== undefined && mapping.autoRemoveEnabled) {
            item.removeEventListener("removedFromStage", this.onRemovedFromStage);
        }

        this.destroyMediator(mediator);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRemovedFromStage = (event: Event): void => {
        this._factory.removeMediators(event.target);
    };

    private initializeMediator(mediator: any, mediatedItem: any): void {
        if ("preInitialize" in mediator) {
            mediator.preInitialize();
        }

        if ("view" in mediator) {
            mediator.view = mediatedItem;
        }

        if ("initialize" in mediator) {
            mediator.initialize();
        }

        if ("postInitialize" in mediator) {
            mediator.postInitialize();
        }
    }

    private destroyMediator(mediator: any): void {
        if ("preDestroy" in mediator) {
            mediator.preDestroy();
        }

        if ("destroy" in mediator) {
            mediator.destroy();
        }

        if ("view" in mediator) {
            mediator.view = null;
        }

        if ("postDestroy" in mediator) {
            mediator.postDestroy();
        }
    }
}
