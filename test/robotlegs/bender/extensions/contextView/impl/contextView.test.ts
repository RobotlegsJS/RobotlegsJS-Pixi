// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
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
        container = new Container();
        contextView = new ContextView(container);
    });

    afterEach(() => {
        contextView = null;
        container = null;
    });

    it("container_is_stored", () => {
        assert.isNotNull(contextView.view);
        assert.equal(contextView.view, container);
    });

    it("ContextView_throws_a_error_when_view_is_null", () => {
        function inicializeContextViewWithNullView(): void {
            contextView = new ContextView(null);
        }
        assert.throws(inicializeContextViewWithNullView, Error);
    });

    it("ContextView_throws_a_error_when_view_is_undefined", () => {
        function inicializeContextViewWithUndefinedView(): void {
            contextView = new ContextView(undefined);
        }
        assert.throws(inicializeContextViewWithUndefinedView, Error);
    });
});
