// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

import { injectable, inject, EventDispatcher } from "@robotlegsjs/core";

import { contains } from "./contains";

import { IViewHandler } from "../api/IViewHandler";
import { IViewManager } from "../api/IViewManager";

import { ViewManagerEvent } from "./ViewManagerEvent";

import { ContainerRegistry } from "../impl/ContainerRegistry";
import { ContainerBinding } from "../impl/ContainerBinding";

/*[Event(name="containerAdd", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="containerRemove", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="handlerAdd", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/
/*[Event(name="handlerRemove", type="robotlegs.bender.extensions.viewManager.impl.ViewManagerEvent")]*/

/**
 * @private
 */
@injectable()
export class ViewManager extends EventDispatcher implements IViewManager {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _containers: Container[] = [];

    /**
     * @inheritDoc
     */
    public get containers(): Container[] {
        return this._containers;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _handlers: IViewHandler[] = [];

    private _registry: ContainerRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(
        @inject(ContainerRegistry) containerRegistry: ContainerRegistry
    ) {
        super();
        this._registry = containerRegistry;
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public addContainer(container: Container): void {
        if (!this.validContainer(container)) {
            return;
        }

        this._containers.push(container);
        this._handlers.forEach(handler => {
            this._registry.addContainer(container).addHandler(handler);
        });

        this.dispatchEvent(
            new ViewManagerEvent(ViewManagerEvent.CONTAINER_ADD, container)
        );
    }

    /**
     * @inheritDoc
     */
    public removeContainer(container: Container): void {
        let index: number = this._containers.indexOf(container);

        if (index === -1) {
            return;
        }

        this._containers.splice(index, 1);

        let binding: ContainerBinding = this._registry.getBinding(container);

        this._handlers.forEach(handler => {
            binding.removeHandler(handler);
        });

        this.dispatchEvent(
            new ViewManagerEvent(ViewManagerEvent.CONTAINER_REMOVE, container)
        );
    }

    /**
     * @inheritDoc
     */
    public addViewHandler(handler: IViewHandler): void {
        if (this._handlers.indexOf(handler) !== -1) {
            return;
        }

        this._handlers.push(handler);
        this._containers.forEach(container => {
            this._registry.addContainer(container).addHandler(handler);
        });

        this.dispatchEvent(
            new ViewManagerEvent(ViewManagerEvent.HANDLER_ADD, null, handler)
        );
    }

    /**
     * @inheritDoc
     */
    public removeViewHandler(handler: IViewHandler): void {
        let index: number = this._handlers.indexOf(handler);

        if (index === -1) {
            return;
        }

        this._handlers.splice(index, 1);

        this._containers.forEach(container => {
            this._registry.getBinding(container).removeHandler(handler);
        });

        this.dispatchEvent(
            new ViewManagerEvent(ViewManagerEvent.HANDLER_REMOVE, null, handler)
        );
    }

    /**
     * @inheritDoc
     */
    public removeAllHandlers(): void {
        let binding: ContainerBinding = null;
        this._containers.forEach(container => {
            binding = this._registry.getBinding(container);
            this._handlers.forEach(handler => {
                binding.removeHandler(handler);
            });
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private validContainer(container: Container): boolean {
        let isValid: boolean = this._containers.indexOf(container) < 0;

        if (isValid) {
            this._containers.forEach(registeredContainer => {
                if (
                    contains(registeredContainer, container) ||
                    contains(container, registeredContainer)
                ) {
                    throw new Error("Containers can not be nested");
                }
            });
        }

        return isValid;
    }
}
