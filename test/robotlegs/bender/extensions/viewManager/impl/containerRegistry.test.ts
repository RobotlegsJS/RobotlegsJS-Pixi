// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/contains-patch";

import { assert } from "chai";

import { Sprite } from "pixi.js";

import { IViewHandler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";
import { ContainerBinding } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerBinding";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { ContainerRegistryEvent } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistryEvent";

import { CallbackViewHandler } from "../support/CallbackViewHandler";
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
        let containerBinding: ContainerBinding = registry.addContainer(container);
        assert.equal(containerBinding.container, container);
    });

    it("add_twice_same_container", () => {
        let container: Sprite = new Sprite();
        let containerBinding1: ContainerBinding = registry.addContainer(container);
        let containerBinding2: ContainerBinding = registry.addContainer(container);
        assert.equal(containerBinding1.container, container);
        assert.equal(containerBinding2.container, container);
        assert.equal(containerBinding1, containerBinding2);
    });

    it("get_bindings", () => {
        let container1: Sprite = new Sprite();
        let container2: Sprite = new Sprite();
        let container3: Sprite = new Sprite();

        let containerBinding1: ContainerBinding = registry.addContainer(container1);
        let containerBinding2: ContainerBinding = registry.addContainer(container2);
        let containerBinding3: ContainerBinding = registry.addContainer(container3);

        let expectedBindings: ContainerBinding[] = [containerBinding1, containerBinding2, containerBinding3];

        assert.deepEqual(expectedBindings, registry.bindings);
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
                        result = registry.findParentBinding(treeGreatGrandchild);
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

        let searchItem: Sprite = searchTrees[1].treeChildren[3].treeChildren[3].treeChildren[3].treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(searchTrees[1].treeChildren[3], result.container, "Binding returns with correct container view");
        assert.equal(searchTrees[1], result.parent.container, "Binding returns with correct container parent view");
        assert.equal(null, result.parent.parent, "Further parents are null");
    });

    it("binding_returns_with_correct_interested_parent_chain_if_interested_views_added_in_wrong_order", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1].treeChildren[3]);
        registry.addContainer(searchTrees[1]);

        let searchItem: Sprite = searchTrees[1].treeChildren[3].treeChildren[3].treeChildren[3].treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(searchTrees[1].treeChildren[3], result.container, "Binding returns with correct container view");

        assert.equal(searchTrees[1], result.parent.container, "Binding returns with correct container parent view");
        assert.equal(null, result.parent.parent, "Further parents are null");
    });

    it("binding_returns_with_correct_interested_parent_chain_if_interested_views_added_in_wrong_order_with_gaps", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2]);
        registry.addContainer(searchTrees[1]);

        let searchItem: Sprite = searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3].treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(searchTrees[1].treeChildren[3].treeChildren[2], result.container, "Binding returns with correct container view");

        assert.equal(searchTrees[1], result.parent.container, "Binding returns with correct container parent view");
        assert.equal(null, result.parent.parent, "Further parents are null");
    });

    it("binding_returns_with_correct_interested_parent_chain_after_removal", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2]);
        registry.addContainer(searchTrees[1].treeChildren[3]);

        registry.removeContainer(searchTrees[1].treeChildren[3].treeChildren[2]);

        let searchItem: Sprite = searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3].treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(
            searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3],
            result.container,
            "Binding returns with correct container view"
        );
        assert.equal(searchTrees[1].treeChildren[3], result.parent.container, "Binding returns with correct container parent view");
        assert.equal(searchTrees[1], result.parent.parent.container, "Binding returns with correct container parent parent view");
        assert.equal(null, result.parent.parent.parent, "Further parents are null");
    });

    it("returns_null_if_search_item_is_not_inside_an_included_view", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);

        registry.addContainer(searchTrees[0]);
        registry.addContainer(searchTrees[1]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2]);
        registry.addContainer(searchTrees[1].treeChildren[3]);

        registry.removeContainer(searchTrees[1].treeChildren[3].treeChildren[2]);

        let searchItem: Sprite = searchTrees[2].treeChildren[3].treeChildren[2].treeChildren[3].treeChildren[3];
        let result: ContainerBinding = registry.findParentBinding(searchItem);

        assert.equal(null, result, "Returns null if not inside an included view");
    });

    it("returns_root_container_view_bindings_one_item", () => {
        let searchTrees: TreeContainer[] = createTrees(1, 1);
        let expectedBinding: ContainerBinding = registry.addContainer(searchTrees[0]);
        let expectedRootBindings: ContainerBinding[] = [expectedBinding];
        assert.deepEqual(expectedRootBindings, registry.rootBindings, "Returns root container view bindings one item");
    });

    it("returns_root_container_view_bindings_many_items", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);
        let firstExpectedBinding: ContainerBinding = registry.addContainer(searchTrees[0]);

        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2]);

        let secondExpectedBinding: ContainerBinding = registry.addContainer(searchTrees[1]);

        registry.addContainer(searchTrees[1].treeChildren[3]);

        let expectedRootBindings: ContainerBinding[] = [firstExpectedBinding, secondExpectedBinding];
        assert.deepEqual(expectedRootBindings, registry.rootBindings, "Returns root container view bindings many items");
    });

    it("returns_root_container_view_bindings_many_items_after_removals", () => {
        let searchTrees: TreeContainer[] = createTrees(5, 4);
        let firstExpectedBinding: ContainerBinding = registry.addContainer(searchTrees[0]);

        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2].treeChildren[3]);
        registry.addContainer(searchTrees[1].treeChildren[3].treeChildren[2]);
        registry.addContainer(searchTrees[1]);

        let secondExpectedBinding: ContainerBinding = registry.addContainer(searchTrees[1].treeChildren[3]);

        registry.removeContainer(searchTrees[1]);

        let expectedRootBindings: ContainerBinding[] = [firstExpectedBinding, secondExpectedBinding];
        assert.deepEqual(expectedRootBindings, registry.rootBindings, "Returns root container view bindings many items after removals");
    });

    it("adding_container_dispatches_event", () => {
        let container: Sprite = new Sprite();
        let callCount: number = 0;
        registry.addEventListener(ContainerRegistryEvent.CONTAINER_ADD, function onContainerAdd(event: ContainerRegistryEvent): void {
            callCount++;
        });
        registry.addContainer(container);
        registry.addContainer(container);
        assert.equal(callCount, 1);
    });

    it("removing_container_dispatches_event", () => {
        let container: Sprite = new Sprite();
        let callCount: number = 0;
        registry.addEventListener(ContainerRegistryEvent.CONTAINER_REMOVE, function onContainerRemove(event: ContainerRegistryEvent): void {
            callCount++;
        });
        registry.addContainer(container);
        registry.removeContainer(container);
        registry.removeContainer(container);
        assert.equal(callCount, 1);
    });

    it("adding_root_container_dispatches_event", () => {
        let container: Sprite = new Sprite();
        let callCount: number = 0;
        registry.addEventListener(ContainerRegistryEvent.ROOT_CONTAINER_ADD, function onRootContainerAdd(
            event: ContainerRegistryEvent
        ): void {
            callCount++;
        });
        registry.addContainer(container);
        assert.equal(callCount, 1);
    });

    it("removing_root_container_dispatches_event", () => {
        let container: Sprite = new Sprite();
        let callCount: number = 0;
        registry.addEventListener(ContainerRegistryEvent.ROOT_CONTAINER_REMOVE, function onRootContainerRemove(
            event: ContainerRegistryEvent
        ): void {
            callCount++;
        });
        registry.addContainer(container);
        registry.removeContainer(container);
        assert.equal(callCount, 1);
    });

    it("empty_binding_is_removed", () => {
        let container: Sprite = new Sprite();
        let handler: IViewHandler = new CallbackViewHandler();
        registry.addContainer(container).addHandler(handler);
        registry.getBinding(container).removeHandler(handler);
        assert.isUndefined(registry.getBinding(container));
    });

    function createTrees(treeDepth: number, treeWidth: number): TreeContainer[] {
        const trees: TreeContainer[] = [];
        for (let i: number = 0; i < treeWidth; i++) {
            let treeContainer: TreeContainer = new TreeContainer(treeDepth, treeWidth);
            trees.push(treeContainer);
        }
        return trees;
    }
});
