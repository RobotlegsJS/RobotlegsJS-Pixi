// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import { assert } from "chai";

import { Container, Sprite } from "pixi.js";

import { interfaces, IContext, IInjector, ITypeFilter, Context, TypeMatcher } from "@robotlegsjs/core";

import { DisplayObjectObserver } from "../../../../../../src/robotlegs/bender/bundles/pixi/observer/DisplayObjectObserver";

import { IDisplayObject } from "../../../../../../src/robotlegs/bender/displayList/api/IDisplayObject";
import { IDisplayObjectObserver } from "../../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserver";
import { IDisplayObjectObserverFactory } from "../../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserverFactory";

import { MediatorFactory } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorFactory";
import { MediatorMapping } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapping";
import { MediatorViewHandler } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorViewHandler";

import { CallbackMediator } from "../support/CallbackMediator";
import { NotAView } from "../support/NotAView";

describe("MediatorViewHandler", () => {
    let context: IContext = null;
    let injector: IInjector = null;
    let factory: MediatorFactory = null;
    let handler: MediatorViewHandler = null;

    beforeEach(() => {
        context = new Context();
        injector = context.injector;
        injector.bind<interfaces.Factory<IDisplayObjectObserver>>(IDisplayObjectObserverFactory).toFactory<IDisplayObjectObserver>(() => {
            return (view: IDisplayObject, useCapture: boolean): IDisplayObjectObserver => {
                return new DisplayObjectObserver(view, useCapture);
            };
        });
        factory = new MediatorFactory(injector);
        handler = new MediatorViewHandler(factory);
        context.initialize();
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        injector = null;
        factory = null;
        handler = null;
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

    it("view_is_handled", () => {
        let createdMediator: any = null;
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediator = mediator;
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping);
        handler.handleView(new Container(), Container);
        assert.isNotNull(createdMediator);
        assert.instanceOf(createdMediator, CallbackMediator);
    });

    it("view_is_not_handled", () => {
        let createdMediator: any = null;
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediator = mediator;
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        handler.addMapping(mapping);
        handler.handleView(new Container(), Container);
        assert.isNull(createdMediator);
    });

    it("addMapping_called_twice_have_no_effect", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping);
        handler.addMapping(mapping);
        handler.handleView(new Container(), Container);
        assert.equal(createdMediators.length, 1);
    });

    it("removeMapping_removes_mapping_and_mediators_are_not_created", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping);
        handler.removeMapping(mapping);
        handler.handleView(new Container(), Container);
        assert.equal(createdMediators.length, 0);
    });

    it("removeMapping_called_twice_have_no_effect", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping);
        handler.removeMapping(mapping);
        handler.removeMapping(mapping);
        handler.handleView(new Container(), Container);
        assert.equal(createdMediators.length, 0);
    });

    it("handleItem_handles_not_view_elements", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([NotAView]), CallbackMediator);
        handler.addMapping(mapping);
        handler.handleItem(new NotAView(), NotAView);
        assert.equal(createdMediators.length, 1);
    });

    it("handleItem_do_nothing_when_item_have_any_mapping", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping: MediatorMapping = new MediatorMapping(createTypeFilter([NotAView]), CallbackMediator);
        handler.addMapping(mapping);
        handler.handleItem(new Sprite(), Sprite);
        assert.equal(createdMediators.length, 0);
    });

    it("handleItem_called_twice_for_same_type_returns_earlier", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping1: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping1);
        const mapping2: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        handler.addMapping(mapping2);

        handler.handleItem(new NotAView(), NotAView);
        handler.handleItem(new NotAView(), NotAView);

        assert.equal(createdMediators.length, 0);
    });

    it("handleView_called_twice_for_same_type_returns_all_mediators", () => {
        let createdMediators: any[] = [];
        injector
            .bind("Function")
            .toFunction((mediator: any) => {
                createdMediators.push(mediator);
            })
            .whenTargetNamed("executeCallback");
        const mapping1: MediatorMapping = new MediatorMapping(createTypeFilter([Container]), CallbackMediator);
        handler.addMapping(mapping1);
        const mapping2: MediatorMapping = new MediatorMapping(createTypeFilter([Sprite]), CallbackMediator);
        handler.addMapping(mapping2);

        handler.handleView(new Sprite(), Sprite);
        handler.handleView(new Sprite(), Sprite);

        assert.equal(createdMediators.length, 4);
    });
});
