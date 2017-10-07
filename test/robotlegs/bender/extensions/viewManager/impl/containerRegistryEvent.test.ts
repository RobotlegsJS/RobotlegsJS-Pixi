// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Sprite } from "pixi.js";

import { ContainerRegistryEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistryEvent";

describe("ContainerRegistryEvent", () => {
    let container: Sprite = null;
    let event: ContainerRegistryEvent = null;

    beforeEach(() => {
        container = new Sprite();
        event = new ContainerRegistryEvent(
            ContainerRegistryEvent.CONTAINER_ADD,
            container
        );
    });

    afterEach(() => {
        event = null;
    });

    it("type_is_stored", () => {
        assert.equal(event.type, ContainerRegistryEvent.CONTAINER_ADD);
    });

    it("container_is_stored", () => {
        assert.equal(event.container, container);
    });

    it("event_is_cloned", () => {
        let clone: ContainerRegistryEvent = event.clone();
        assert.equal(clone.type, event.type);
        assert.equal(clone.container, event.container);
        assert.notEqual(clone, event);
    });
});
