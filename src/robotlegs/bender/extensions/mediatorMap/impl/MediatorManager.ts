// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IDisplayObject } from "../../../displayList/api/IDisplayObject";
import { IDisplayObjectObserver } from "../../../displayList/api/IDisplayObjectObserver";
import { IDisplayObjectObserverFactory } from "../../../displayList/api/IDisplayObjectObserverFactory";

import { IMediatorMapping } from "../api/IMediatorMapping";
import { MediatorFactory } from "./MediatorFactory";

/**
 * @private
 */
export class MediatorManager {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _mediatorFactory: MediatorFactory;
    private _displayObjectObserverFactory: IDisplayObjectObserverFactory;

    private _observers: Map<IDisplayObject, IDisplayObjectObserver> = new Map();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(factory: MediatorFactory, displayObjectObserverFactory: IDisplayObjectObserverFactory) {
        this._mediatorFactory = factory;
        this._displayObjectObserverFactory = displayObjectObserverFactory;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        const displayObject: IDisplayObject = <IDisplayObject>item;

        // Watch Display Object for removal
        if (displayObject !== undefined && mapping.autoRemoveEnabled) {
            if (!this._observers.has(displayObject)) {
                let observer: IDisplayObjectObserver = this._displayObjectObserverFactory(displayObject, false);
                observer.addRemovedFromStageHandler(this.onRemovedFromStage);
                this._observers.set(displayObject, observer);
            }
        }

        // Synchronize with item life-cycle
        this.initializeMediator(mediator, item);
    }

    /**
     * @private
     */
    public removeMediator(mediator: any, item: any, mapping: IMediatorMapping): void {
        const displayObject: IDisplayObject = <IDisplayObject>item;

        // Watch Display Object for removal
        if (displayObject !== undefined && mapping.autoRemoveEnabled) {
            if (this._observers.has(displayObject)) {
                let observer = this._observers.get(displayObject);
                observer.destroy();
                this._observers.delete(displayObject);
            }
        }

        this.destroyMediator(mediator);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRemovedFromStage = (view: IDisplayObject): void => {
        this._mediatorFactory.removeMediators(view);
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
