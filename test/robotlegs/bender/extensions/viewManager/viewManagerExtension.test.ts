// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

import { ViewManagerExtension, IViewManager } from "../../../../../src";

import { ViewManager } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/ViewManager";

describe("ViewManagerExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("installing after initialization throws error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(ViewManagerExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("viewManager is mapped into injector", () => {
        let viewManager: IViewManager = null;
        context.install(ViewManagerExtension);
        context.whenInitializing(function(): void {
            viewManager = context.injector.get<IViewManager>(IViewManager);
        });
        context.initialize();
        assert.isNotNull(viewManager);
        assert.instanceOf(viewManager, ViewManager);
    });
});
