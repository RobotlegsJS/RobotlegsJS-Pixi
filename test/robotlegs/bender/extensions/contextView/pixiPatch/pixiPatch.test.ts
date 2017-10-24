// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { applyPixiPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/pixi-patch";

describe("PixiPatch", () => {
    let stage: Container;

    beforeEach(() => {
        stage = new Container();
    });

    afterEach(() => {
        stage = null;
    });

    it("applyPixiPatch_method_works", () => {
        applyPixiPatch(stage);
    });

    it("addChild_return_reference_of_child_added", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        assert.equal(child, stage.addChild(child));
    });

    it("addChild_with_two_parameters_return_reference_of_first_child_added", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        applyPixiPatch(stage);
        assert.equal(child1, stage.addChild(child1, child2));
    });

    it("addChild_with_three_parameters_return_reference_of_first_child_added", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        let child3: Container = new Container();
        applyPixiPatch(stage);
        assert.equal(child1, stage.addChild(child1, child2, child3));
    });

    it("addChildAt_return_reference_of_child_added", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        assert.equal(child, stage.addChildAt(child, 0));
    });

    it("removeChild_return_reference_of_child_removed", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child);
        assert.equal(child, stage.removeChild(child));
    });

    it("removeChildAt_return_reference_of_child_removed", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child);
        assert.equal(child, stage.removeChildAt(0));
    });

    it("removeChildren_return_list_of_removed_children", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        let child3: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        assert.deepEqual([child1, child2, child3], stage.removeChildren(0, 3));
    });
});
