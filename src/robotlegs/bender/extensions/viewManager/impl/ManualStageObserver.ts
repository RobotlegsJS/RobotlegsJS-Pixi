// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IDisplayObject } from "../../../displayList/api/IDisplayObject";
import { IDisplayObjectContainer } from "../../../displayList/api/IDisplayObjectContainer";
import { IDisplayObjectObserver } from "../../../displayList/api/IDisplayObjectObserver";
import { IDisplayObjectObserverFactory } from "../../../displayList/api/IDisplayObjectObserverFactory";

import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

import { ContainerRegistry } from "./ContainerRegistry";
import { ContainerBinding } from "./ContainerBinding";

/**
 * @private
 */
export class ManualStageObserver {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _registry: ContainerRegistry;

    private _displayObjectObserverFactory: IDisplayObjectObserverFactory;

    private _observers: Map<IDisplayObject, IDisplayObjectObserver> = new Map();

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerRegistry: ContainerRegistry, displayObjectObserverFactory: IDisplayObjectObserverFactory) {
        this._registry = containerRegistry;
        this._displayObjectObserverFactory = displayObjectObserverFactory;

        // We care about all containers (not just roots)
        this._registry.addEventListener(ContainerRegistryEvent.CONTAINER_ADD, this.onContainerAdd);
        this._registry.addEventListener(ContainerRegistryEvent.CONTAINER_REMOVE, this.onContainerRemove);

        // We might have arrived late on the scene
        this._registry.bindings.forEach((binding: ContainerBinding) => {
            this.addContainerListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        this._registry.removeEventListener(ContainerRegistryEvent.CONTAINER_ADD, this.onContainerAdd);
        this._registry.removeEventListener(ContainerRegistryEvent.CONTAINER_REMOVE, this.onContainerRemove);

        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this.removeContainerListener(binding.container);
        });

        this._registry = null;
        this._displayObjectObserverFactory = null;
        this._observers = null;
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onContainerAdd = (event: ContainerRegistryEvent): void => {
        this.addContainerListener(event.container);
    };

    private onContainerRemove = (event: ContainerRegistryEvent): void => {
        this.removeContainerListener(event.container);
    };

    private addContainerListener(container: IDisplayObjectContainer): void {
        // We're interested in ALL container bindings
        // but just for normal, bubbling events
        let observer: IDisplayObjectObserver = this._displayObjectObserverFactory(container, false);

        observer.addConfigureViewHandler(this.onConfigureView);

        this._observers.set(container, observer);
    }

    private removeContainerListener(container: IDisplayObjectContainer): void {
        let observer: IDisplayObjectObserver = this._observers.get(container);

        observer.destroy();

        this._observers.delete(container);
    }

    private onConfigureView = (container: IDisplayObjectContainer, view: IDisplayObject): void => {
        let type: IClass<any> = <IClass<any>>view.constructor;
        this._registry.getBinding(container).handleView(view, type);
    };
}
