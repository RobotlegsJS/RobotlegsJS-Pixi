// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container, DisplayObject } from "pixi.js";

import "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/pixi-patch";

describe("ContainsPatch", () => {
    let container: Container;

    beforeEach(() => {
        container = new Container();
    });

    afterEach(() => {
        container.removeChildren();
        container = null;
    });

    it("Container_have_contains_method", () => {
        assert.isNotNull(container.contains);
        assert.isFunction(container.contains);
    });

    it("Container_contains_itself", () => {
        assert.isTrue(container.contains(container));
    });

    it("Container_contains_direct_child", () => {
        let child: DisplayObject = new DisplayObject();

        container.addChild(child);

        assert.isTrue(container.contains(child));
    });

    it("Container_contains_direct_children", () => {
        let child1: DisplayObject = new DisplayObject();
        let child2: DisplayObject = new DisplayObject();
        let child3: DisplayObject = new DisplayObject();

        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);

        assert.isTrue(container.contains(child1));
        assert.isTrue(container.contains(child2));
        assert.isTrue(container.contains(child3));
    });

    it("Container_contains_nested_children", () => {
        let child1: Container = new Container();
        let child2: DisplayObject = new DisplayObject();
        let child3: DisplayObject = new DisplayObject();
        let grandChild1: Container = new Container();
        let grandChild2: DisplayObject = new DisplayObject();
        let grandChild3: DisplayObject = new DisplayObject();
        let greatGrandChild1: DisplayObject = new DisplayObject();
        let greatGrandChild2: DisplayObject = new DisplayObject();
        let greatGrandChild3: DisplayObject = new DisplayObject();

        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);

        child1.addChild(grandChild1);
        child1.addChild(grandChild2);
        child1.addChild(grandChild3);

        grandChild1.addChild(greatGrandChild1);
        grandChild1.addChild(greatGrandChild2);
        grandChild1.addChild(greatGrandChild3);

        assert.isTrue(container.contains(child1));
        assert.isTrue(container.contains(child2));
        assert.isTrue(container.contains(child3));

        assert.isTrue(container.contains(grandChild1));
        assert.isTrue(container.contains(grandChild2));
        assert.isTrue(container.contains(grandChild3));

        assert.isTrue(container.contains(greatGrandChild1));
        assert.isTrue(container.contains(greatGrandChild2));
        assert.isTrue(container.contains(greatGrandChild3));
    });

    it("Container_does_not_contains_ancestors", () => {
        let parent: Container = new Container();
        let grandParent: Container = new Container();
        let greatGrandParent: Container = new Container();

        parent.addChild(container);
        grandParent.addChild(parent);
        greatGrandParent.addChild(grandParent);

        assert.isFalse(container.contains(parent));
        assert.isFalse(container.contains(grandParent));
        assert.isFalse(container.contains(greatGrandParent));
    });

    it("Container_does_not_contains_same_level_container", () => {
        let parent: Container = new Container();
        let brother: Container = new Container();
        let sister: Container = new Container();

        parent.addChild(container);
        parent.addChild(brother);
        parent.addChild(sister);

        assert.isFalse(container.contains(parent));
        assert.isFalse(container.contains(brother));
        assert.isFalse(container.contains(sister));
    });
});
