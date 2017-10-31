// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { applyPixiPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/pixi-patch";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { StageObserver } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageObserver";
import { ViewManager } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("ViewManager", () => {
    let container: Container = null;
    let registry: ContainerRegistry = null;
    let viewManager: ViewManager = null;
    let stageObserver: StageObserver = null;

    beforeEach(() => {
        container = new Container();
        applyPixiPatch(container);
        registry = new ContainerRegistry();
        viewManager = new ViewManager(registry);
        stageObserver = new StageObserver(registry);
    });

    afterEach(() => {
        stageObserver.destroy();
        stageObserver = null;
        viewManager = null;
        registry = null;
        container = null;
    });

    it("container_is_added", () => {
        viewManager.addContainer(container);
    });

    it("container_is_stored", () => {
        let expectedContainers: any[] = [container];
        viewManager.addContainer(container);
        assert.deepEqual(viewManager.containers, expectedContainers);
    });

    it("addContainer_throws_if_containers_are_nested_case1", () => {
        function addNestedContainers(): void {
            const container1: Container = new Container();
            const container2: Container = new Container();
            container1.addChild(container2);
            viewManager.addContainer(container1);
            viewManager.addContainer(container2);
        }
        assert.throws(addNestedContainers, Error);
    });

    it("addContainer_throws_if_containers_are_nested_case2", () => {
        function addNestedContainers(): void {
            const container1: Container = new Container();
            const container2: Container = new Container();
            container2.addChild(container1);
            viewManager.addContainer(container1);
            viewManager.addContainer(container2);
        }
        assert.throws(addNestedContainers, Error);
    });

    it("handler_is_called", () => {
        const expected: Container = new Container();
        let actual: Container = null;
        viewManager.addContainer(container);
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    actual = view;
                }
            )
        );
        container.addChild(expected);
        assert.equal(actual, expected);
    });

    it("handlers_are_called", () => {
        const expected: string[] = ["handler1", "handler2", "handler3"];
        let actual: string[] = [];
        viewManager.addContainer(container);
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    actual.push("handler1");
                }
            )
        );
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    actual.push("handler2");
                }
            )
        );
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    actual.push("handler3");
                }
            )
        );
        container.addChild(new Container());
        assert.deepEqual(actual, expected);
    });

    it("handler_is_not_called_after_container_removal", () => {
        let callCount: number = 0;
        viewManager.addContainer(container);
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    callCount++;
                }
            )
        );
        viewManager.removeContainer(container);
        container.addChild(new Container());
        assert.equal(callCount, 0);
    });

    it("handler_is_not_called_after_removeAll", () => {
        let callCount: number = 0;
        viewManager.addContainer(container);
        viewManager.addViewHandler(
            new CallbackViewHandler(
                (view: Container, type: FunctionConstructor) => {
                    callCount++;
                }
            )
        );
        viewManager.removeAllHandlers();
        container.addChild(new Container());
        assert.equal(callCount, 0);
    });
});
