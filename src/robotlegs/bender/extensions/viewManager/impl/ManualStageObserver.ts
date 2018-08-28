// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IClass } from "@robotlegsjs/core";

import { IDisplayObject } from "../../../displayList/api/IDisplayObject";
import { IDisplayObjectContainer } from "../../../displayList/api/IDisplayObjectContainer";

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
        container.addEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView);
    }

    private removeContainerListener(container: IDisplayObjectContainer): void {
        container.removeEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView);
    }

    private onConfigureView = (event: ConfigureViewEvent): void => {
        // Stop that event!
        event.stopPropagation();

        let container: IDisplayObjectContainer = <IDisplayObjectContainer>event.currentTarget;
        let view: IDisplayObject = <IDisplayObject>event.target;
        let type: IClass<any> = <IClass<any>>view.constructor;
        this._registry.getBinding(container).handleView(view, type);
    };
}
