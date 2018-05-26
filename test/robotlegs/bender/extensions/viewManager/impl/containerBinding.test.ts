// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Sprite } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";
import { ContainerBinding } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerBinding";
import { ContainerBindingEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerBindingEvent";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("ContainerBinding", () => {
    let container: Sprite = null;
    let binding: ContainerBinding = null;

    beforeEach(() => {
        container = new Sprite();
        binding = new ContainerBinding(container);
    });

    afterEach(() => {
        container = null;
        binding = null;
    });

    it("container_is_stored", () => {
        assert.equal(binding.container, container);
    });

    it("parent_is_stored", () => {
        let parentContainer: Sprite = new Sprite();
        let parentBinding = new ContainerBinding(parentContainer);
        binding.parent = parentBinding;
        assert.equal(binding.parent, parentBinding);
    });

    it("handler_is_invoked", () => {
        let callCount: number = 0;
        binding.addHandler(
            new CallbackViewHandler(function(view: any, type: any): void {
                callCount++;
            })
        );
        binding.handleView(container, <IClass<any>>Sprite.constructor);
        assert.equal(callCount, 1);
    });

    it("handler_is_passed_correct_details", () => {
        const expectedView: Sprite = container;
        const expectedType: IClass<any> = <IClass<any>>Sprite.constructor;
        let actualView: Sprite = null;
        let actualType: IClass<any> = null;
        binding.addHandler(
            new CallbackViewHandler(function(view: any, type: any): void {
                actualView = view;
                actualType = type;
            })
        );
        binding.handleView(expectedView, expectedType);
        assert.equal(actualView, expectedView);
        assert.equal(actualType, expectedType);
    });

    it("handler_is_not_invoked_after_removal", () => {
        let callCount: number = 0;
        const handler: IViewHandler = new CallbackViewHandler(function(view: any, type: any): void {
            callCount++;
        });
        binding.addHandler(handler);
        binding.removeHandler(handler);
        binding.handleView(container, <IClass<any>>Sprite.constructor);
        assert.equal(callCount, 0);
    });

    it("handler_is_not_invoked_multiple_times_when_added_multiple_times", () => {
        let callCount: number = 0;
        const handler: IViewHandler = new CallbackViewHandler(function(view: any, type: any): void {
            callCount++;
        });
        binding.addHandler(handler);
        binding.addHandler(handler);
        binding.addHandler(handler);
        binding.handleView(container, <IClass<any>>Sprite.constructor);
        assert.equal(callCount, 1);
    });

    it("handlers_are_invoked_in_order", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        binding.addHandler(
            new CallbackViewHandler(function(view: any, type: any): void {
                actual.push("handler1");
            })
        );
        binding.addHandler(
            new CallbackViewHandler(function(view: any, type: any): void {
                actual.push("handler2");
            })
        );
        binding.addHandler(
            new CallbackViewHandler(function(view: any, type: any): void {
                actual.push("handler3");
            })
        );
        binding.handleView(container, <IClass<any>>Sprite.constructor);
        assert.deepEqual(actual, expected);
    });

    it("binding_fires_event_on_empty", () => {
        const handler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(ContainerBindingEvent.BINDING_EMPTY, function(event: ContainerBindingEvent): void {
            callCount++;
        });
        binding.addHandler(handler);
        binding.removeHandler(handler);
        assert.equal(callCount, 1);
    });

    it("event_on_empty_is_not_invoked_multiple_times_when_handler_is_removed_multiple_times", () => {
        const handler: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(ContainerBindingEvent.BINDING_EMPTY, function(event: ContainerBindingEvent): void {
            callCount++;
        });
        binding.addHandler(handler);
        binding.removeHandler(handler);
        binding.removeHandler(handler);
        binding.removeHandler(handler);
        assert.equal(callCount, 1);
    });

    it("binding_event_on_empty_fired_once_when_more_than_one_handler_are_added", () => {
        const handler1: IViewHandler = new CallbackViewHandler();
        const handler2: IViewHandler = new CallbackViewHandler();
        const handler3: IViewHandler = new CallbackViewHandler();
        let callCount: number = 0;
        binding.addEventListener(ContainerBindingEvent.BINDING_EMPTY, function(event: ContainerBindingEvent): void {
            callCount++;
        });
        binding.addHandler(handler1);
        binding.addHandler(handler2);
        binding.addHandler(handler3);
        binding.removeHandler(handler1);
        binding.removeHandler(handler2);
        binding.removeHandler(handler3);
        assert.equal(callCount, 1);
    });
});
