// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Sprite } from "pixi.js";

import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";
import { ViewManagerEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManagerEvent";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("ViewManagerEvent", () => {
    let container: Sprite = null;
    let handler: IViewHandler = null;
    let event: ViewManagerEvent = null;

    beforeEach(() => {
        container = new Sprite();
        handler = new CallbackViewHandler();
        event = new ViewManagerEvent(ViewManagerEvent.CONTAINER_ADD, container, handler);
    });

    afterEach(() => {
        container = null;
        handler = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ViewManagerEvent.CONTAINER_ADD, "containerAdd");
        assert.equal(ViewManagerEvent.CONTAINER_REMOVE, "containerRemove");
        assert.equal(ViewManagerEvent.HANDLER_ADD, "handlerAdd");
        assert.equal(ViewManagerEvent.HANDLER_REMOVE, "handlerRemove");
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ViewManagerEvent.CONTAINER_ADD);
    });

    it("container_is_stored", () => {
        assert.equal(event.container, container);
    });

    it("handler_is_stored", () => {
        assert.equal(event.handler, handler);
    });

    it("event_is_cloned", () => {
        let clone: ViewManagerEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.container, event.container);
        assert.equal(clone.handler, event.handler);
        assert.notEqual(clone, event);
    });
});
