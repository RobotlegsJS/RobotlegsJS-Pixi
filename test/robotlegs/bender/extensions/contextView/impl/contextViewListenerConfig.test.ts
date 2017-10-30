// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import {
    IContextView,
    IViewManager,
    ContextView,
    ContextViewListenerConfig
} from "../../../../../../src";

import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { ViewManager } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";

describe("ContextViewListenerConfig", () => {
    let container: Container;
    let contextView: IContextView;
    let containerRegistry: ContainerRegistry;
    let viewManager: ViewManager;
    let contextViewListenerConfig: ContextViewListenerConfig;

    beforeEach(() => {
        container = new Container();
        contextView = new ContextView(container);
        containerRegistry = new ContainerRegistry();
        viewManager = new ViewManager(containerRegistry);
        contextViewListenerConfig = new ContextViewListenerConfig(
            contextView,
            viewManager
        );
    });

    afterEach(() => {
        contextView = null;
        container = null;
        containerRegistry = null;
        viewManager = null;
        contextViewListenerConfig = null;
    });

    it("container_is_added_to_view_manager", () => {
        contextViewListenerConfig.configure();
        assert.deepEqual(viewManager.containers, [container]);
    });
});
