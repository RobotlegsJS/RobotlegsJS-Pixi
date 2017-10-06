// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { IContext, Context } from "@robotlegsjs/core";

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

    it("finds_correct_nearest_interested_container_view_and_returns_its_binding", () => {
        let searchTrees: TreeContainer[] = createTrees(2, 2);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1]);

        let correctTree: TreeContainer = searchTrees[0];
        let searchItem: TreeContainer =
            correctTree.treeChildren[0].treeChildren[0];

        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(result.container, correctTree);
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
