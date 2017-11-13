// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

import { applyPixiPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/pixi-patch";
import { ConfigureViewEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ConfigureViewEvent";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { ManualStageObserver } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ManualStageObserver";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageObserver", () => {
    let container: Container = null;
    let registry: ContainerRegistry = null;
    let observer: ManualStageObserver = null;

    beforeEach(() => {
        container = new Container();
        applyPixiPatch(container);
        registry = new ContainerRegistry();
        observer = new ManualStageObserver(registry);
    });

    afterEach(() => {
        observer.destroy();
        observer = null;
        registry = null;
        container = null;
    });

    it("view_is_handled_when_event_is_dispatched", () => {
        const expected: Container = new Container();
        let actual: Container = null;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual = view;
            })
        );
        container.addChild(expected);
        expected.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, expected)
        );
        assert.equal(actual, expected);
    });

    it("view_is_handled_when_added_somewhere_inside_container", () => {
        const middle1: Container = new Container();
        const middle2: Container = new Container();
        const middle3: Container = new Container();
        const expected: Container = middle3;
        let actual: Container = null;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual = view;
            })
        );
        container.addChild(middle1);
        middle1.addChild(middle2);
        middle2.addChild(middle3);
        middle3.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, middle3)
        );
        assert.deepEqual(actual, expected);
    });

    it("view_is_handled_when_container_was_already_added_into_registry", () => {
        const expected: Container = new Container();
        let manualObserver: ManualStageObserver = null;
        let actual: Container = null;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual = view;
            })
        );
        manualObserver = new ManualStageObserver(registry);
        container.addChild(expected);
        expected.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, expected)
        );
        assert.equal(actual, expected);
    });

    it("view_is_not_handled_when_added_outside_container", () => {
        let callCount: number = 0;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                callCount++;
            })
        );
        let container2: Container = new Container();
        let child: Container = new Container();
        container2.addChild(child);
        child.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, child)
        );
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_container_removal", () => {
        let child: Container = new Container();
        let callCount: number = 0;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                callCount++;
            })
        );
        registry.removeContainer(container);
        container.addChild(child);
        child.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, child)
        );
        assert.equal(callCount, 0);
    });

    it("view_is_not_handled_after_stageObserver_is_destroyed", () => {
        let child: Container = new Container();
        let callCount: number = 0;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                callCount++;
            })
        );
        observer.destroy();
        container.addChild(child);
        child.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, child)
        );
        assert.equal(callCount, 0);
    });

    it("root_container_is_handled_when_added_to_stage", () => {
        const expected: Container = new Container();
        let actual: Container = null;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual = view;
            })
        );
        container.addChild(expected);
        expected.dispatchEvent(
            new ConfigureViewEvent(ConfigureViewEvent.CONFIGURE_VIEW, expected)
        );
        assert.equal(actual, expected);
    });
});
