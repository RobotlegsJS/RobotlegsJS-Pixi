// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

import { ContextViewExtension } from "../../../../../src/robotlegs/bender/extensions/contextView/ContextViewExtension";

describe("ContextViewExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
    });

    afterEach(() => {
        context = null;
    });

    it("installing after initialization throws error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(ContextViewExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });
});
