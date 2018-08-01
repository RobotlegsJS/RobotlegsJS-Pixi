// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

import { ViewManagerExtension, MediatorMapExtension, IMediatorMap } from "../../../../../src";

import { MediatorMap } from "../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMap";

describe("MediatorMapExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("installing_after_initialization_throws_error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(MediatorMapExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("mediatorMap_is_mapped_into_injector_on_initialize", () => {
        let mediatorMap: IMediatorMap = null;
        context.install(ViewManagerExtension, MediatorMapExtension);
        context.whenInitializing(function(): void {
            mediatorMap = context.injector.get<IMediatorMap>(IMediatorMap);
        });
        context.initialize();
        assert.isNotNull(mediatorMap);
        assert.instanceOf(mediatorMap, MediatorMap);
    });

    it("mediatorMap_is_mapped_into_injector_on_initialize_when_view_manager_is_not_installed", () => {
        let mediatorMap: IMediatorMap = null;
        context.install(MediatorMapExtension);
        context.whenInitializing(function(): void {
            mediatorMap = context.injector.get<IMediatorMap>(IMediatorMap);
        });
        context.initialize();
        assert.isNotNull(mediatorMap);
        assert.instanceOf(mediatorMap, MediatorMap);
    });

    it("mediatorMap_is_unmapped_from_injector_on_destroy", () => {
        context.install(ViewManagerExtension, MediatorMapExtension);
        context.afterDestroying(function(): void {
            assert.isFalse(context.injector.isBound(IMediatorMap));
        });
        context.initialize();
        context.destroy();
    });
});
