// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { EventDispatcher } from "@robotlegsjs/core";

import { IDisplayObjectContainer } from "../../../displayList/api/IDisplayObjectContainer";

import { ContainerBinding } from "./ContainerBinding";
import { ContainerBindingEvent } from "./ContainerBindingEvent";
import { ContainerRegistryEvent } from "./ContainerRegistryEvent";

/*[Event(name="containerAdd", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]*/
/*[Event(name="containerRemove", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]*/
/*[Event(name="rootContainerAdd", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]*/
/*[Event(name="rootContainerRemove", type="robotlegs.bender.extensions.viewManager.impl.ContainerRegistryEvent")]*/

/**
 * @private
 */
export class ContainerRegistry extends EventDispatcher {
    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    private _bindings: ContainerBinding[] = [];

    /**
     * @private
     */
    public get bindings(): ContainerBinding[] {
        return this._bindings;
    }

    private _rootBindings: ContainerBinding[] = [];

    /**
     * @private
     */
    public get rootBindings(): ContainerBinding[] {
        return this._rootBindings;
    }

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _bindingByContainer: Map<IDisplayObjectContainer, ContainerBinding> = new Map<IDisplayObjectContainer, ContainerBinding>();

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @private
     */
    public addContainer(container: IDisplayObjectContainer): ContainerBinding {
        let binding = this._bindingByContainer.get(container);
        if (!binding) {
            binding = this.createBinding(container);
            this._bindingByContainer.set(container, binding);
        }
        return binding;
    }

    /**
     * @private
     */
    public removeContainer(container: IDisplayObjectContainer): ContainerBinding {
        let binding: ContainerBinding = this._bindingByContainer.get(container);

        if (binding) {
            this.removeBinding(binding);
        }

        return binding;
    }

    /**
     * Finds the closest parent binding for a given display object
     *
     * @private
     */
    public findParentBinding(target: IDisplayObjectContainer): ContainerBinding {
        let parent: IDisplayObjectContainer = target.parent;
        while (parent) {
            let binding: ContainerBinding = this._bindingByContainer.get(parent);
            if (binding) {
                return binding;
            }
            parent = parent.parent;
        }
        return null;
    }

    /**
     * @private
     */
    public getBinding(container: IDisplayObjectContainer): ContainerBinding {
        return this._bindingByContainer.get(container);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private createBinding(container: IDisplayObjectContainer): ContainerBinding {
        let binding: ContainerBinding = new ContainerBinding(container);
        this._bindings.push(binding);

        // Add a listener so that we can remove this binding when it has no handlers
        binding.addEventListener(ContainerBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        // If the new binding doesn't have a parent it is a Root
        binding.parent = this.findParentBinding(container);
        if (!binding.parent) {
            this.addRootBinding(binding);
        }

        // Reparent any bindings which are contained within the new binding AND
        // A. Don't have a parent, OR
        // B. Have a parent that is not contained within the new binding
        this._bindingByContainer.forEach(childBinding => {
            if (container.contains(childBinding.container)) {
                if (!childBinding.parent) {
                    this.removeRootBinding(childBinding);
                    childBinding.parent = binding;
                } else if (!container.contains(childBinding.parent.container)) {
                    childBinding.parent = binding;
                }
            }
        });

        this.dispatchEvent(new ContainerRegistryEvent(ContainerRegistryEvent.CONTAINER_ADD, binding.container));
        return binding;
    }

    private removeBinding(binding: ContainerBinding): void {
        // Remove the binding itself
        this._bindingByContainer.delete(binding.container);
        let index: number = this._bindings.indexOf(binding);
        this._bindings.splice(index, 1);

        // Drop the empty binding listener
        binding.removeEventListener(ContainerBindingEvent.BINDING_EMPTY, this.onBindingEmpty);

        if (!binding.parent) {
            // This binding didn't have a parent, so it was a Root
            this.removeRootBinding(binding);
        }

        // Re-parent the bindings
        this._bindingByContainer.forEach(childBinding => {
            if (childBinding.parent === binding) {
                childBinding.parent = binding.parent;
                if (!childBinding.parent) {
                    // This binding used to have a parent,
                    // but no longer does, so it is now a Root
                    this.addRootBinding(childBinding);
                }
            }
        });

        this.dispatchEvent(new ContainerRegistryEvent(ContainerRegistryEvent.CONTAINER_REMOVE, binding.container));
    }

    private addRootBinding(binding: ContainerBinding): void {
        this._rootBindings.push(binding);
        this.dispatchEvent(new ContainerRegistryEvent(ContainerRegistryEvent.ROOT_CONTAINER_ADD, binding.container));
    }

    private removeRootBinding(binding: ContainerBinding): void {
        let index: number = this._rootBindings.indexOf(binding);
        this._rootBindings.splice(index, 1);
        this.dispatchEvent(new ContainerRegistryEvent(ContainerRegistryEvent.ROOT_CONTAINER_REMOVE, binding.container));
    }

    private onBindingEmpty = (event: ContainerBindingEvent): void => {
        this.removeBinding(<any>event.target);
    };
}
