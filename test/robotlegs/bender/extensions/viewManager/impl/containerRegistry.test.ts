// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

import { Sprite } from "pixi.js";

import { ViewManagerExtension, IViewManager } from "../../../../../../src";

import { ContainerBinding } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerBinding";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";

import { TreeContainer } from "../support/TreeContainer";

describe("ContainerRegistry", () => {
    let registry: ContainerRegistry = null;

    beforeEach(() => {
        registry = new ContainerRegistry();
    });

    afterEach(() => {
        registry = null;
    });

    it("add_container", () => {
        let container: Sprite = new Sprite();
        let containerBinding: ContainerBinding = registry.addContainer(
            container
        );
        assert.equal(containerBinding.container, container);
    });

    it("add_twice_same_container", () => {
        let container: Sprite = new Sprite();
        let containerBinding1: ContainerBinding = registry.addContainer(
            container
        );
        let containerBinding2: ContainerBinding = registry.addContainer(
            container
        );
        assert.equal(containerBinding1.container, container);
        assert.equal(containerBinding2.container, container);
        assert.equal(containerBinding1, containerBinding2);
    });

    it("finds_correct_nearest_interested_container_view_and_returns_its_binding", () => {
        let searchTrees: TreeContainer[] = createTrees(3, 3);

        for (let searchTree of searchTrees) {
            registry.addContainer(searchTree);
        }

        let correctTree: TreeContainer;
        let result: ContainerBinding;

        for (correctTree of searchTrees) {
            for (let treeChild of correctTree.treeChildren) {
                result = registry.findParentBinding(treeChild);
                assert.equal(result.container, correctTree);

                for (let treeGrandchild of treeChild.treeChildren) {
                    result = registry.findParentBinding(treeGrandchild);
                    assert.equal(result.container, correctTree);

                    for (let treeGreatGrandchild of treeGrandchild.treeChildren) {
                        result = registry.findParentBinding(
                            treeGreatGrandchild
                        );
                        assert.equal(result.container, correctTree);
                    }
                }
            }
        }
    });

    it("binding_returns_with_correct_interested_parent_chain", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1]);
        registry.addContainer(searchTrees[1].treeChildren[3]);

        let searchItem: Sprite =
            searchTrees[1].treeChildren[3].treeChildren[3].treeChildren[3]
                .treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(
            searchTrees[1].treeChildren[3],
            result.container,
            "Binding returns with correct container view"
        );
        assert.equal(
            searchTrees[1],
            result.parent.container,
            "Binding returns with correct container parent view"
        );
        assert.equal(null, result.parent.parent, "Further parents are null");
    });

    it("binding_returns_with_correct_interested_parent_chain_if_interested_views_added_in_wrong_order", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1].treeChildren[3]);
        registry.addContainer(searchTrees[1]);

        let searchItem: Sprite =
            searchTrees[1].treeChildren[3].treeChildren[3].treeChildren[3]
                .treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(
            searchTrees[1].children[3],
            result.container,
            "Binding returns with correct container view"
        );

        assert.equal(
            searchTrees[1],
            result.parent.container,
            "Binding returns with correct container parent view"
        );
        assert.equal(null, result.parent.parent, "Further parents are null");
    });

    function createTrees(
        treeDepth: number,
        treeWidth: number
    ): TreeContainer[] {
        const trees: TreeContainer[] = [];
        for (let i: number = 0; i < treeWidth; i++) {
            let treeContainer: TreeContainer = new TreeContainer(
                treeDepth,
                treeWidth
            );
            trees.push(treeContainer);
        }
        return trees;
    }
});
