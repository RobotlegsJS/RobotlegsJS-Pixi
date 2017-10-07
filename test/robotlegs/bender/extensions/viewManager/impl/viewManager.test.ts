// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Sprite } from "pixi.js";

import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { ViewManager } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";

describe("ViewManager", () => {
    let registry: ContainerRegistry = null;
    let manager: ViewManager = null;

    beforeEach(() => {
        registry = new ContainerRegistry();
        manager = new ViewManager(registry);
    });

    afterEach(() => {
        registry = null;
        manager = null;
    });

    it("container_is_added", () => {
        manager.addContainer(new Sprite());
    });

    it("container_is_stored", () => {
        let container: Sprite = new Sprite();
        let expectedContainers: any[] = [container];
        manager.addContainer(container);
        assert.deepEqual(manager.containers, expectedContainers);
    });
});
