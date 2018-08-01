// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container, DisplayObject } from "pixi.js";

import { IClass } from "@robotlegsjs/core";

import { applyPixiPatch } from "../../../../../../src/robotlegs/bender/extensions/contextView/pixiPatch/pixi-patch";
import { ContainerRegistry } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";
import { StageCrawler } from "../../../../../../src/robotlegs/bender/extensions/viewManager/impl/StageCrawler";

import { CallbackViewHandler } from "../support/CallbackViewHandler";

describe("StageCrawler", () => {
    let container: Container = null;
    let registry: ContainerRegistry = null;
    let crawler: StageCrawler = null;

    beforeEach(() => {
        container = new Container();
        applyPixiPatch(container);
        registry = new ContainerRegistry();
    });

    afterEach(() => {
        crawler = null;
        container = null;
    });

    it("scan_finds_container_itself", () => {
        let actual: Container = null;
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual = view;
            })
        );
        crawler = new StageCrawler(registry.getBinding(container));
        crawler.scan(container);
        assert.equal(actual, container);
    });

    it("scan_finds_direct_child", () => {
        const child: Container = new Container();
        const expected: Container[] = [container, child];
        let actual: Container[] = [];
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        container.addChild(child);
        crawler = new StageCrawler(registry.getBinding(container));
        crawler.scan(container);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_all_direct_children", () => {
        const child1: Container = new Container();
        const child2: Container = new Container();
        const child3: Container = new Container();
        const expected: Container[] = [container, child1, child2, child3];
        let actual: Container[] = [];
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);
        crawler = new StageCrawler(registry.getBinding(container));
        crawler.scan(container);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_all_direct_children_that_are_display_object", () => {
        const child1: DisplayObject = new DisplayObject();
        const child2: DisplayObject = new DisplayObject();
        const child3: DisplayObject = new DisplayObject();
        const expected: DisplayObject[] = [container, child1, child2, child3];
        let actual: Container[] = [];
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        container.addChild(child1);
        container.addChild(child2);
        container.addChild(child3);
        crawler = new StageCrawler(registry.getBinding(container));
        crawler.scan(container);
        assert.deepEqual(actual, expected);
    });

    it("scan_finds_nested_children", () => {
        const intermediary: Container = new Container();
        const child1: Container = new Container();
        const child2: Container = new Container();
        const expected: Container[] = [container, intermediary, child1, child2];
        let actual: Container[] = [];
        registry.addContainer(container).addHandler(
            new CallbackViewHandler((view: Container, type: IClass<any>) => {
                actual.push(view);
            })
        );
        intermediary.addChild(child1);
        intermediary.addChild(child2);
        container.addChild(intermediary);
        crawler = new StageCrawler(registry.getBinding(container));
        crawler.scan(container);
        assert.deepEqual(actual, expected);
    });
});
