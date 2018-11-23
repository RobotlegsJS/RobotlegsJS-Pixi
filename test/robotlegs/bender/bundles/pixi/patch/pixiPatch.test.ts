// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container, DisplayObject } from "pixi.js";

import { applyPixiPatch } from "../../../../../../src/robotlegs/bender/bundles/pixi/patch/pixi-patch";

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

    it("addChild_stage_capture_added_events_only_when_object_is_attached_to_stage", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        container1.addChild(container2);
        assert.equal(count, 0);

        container1.addChild(container3);
        assert.equal(count, 0);

        container1.addChild(container4);
        assert.equal(count, 0);

        container5.addChild(container1);
        assert.equal(count, 0);

        stage.addChild(container5);
        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_flat_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        container4.addChild(container5);
        container3.addChild(container4);
        container2.addChild(container3);
        container1.addChild(container2);
        stage.addChild(container1);

        assert.equal(count, 5);
    });

    it("addChild_stage_capture_added_events_on_nested_hierarchy_with_display_objects", () => {
        applyPixiPatch(stage);

        let container: Container = new Container();
        let containerL: Container = new Container();
        let containerR: Container = new Container();

        let childL1: DisplayObject = new DisplayObject();
        let childL2: DisplayObject = new DisplayObject();
        let childR1: DisplayObject = new DisplayObject();
        let childR2: DisplayObject = new DisplayObject();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        containerL.addChild(childL1);
        containerL.addChild(childL2);
        containerR.addChild(childR1);
        containerR.addChild(childR2);

        container.addChild(containerL, containerR);
        assert.equal(count, 0);

        stage.addChild(container);
        assert.equal(count, 7);
    });

    it("addChildAt_return_reference_of_child_added", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        assert.equal(child, stage.addChildAt(child, 0));
    });

    it("addChildAt_stage_capture_added_events_on_flat_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        stage.addChildAt(container1, 0);
        stage.addChildAt(container2, 0);
        stage.addChildAt(container3, 0);
        stage.addChildAt(container4, 0);
        stage.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        stage.addChildAt(container1, 0);
        container1.addChildAt(container2, 0);
        container2.addChildAt(container3, 0);
        container3.addChildAt(container4, 0);
        container4.addChildAt(container5, 0);

        assert.equal(count, 5);
    });

    it("addChildAt_stage_capture_added_events_on_nested_hierarchy_added_in_reverse", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("addedToStage", () => {
            count++;
        });

        container4.addChildAt(container5, 0);
        container3.addChildAt(container4, 0);
        container2.addChildAt(container3, 0);
        container1.addChildAt(container2, 0);
        assert.equal(count, 0);

        stage.addChildAt(container1, 0);
        assert.equal(count, 5);
    });

    it("removeChild_return_reference_of_child_removed", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child);
        assert.equal(child, stage.removeChild(child));
    });

    it("removeChild_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeChild(container1);
        stage.removeChild(container2);
        stage.removeChild(container3);
        stage.removeChild(container4);
        stage.removeChild(container5);

        assert.equal(count, 5);
    });

    it("removeChild_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChild(container5);
        container3.removeChild(container4);
        container2.removeChild(container3);
        container1.removeChild(container2);
        stage.removeChild(container1);

        assert.equal(count, 5);
    });

    it("removeChildAt_return_reference_of_child_removed", () => {
        let child: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child);
        assert.equal(child, stage.removeChildAt(0));
    });

    it("removeChildAt_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);
        stage.removeChildAt(0);

        assert.equal(count, 5);
    });

    it("removeChildAt_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChildAt(0);
        container3.removeChildAt(0);
        container2.removeChildAt(0);
        container1.removeChildAt(0);
        stage.removeChildAt(0);

        assert.equal(count, 5);
    });

    it("removeChildren_return_list_of_removed_children", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        let child3: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child1);
        stage.addChild(child2);
        stage.addChild(child3);
        assert.deepEqual([child1, child2, child3], stage.removeChildren());
    });

    it("removeChildren_only_return_removed_children_case1", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        let child3: Container = new Container();
        let child4: Container = new Container();
        let child5: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child1, child2, child3, child4, child5);
        assert.deepEqual([child1, child2, child3], stage.removeChildren(0, 3));
        assert.deepEqual([child4, child5], stage.children);
    });

    it("removeChildren_only_return_removed_children_case2", () => {
        let child1: Container = new Container();
        let child2: Container = new Container();
        let child3: Container = new Container();
        let child4: Container = new Container();
        let child5: Container = new Container();
        applyPixiPatch(stage);
        stage.addChild(child1, child2, child3, child4, child5);
        assert.deepEqual([child3, child4, child5], stage.removeChildren(2, 5));
        assert.deepEqual([child1, child2], stage.children);
    });

    it("removeChildren_stage_capture_removed_events_on_flat_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1, container2, container3, container4, container5);

        stage.removeChildren();

        assert.equal(count, 5);
    });

    it("removeChildren_stage_capture_removed_events_on_nested_hierarchy", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let container3: Container = new Container();
        let container4: Container = new Container();
        let container5: Container = new Container();

        let count: number = 0;

        stage.on("removedFromStage", () => {
            count++;
        });

        stage.addChild(container1);
        container1.addChild(container2);
        container2.addChild(container3);
        container3.addChild(container4);
        container4.addChild(container5);

        container4.removeChildren();
        container3.removeChildren();
        container2.removeChildren();
        container1.removeChildren();
        stage.removeChildren();

        assert.equal(count, 5);
    });

    it("stage_does_not_capture_events_dispatched_in_another_stage", () => {
        applyPixiPatch(stage);

        let container1: Container = new Container();
        let container2: Container = new Container();
        let child1: DisplayObject = new DisplayObject();
        let child2: DisplayObject = new DisplayObject();
        let child3: DisplayObject = new DisplayObject();

        let stageX: Container = new Container();

        applyPixiPatch(stageX);

        let containerX1: Container = new Container();
        let containerX2: Container = new Container();
        let childX1: DisplayObject = new DisplayObject();
        let childX2: DisplayObject = new DisplayObject();
        let childX3: DisplayObject = new DisplayObject();

        let countAdded: number = 0;
        let countRemoved: number = 0;

        stage.on("addedToStage", () => {
            countAdded++;
        });

        stage.on("removedFromStage", () => {
            countRemoved++;
        });

        container2.addChildAt(child1, 0);
        container2.addChildAt(child2, 1);
        container2.addChildAt(child3, 2);
        container1.addChild(container2);
        stage.addChild(container1);

        containerX2.addChildAt(childX1, 0);
        containerX2.addChildAt(childX2, 1);
        containerX2.addChildAt(childX3, 2);
        containerX1.addChild(containerX2);
        stageX.addChild(containerX1);

        assert.equal(countAdded, 5);
        assert.equal(countRemoved, 0);

        container2.removeChildren(0, 2);
        container1.removeChild(container2);
        stage.removeChild(container1);

        containerX2.removeChildren(0, 2);
        containerX1.removeChild(containerX2);
        stageX.removeChild(containerX1);

        assert.equal(countRemoved, 5);
    });
});
