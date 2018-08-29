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

import { ContainerBinding } from "./ContainerBinding";
import { ContainerRegistry } from "./ContainerRegistry";
import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

/**
 * @private
 */
export class StageObserver {
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

        // We only care about roots
        this._registry.addEventListener(ContainerRegistryEvent.ROOT_CONTAINER_ADD, this.onRootContainerAdd);
        this._registry.addEventListener(ContainerRegistryEvent.ROOT_CONTAINER_REMOVE, this.onRootContainerRemove);

        // We might have arrived late on the scene
        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this.addRootListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public destroy(): void {
        if (this._registry) {
            this._registry.removeEventListener(ContainerRegistryEvent.ROOT_CONTAINER_ADD, this.onRootContainerAdd);
            this._registry.removeEventListener(ContainerRegistryEvent.ROOT_CONTAINER_REMOVE, this.onRootContainerRemove);

            this._registry.rootBindings.forEach((binding: ContainerBinding) => {
                this.removeRootListener(binding.container);
            });
        }

        if (this._observers) {
            this._observers.forEach((observer: IDisplayObjectObserver) => {
                observer.destroy();
            });
        }

        this._registry = null;
        this._displayObjectObserverFactory = null;
        this._observers = null;
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onRootContainerAdd = (event: ContainerRegistryEvent): void => {
        this.addRootListener(event.container);
    };

    private onRootContainerRemove = (event: ContainerRegistryEvent): void => {
        this.removeRootListener(event.container);
    };

    private addRootListener(container: IDisplayObjectContainer): void {
        if (!this._observers.has(container)) {
            let observer: IDisplayObjectObserver = this._displayObjectObserverFactory(container, true);
            observer.addAddedToStageHandler(this.onViewAddedToStage);
            this._observers.set(container, observer);
        }
    }

    private removeRootListener(container: IDisplayObjectContainer): void {
        if (this._observers.has(container)) {
            let observer: IDisplayObjectObserver = this._observers.get(container);
            observer.destroy();
            this._observers.delete(container);
        }
    }

    private onViewAddedToStage = (view: IDisplayObjectContainer): void => {
        let type: IClass<any> = <IClass<any>>view.constructor;

        // Walk upwards from the nearest binding
        let binding: ContainerBinding = this._registry.findParentBinding(view);
        while (binding) {
            binding.handleView(view, type);
            binding = binding.parent;
        }
    };
}
