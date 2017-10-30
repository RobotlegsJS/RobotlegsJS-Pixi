// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { IContextView, ContextView } from "../../../../../../src";

describe("ContextView", () => {
    let container: Container;
    let contextView: IContextView;

    beforeEach(() => {
        contextView = new ContextView(container);
    });

    afterEach(() => {
        contextView = null;
        container = null;
    });

    it("container_is_stored", () => {
        assert.equal(contextView.view, container);
    });
});
