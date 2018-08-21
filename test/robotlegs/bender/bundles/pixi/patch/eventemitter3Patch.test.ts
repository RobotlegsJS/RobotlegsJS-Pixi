// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { Event } from "@robotlegsjs/core";

import "../../../../../../src/robotlegs/bender/bundles/pixi/patch/eventemitter3-patch";

describe("EventEmmiter3Patch", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
    });

    afterEach(() => {
        container = null;
    });

    it("DisplayObject_is_a_EventDispatcher", () => {
        assert.isNotNull(container.addEventListener);
        assert.isFunction(container.addEventListener);
        assert.isNotNull(container.hasEventListener);
        assert.isFunction(container.hasEventListener);
        assert.isNotNull(container.removeEventListener);
        assert.isFunction(container.removeEventListener);
        assert.isNotNull(container.willTrigger);
        assert.isFunction(container.willTrigger);
        assert.isNotNull(container.dispatchEvent);
        assert.isFunction(container.dispatchEvent);
    });

    it("addEventListener_store_listener", () => {
        let listener: Function = () => {
            // no nothing
            return;
        };
        container.addEventListener("addedToStage", listener);
        assert.deepEqual(container.listeners("addedToStage"), [listener]);
    });

    it("hasEventListener_check_if_a_listener_was_added", () => {
        let listener: Function = () => {
            // no nothing
            return;
        };
        container.addEventListener("addedToStage", listener);
        assert.isTrue(container.hasEventListener("addedToStage", listener));
        assert.isFalse(container.hasEventListener("removedFromStage"));
    });

    it("removeEventListener_remove_a_listener", () => {
        let listener: Function = () => {
            // no nothing
            return;
        };
        container.addEventListener("addedToStage", listener);
        container.removeEventListener("addedToStage", listener);
        assert.isEmpty(container.listeners("addedToStage"));
        assert.isFalse(container.hasEventListener("addedToStage"));
    });

    it("willTrigger_ensure_that_a_event_will_be_dispatched", () => {
        let listener: Function = () => {
            // no nothing
            return;
        };
        container.addEventListener("addedToStage", listener);
        assert.isTrue(container.willTrigger("addedToStage"));
    });

    it("dispatchEvent_dispatch_a_event", () => {
        let dispatched: boolean = false;
        let listener: Function = () => {
            dispatched = true;
        };
        container.addEventListener("addedToStage", listener);
        container.dispatchEvent(new Event("addedToStage"));
        assert.isTrue(dispatched);
    });

    it("dispatchEvent_dispatch_a_event_with_bubbles", () => {
        let dispatched: boolean = false;
        let listener: Function = () => {
            dispatched = true;
        };
        let child: Container = new Container();
        let grandChild: Container = new Container();
        child.addChild(grandChild);
        container.addChild(child);
        container.addEventListener("test", listener);
        grandChild.dispatchEvent(new Event("test", true));
        assert.isTrue(dispatched);
    });
});
