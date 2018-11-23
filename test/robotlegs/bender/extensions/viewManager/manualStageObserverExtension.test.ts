// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { interfaces, IContext, Context, LogLevel } from "@robotlegsjs/core";

import { DisplayObjectObserver } from "../../../../../src/robotlegs/bender/bundles/pixi/observer/DisplayObjectObserver";

import { IDisplayObject } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObject";
import { IDisplayObjectObserver } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserver";
import { IDisplayObjectObserverFactory } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserverFactory";

import { ManualStageObserverExtension, ViewManagerExtension } from "../../../../../src";

import { CallbackLogTarget } from "../contextView/support/CallbackLogTarget";
import { LogParams } from "../contextView/support/LogParams";

describe("ManualStageObserverExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
        context.injector
            .bind<interfaces.Factory<IDisplayObjectObserver>>(IDisplayObjectObserverFactory)
            .toFactory<IDisplayObjectObserver>(() => {
                return (view: IDisplayObject, useCapture: boolean): IDisplayObjectObserver => {
                    return new DisplayObjectObserver(view, useCapture);
                };
            });
    });

    afterEach(() => {
        context.destroy();
        context = null;
    });

    it("installing_after_initialization_throws_error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(ManualStageObserverExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("extension_logs_debug_messages_when_initializing_and_destroying", () => {
        let whenInitializingLogged: boolean = false;
        let whenDestroyingLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof ManualStageObserverExtension && log.level === LogLevel.DEBUG) {
                if (!whenInitializingLogged) {
                    whenInitializingLogged = log.message === "Creating genuine ManualStageObserver Singleton";
                }
                if (!whenDestroyingLogged) {
                    whenDestroyingLogged = log.message === "Destroying genuine ManualStageObserver Singleton";
                }
            }
        });
        context.logLevel = LogLevel.DEBUG;
        context.install(ViewManagerExtension, ManualStageObserverExtension);
        context.addLogTarget(logTarget);
        context.initialize();
        context.destroy();
        assert.isTrue(whenInitializingLogged);
        assert.isTrue(whenDestroyingLogged);
    });
});
