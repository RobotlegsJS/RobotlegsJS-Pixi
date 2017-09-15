// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { DisplayObject } from "pixi.js";

import { IMediatorMapping } from "../api/IMediatorMapping";
import { MediatorFactory } from "./MediatorFactory";

/**
 * @private
 */
export class MediatorManager {

    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    private static UIComponentClass: FunctionConstructor;

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
        let displayObject: DisplayObject = <DisplayObject>item;

        // Watch Display Object for removal
        if (displayObject && mapping.autoRemoveEnabled) {
            item._onRemovedFromStage = this.onRemovedFromStage.bind(this, item);
            displayObject.on("removed", item._onRemovedFromStage, this);
        }

        // Synchronize with item life-cycle
        this.initializeMediator(mediator, item);
    }

    /**
     * @private
     */
    public removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        if (item instanceof DisplayObject) {
            (<DisplayObject>item).off("removed", (<any>item)._onRemovedFromStage);
        }

        this.destroyMediator(mediator);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRemovedFromStage(displayObject: any, fromContainer: any): void {
        this._factory.removeMediators(displayObject);
    }

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
