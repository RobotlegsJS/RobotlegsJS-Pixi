// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject } from "inversify";

import {
    IEventMap,
    IEventDispatcher,
    Event
} from "robotlegs";

import { IMediator } from "../api/IMediator";

/**
 * Classic Robotlegs mediator implementation
 *
 * <p>Override initialize and destroy to hook into the mediator lifecycle.</p>
 */
@injectable()
export abstract class Mediator<T extends IEventDispatcher> implements IMediator {

    /*============================================================================*/
    /* Protected Properties                                                       */
    /*============================================================================*/

    @inject(IEventMap)
    protected eventMap: IEventMap;

    @inject(IEventDispatcher)
    protected eventDispatcher: IEventDispatcher;

    protected _viewComponent: T;

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    public set view(view: T) {
        this._viewComponent = view;
    }

    public get view(): T {
        return this._viewComponent;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public abstract initialize(): void;

    /**
     * @inheritDoc
     */
    public abstract destroy(): void;

    /**
     * Runs after the mediator has been destroyed.
     * Cleans up listeners mapped through the local EventMap.
     */
    public postDestroy(): void {
        this.eventMap.unmapListeners();
    }

    /*============================================================================*/
    /* Protected Functions                                                        */
    /*============================================================================*/

    protected addViewListener(eventString: string, listener: Function, eventClass?: Object): void {
        this.eventMap.mapListener(this._viewComponent, eventString, listener, eventClass);
    }

    protected addContextListener(eventString: string, listener: Function, eventClass?: Object): void {
        this.eventMap.mapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected removeViewListener(eventString: string, listener: Function, eventClass?: Object): void {
        this.eventMap.unmapListener(this._viewComponent, eventString, listener, eventClass);
    }

    protected removeContextListener(eventString: string, listener: Function, eventClass?: Object): void {
        this.eventMap.unmapListener(this.eventDispatcher, eventString, listener, eventClass);
    }

    protected dispatch(event: Event): void {
        if (this.eventDispatcher.hasEventListener(event.type)) {
            this.eventDispatcher.dispatchEvent(event);
        }
    }
}
