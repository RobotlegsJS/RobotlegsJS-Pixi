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
        container = null;
        event = null;
    });

    it("ensure_static_properties_will_not_change", () => {
        assert.equal(ContainerRegistryEvent.CONTAINER_ADD, "containerAdd");
        assert.equal(
            ContainerRegistryEvent.CONTAINER_REMOVE,
            "containerRemove"
        );
        assert.equal(
            ContainerRegistryEvent.ROOT_CONTAINER_ADD,
            "rootContainerAdd"
        );
        assert.equal(
            ContainerRegistryEvent.ROOT_CONTAINER_REMOVE,
            "rootContainerRemove"
        );
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
