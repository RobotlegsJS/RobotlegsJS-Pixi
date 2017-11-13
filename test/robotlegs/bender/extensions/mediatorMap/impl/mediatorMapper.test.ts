// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../../entry";

import sinon = require("sinon");

import { assert } from "chai";

import { Sprite, Texture } from "pixi.js";

import {
    IContext,
    IInjector,
    ILogger,
    ITypeFilter,
    Context,
    TypeMatcher
} from "@robotlegsjs/core";

import { MediatorFactory } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorFactory";
import { MediatorMapper } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorMapper";
import { MediatorViewHandler } from "../../../../../../src/robotlegs/bender/extensions/mediatorMap/impl/MediatorViewHandler";

import { NullMediator } from "../support/NullMediator";
import { NullMediator2 } from "../support/NullMediator2";

describe("MediatorMapper", () => {
    let context: IContext = null;
    let injector: IInjector = null;
    let logger: ILogger = null;
    let factory: MediatorFactory = null;
    let handler: MediatorViewHandler = null;
    let filter: ITypeFilter = null;
    let mapper: MediatorMapper = null;

    beforeEach(() => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);

        context = new Context();
        injector = context.injector;
        factory = new MediatorFactory(injector);
        handler = new MediatorViewHandler(factory);
        filter = matcher.createTypeFilter();
        mapper = new MediatorMapper(matcher.createTypeFilter(), handler);
        context.initialize();
    });

    afterEach(() => {
        if (context.initialized) {
            context.destroy();
        }

        context = null;
        injector = null;
        logger = null;
        factory = null;
        handler = null;
        filter = null;
        mapper = null;
    });

    it("toMediator_registers_mappingConfig_with_handler", () => {
        let handlerMock = sinon.mock(handler);
        handlerMock.expects("addMapping").once();

        mapper.toMediator(NullMediator);

        handlerMock.restore();
        handlerMock.verify();
    });

    it("fromMediator_unregisters_mappingConfig_from_handler", () => {
        let handlerMock = sinon.mock(handler);
        handlerMock.expects("addMapping").once();
        handlerMock.expects("removeMapping").once();

        mapper.toMediator(NullMediator);
        mapper.fromMediator(NullMediator);

        handlerMock.restore();
        handlerMock.verify();
    });

    it("fromMediator_removes_only_specified_mappingConfig_from_handler", () => {
        let handlerMock = sinon.mock(handler);
        handlerMock.expects("addMapping").twice();
        handlerMock.expects("removeMapping").once();

        mapper.toMediator(NullMediator);
        mapper.toMediator(NullMediator2);
        mapper.fromMediator(NullMediator);

        handlerMock.restore();
        handlerMock.verify();
    });

    it("fromAll_removes_all_mappingConfigs_from_handler", () => {
        let handlerMock = sinon.mock(handler);
        handlerMock.expects("addMapping").twice();
        handlerMock.expects("removeMapping").twice();

        mapper.toMediator(NullMediator);
        mapper.toMediator(NullMediator2);
        mapper.fromAll();

        handlerMock.restore();
        handlerMock.verify();
    });

    it("toMediator_unregisters_old_mappingConfig_and_registers_new_one_when_overwritten", () => {
        let handlerMock = sinon.mock(handler);
        handlerMock.expects("addMapping").twice();
        handlerMock.expects("removeMapping").once();

        mapper.toMediator(NullMediator);
        mapper.toMediator(NullMediator);

        handlerMock.restore();
        handlerMock.verify();
    });

    it("toMediator_logs_debug_when_creating_mapping", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);
        logger = context.getLogger(context);
        mapper = new MediatorMapper(
            matcher.createTypeFilter(),
            handler,
            logger
        );

        let loggerMock = sinon.mock(logger);
        loggerMock.expects("debug").once();

        mapper.toMediator(NullMediator);

        loggerMock.restore();
        loggerMock.verify();
    });

    it("toMediator_warns_when_overwritten", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);
        logger = context.getLogger(context);
        mapper = new MediatorMapper(
            matcher.createTypeFilter(),
            handler,
            logger
        );

        let loggerMock = sinon.mock(logger);
        loggerMock.expects("warn").once();

        mapper.toMediator(NullMediator);
        mapper.toMediator(NullMediator);

        loggerMock.restore();
        loggerMock.verify();
    });

    it("fromMediator_logs_debug_when_removing_mapping", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);
        logger = context.getLogger(context);
        mapper = new MediatorMapper(
            matcher.createTypeFilter(),
            handler,
            logger
        );

        let loggerMock = sinon.mock(logger);
        loggerMock.expects("debug").twice();

        mapper.toMediator(NullMediator);
        mapper.fromMediator(NullMediator);

        loggerMock.restore();
        loggerMock.verify();
    });

    it("fromMediator_does_nothing_when_mediator_is_not_mapped", () => {
        const matcher: TypeMatcher = new TypeMatcher().allOf(Sprite);
        logger = context.getLogger(context);
        mapper = new MediatorMapper(
            matcher.createTypeFilter(),
            handler,
            logger
        );

        let loggerMock = sinon.mock(logger);
        loggerMock.expects("debug").never();
        loggerMock.expects("info").never();
        loggerMock.expects("warn").never();
        loggerMock.expects("error").never();
        loggerMock.expects("fatal").never();

        mapper.fromMediator(NullMediator);

        loggerMock.restore();
        loggerMock.verify();
    });
});
