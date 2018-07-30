// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { IContext, Context, LogLevel } from "@robotlegsjs/core";

import { ManualStageObserverExtension, ViewManagerExtension } from "../../../../../src";

import { CallbackLogTarget } from "../contextView/support/CallbackLogTarget";
import { LogParams } from "../contextView/support/LogParams";

describe("ManualStageObserverExtension", () => {
    let context: IContext;

    beforeEach(() => {
        context = new Context();
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
