// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import sinon = require("sinon");

import { assert } from "chai";

import { DisplayObject, Sprite } from "pixi.js";

import { IInjector, ITypeFilter, RobotlegsInjector, TypeMatcher } from "@robotlegsjs/core";

import { IMediator } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IMediator";
import { IMediatorMapping } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/api/IMediatorMapping";
import { MediatorFactory } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorFactory";
import { MediatorMapping } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapping";
import { MediatorManager } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorManager";

import { CallbackHook } from "../support/CallbackHook";
import { CallbackMediator } from "../support/CallbackMediator";
import { GrumpyGuard } from "../support/GrumpyGuard";
import { HappyGuard } from "../support/HappyGuard";
import { InjectedMediator } from "../support/InjectedMediator";
import { MediatorHook } from "../support/MediatorHook";
import { ViewInjectedMediator } from "../support/ViewInjectedMediator";
import { ViewInjectedAsRequestedMediator } from "../support/ViewInjectedAsRequestedMediator";

describe("MediatorFactory", () => {
    let injector: IInjector = null;
    let manager: MediatorManager = null;
    let factory: MediatorFactory = null;

    beforeEach(() => {
        injector = new RobotlegsInjector();
        factory = new MediatorFactory(injector);
    });

    afterEach(() => {
        injector = null;
        manager = null;
        factory = null;
    });

    function createTypeFilter(allOf: any[], anyOf: any[] = null, noneOf: any[] = null): ITypeFilter {
        const matcher: TypeMatcher = new TypeMatcher();

        if (allOf) {
            matcher.allOf(allOf);
        }
        if (anyOf) {
            matcher.anyOf(anyOf);
        }
        if (noneOf) {
            matcher.noneOf(noneOf);
        }

        return matcher.createTypeFilter();
    }

    function hookCallCount(...hooks: any[]): number {
        let callCount: number = 0;
        injector
            .bind("Function")
            .toFunction(() => {
                callCount++;
            })
            .whenTargetNamed("hookCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        mapping.withHooks.apply(mapping, hooks);
        factory.createMediators(new Sprite(), Sprite, [mapping]);
        return callCount;
    }

    function mediatorsCreatedWithGuards(...guards: any[]): number {
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        mapping.withGuards(guards);
        const mediators: any[] = factory.createMediators(new Sprite(), Sprite, [mapping]);
        return mediators.length;
    }

    it("mediator_is_created", () => {
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        const mediator: IMediator = factory.createMediators(new Sprite(), Sprite, [mapping])[0];
        assert.instanceOf(mediator, CallbackMediator);
    });

    it("mediator_is_injected_into", () => {
        const expected: number = 128;
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), InjectedMediator);
        injector.bind(Number).toConstantValue(expected);
        const mediator: InjectedMediator = factory.createMediators(new Sprite(), Sprite, [mapping])[0];
        assert.equal(mediator.number, expected);
    });

    it("mediatedItem_is_injected_as_exact_type_into_mediator", () => {
        const expected: Sprite = new Sprite();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), ViewInjectedMediator);
        const mediator: ViewInjectedMediator = factory.createMediators(expected, Sprite, [mapping])[0];
        assert.equal(mediator.mediatedItem, expected);
    });

    it("mediatedItem_is_injected_as_requested_type_into_mediator", () => {
        const expected: Sprite = new Sprite();
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([DisplayObject]), ViewInjectedAsRequestedMediator);
        const mediator: ViewInjectedAsRequestedMediator = factory.createMediators(expected, Sprite, [mapping])[0];
        assert.equal(mediator.mediatedItem, expected);
    });

    it("hooks_are_called", () => {
        assert.equal(hookCallCount(CallbackHook, CallbackHook), 2);
    });

    it("hook_receives_mediator_and_mediatedItem", () => {
        const mediatedItem: Sprite = new Sprite();
        let injectedMediator: ViewInjectedMediator = null;
        let injectedView: Sprite = null;
        injector
            .bind("Function")
            .toFunction((hook: MediatorHook) => {
                injectedMediator = hook.mediator;
                injectedView = hook.mediatedItem;
            })
            .whenTargetNamed("callback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), ViewInjectedMediator);
        mapping.withHooks(MediatorHook);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        assert.instanceOf(injectedMediator, ViewInjectedMediator);
        assert.equal(injectedView, mediatedItem);
    });

    it("mediator_is_created_when_the_guard_allows", () => {
        assert.equal(mediatorsCreatedWithGuards(HappyGuard), 1);
    });

    it("mediator_is_created_when_all_guards_allow", () => {
        assert.equal(mediatorsCreatedWithGuards(HappyGuard, HappyGuard), 1);
    });

    it("mediator_is_not_created_when_the_guard_denies", () => {
        assert.equal(mediatorsCreatedWithGuards(GrumpyGuard), 0);
    });

    it("mediator_is_not_created_when_any_guards_denies", () => {
        assert.equal(mediatorsCreatedWithGuards(HappyGuard, GrumpyGuard), 0);
    });

    it("mediator_is_not_created_when_all_guards_deny", () => {
        assert.equal(mediatorsCreatedWithGuards(GrumpyGuard, GrumpyGuard), 0);
    });

    it("same_mediators_are_returned_for_mappings_and_mediatedItem", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping1: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), ViewInjectedMediator);
        const mapping2: MediatorMapping = new MediatorMapping(createTypeFilter([DisplayObject]), ViewInjectedAsRequestedMediator);
        const mediators1: any[] = factory.createMediators(mediatedItem, Sprite, [mapping1, mapping2]);
        const mediators2: any[] = factory.createMediators(mediatedItem, Sprite, [mapping1, mapping2]);
        assert.deepEqual(mediators1, mediators2);
    });

    it("expected_number_of_mediators_are_returned_for_mappings_and_mediatedItem", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping1: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), ViewInjectedMediator);
        const mapping2: MediatorMapping = new MediatorMapping(createTypeFilter([DisplayObject]), ViewInjectedAsRequestedMediator);
        const mediators: any = factory.createMediators(mediatedItem, Sprite, [mapping1, mapping2]);
        assert.equal(mediators.length, 2);
    });

    it("getMediator", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        assert.isNotNull(factory.getMediator(mediatedItem, mapping));
    });

    it("removeMediator", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        factory.removeMediators(mediatedItem);
        assert.isNull(factory.getMediator(mediatedItem, mapping));
    });

    it("creating_mediator_gives_mediator_to_mediator_manager", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        manager = new MediatorManager(factory);
        let managerMock = sinon.mock(manager);
        managerMock.expects("addMediator").once();
        factory = new MediatorFactory(injector, manager);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        managerMock.restore();
        managerMock.verify();
    });

    it("removeMediator_removes_mediator_from_manager", () => {
        const mediatedItem: Sprite = new Sprite();
        const mapping: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        manager = new MediatorManager(factory);
        let managerMock = sinon.mock(manager);
        managerMock.expects("removeMediator").once();
        factory = new MediatorFactory(injector, manager);
        factory.createMediators(mediatedItem, Sprite, [mapping]);
        factory.removeMediators(mediatedItem);
        factory.removeMediators(mediatedItem);
        managerMock.restore();
        managerMock.verify();
    });

    it("removeAllMediators_removes_all_mediators_from_manager", () => {
        const mediatedItem1: Sprite = new Sprite();
        const mediatedItem2: Sprite = new Sprite();
        const mapping1: IMediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        const mapping2: IMediatorMapping = new MediatorMapping(createTypeFilter([DisplayObject]), ViewInjectedAsRequestedMediator);
        manager = new MediatorManager(factory);
        let managerMock = sinon.mock(manager);
        managerMock.expects("removeMediator").exactly(4);
        factory = new MediatorFactory(injector, manager);
        factory.createMediators(mediatedItem1, Sprite, [mapping1, mapping2]);
        factory.createMediators(mediatedItem2, Sprite, [mapping1, mapping2]);
        factory.removeAllMediators();
        managerMock.restore();
        managerMock.verify();
    });
});
