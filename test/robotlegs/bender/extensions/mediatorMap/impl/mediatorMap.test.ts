// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Sprite, Texture } from "pixi.js";

import { IContext, Context, TypeMatcher } from "@robotlegsjs/core";

import { IMediatorMapper } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/dsl/IMediatorMapper";
import { MediatorMap } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMap";
import { MediatorMapper } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapper";

describe("MediatorMap", () => {
    let context: IContext = null;
    let mediatorMap: MediatorMap = null;

    beforeEach(() => {
        context = new Context();
        mediatorMap = new MediatorMap(context);
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        mediatorMap = null;
    });

    it("mapMatcher_creates_mapper", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);
        assert.instanceOf(mediatorMap.mapMatcher(matcher), MediatorMapper);
    });

    it("mapMatcher_to_matching_TypeMatcher_returns_same_mapper", () => {
        const matcher1: TypeMatcher = new TypeMatcher().allOf(Sprite);
        const matcher2: TypeMatcher = new TypeMatcher().allOf(Sprite);
        const mapper1: IMediatorMapper = mediatorMap.mapMatcher(matcher1);
        const mapper2: IMediatorMapper = mediatorMap.mapMatcher(matcher2);
        assert.equal(mapper1, mapper2);
    });

    it("mapMatcher_to_differing_TypeMatcher_returns_different_mapper", () => {
        const matcher1: TypeMatcher = new TypeMatcher().allOf(Sprite);
        const matcher2: TypeMatcher = new TypeMatcher().allOf(Texture);
        const mapper1: IMediatorMapper = mediatorMap.mapMatcher(matcher1);
        const mapper2: IMediatorMapper = mediatorMap.mapMatcher(matcher2);
        assert.notEqual(mapper1, mapper2);
    });

    it("map_creates_mapper", () => {
        assert.instanceOf(mediatorMap.map(Sprite), MediatorMapper);
    });

    it("map_to_matching_TypeMatcher_returns_same_mapper", () => {
        const mapper1: IMediatorMapper = mediatorMap.map(Sprite);
        const mapper2: IMediatorMapper = mediatorMap.map(Sprite);
        assert.equal(mapper1, mapper2);
    });

    it("map_to_differing_TypeMatcher_returns_different_mapper", () => {
        const mapper1: IMediatorMapper = mediatorMap.map(Sprite);
        const mapper2: IMediatorMapper = mediatorMap.map(Texture);
        assert.notEqual(mapper1, mapper2);
    });

    it("unmapMatcher_returns_mapper", () => {
        const mapper: MediatorMapper = <MediatorMapper>mediatorMap.mapMatcher(
            new TypeMatcher().allOf(Sprite)
        );
        const unmappedMapper: MediatorMapper = <MediatorMapper>mediatorMap.unmapMatcher(
            new TypeMatcher().allOf(Sprite)
        );
        assert.equal(unmappedMapper, mapper);
    });

    it("unmap_returns_mapper", () => {
        const mapper: MediatorMapper = <MediatorMapper>mediatorMap.map(Sprite);
        const unmappedMapper: MediatorMapper = <MediatorMapper>mediatorMap.unmap(
            Sprite
        );
        assert.equal(unmappedMapper, mapper);
    });

    it("robust_to_unmapping_non_existent_mappings", () => {
        mediatorMap.unmapMatcher(new TypeMatcher().allOf(Sprite)).fromAll();
    });
});
