// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container, DisplayObject } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

import { ContainerRegistry } from "./ContainerRegistry";
import { ContainerBinding } from "./ContainerBinding";

import { ConfigureViewEvent } from "./ConfigureViewEvent";

/**
 * @private
 */
export class ManualStageObserver {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _registry: ContainerRegistry;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * @private
     */
    constructor(containerRegistry: ContainerRegistry) {
        this._registry = containerRegistry;

        // We care about all containers (not just roots)
        this._registry.addEventListener(ContainerRegistryEvent.CONTAINER_ADD, this.onContainerAdd, this);
        this._registry.addEventListener(ContainerRegistryEvent.CONTAINER_REMOVE, this.onContainerRemove, this);

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
        this._registry.removeEventListener(ContainerRegistryEvent.CONTAINER_ADD, this.onContainerAdd, this);
        this._registry.removeEventListener(ContainerRegistryEvent.CONTAINER_REMOVE, this.onContainerRemove, this);

        this._registry.rootBindings.forEach((binding: ContainerBinding) => {
            this.removeContainerListener(binding.container);
        });
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onContainerAdd(event: ContainerRegistryEvent): void {
        this.addContainerListener(event.container);
    }

    private onContainerRemove(event: ContainerRegistryEvent): void {
        this.removeContainerListener(event.container);
    }

    private addContainerListener(container: Container): void {
        // We're interested in ALL container bindings
        // but just for normal, bubbling events
        container.addEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView, this);
    }

    private removeContainerListener(container: Container): void {
        container.removeEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView, this);
    }

    private onConfigureView(event: ConfigureViewEvent): void {
        // Stop that event!
        event.stopPropagation();

        let container: Container = <Container>event.currentTarget;
        let view: DisplayObject = <DisplayObject>event.target;
        let type: IClass<any> = <IClass<any>>view.constructor;
        this._registry.getBinding(container).handleView(view, type);
    }
}
