// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import "../../../../entry";

import { assert } from "chai";

import { Container } from "pixi.js";

import { interfaces, IContext, Context, LogLevel } from "@robotlegsjs/core";

import { DisplayObjectObserver } from "../../../../../src/robotlegs/bender/bundles/pixi/observer/DisplayObjectObserver";

import { IDisplayObject } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObject";
import { IDisplayObjectObserver } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserver";
import { IDisplayObjectObserverFactory } from "../../../../../src/robotlegs/bender/displayList/api/IDisplayObjectObserverFactory";

import {
    ContextView,
    ContextViewExtension,
    ContextViewListenerConfig,
    MediatorMapExtension,
    StageCrawlerExtension,
    ViewManagerExtension
} from "../../../../../src";

import { applyPixiPatch } from "../../../../../src/robotlegs/bender/bundles/pixi/patch/pixi-patch";
import { IViewHandler } from "../../../../../src/robotlegs/bender/extensions/viewManager/api/IViewHandler";
import { ContainerRegistry } from "../../../../../src/robotlegs/bender/extensions/viewManager/impl/ContainerRegistry";

import { CallbackLogTarget } from "../contextView/support/CallbackLogTarget";
import { LogParams } from "../contextView/support/LogParams";

import { CallbackViewHandler } from "./support/CallbackViewHandler";

describe("StageCrawlerExtension", () => {
    let container: Container;
    let context: IContext;

    beforeEach(() => {
        container = new Container();
        applyPixiPatch(container);
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
        container = null;
    });

    it("installing_after_initialization_throws_error", () => {
        function installExtensionAfterInitialization(): void {
            context.initialize();
            context.install(StageCrawlerExtension);
        }
        assert.throws(installExtensionAfterInitialization, Error);
    });

    it("extension_logs_debug_message_when_initializing_and_view_manager_is_installed", () => {
        let viewManagerIsInstalledLogged: boolean = false;
        let scanningContainerLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof StageCrawlerExtension && log.level === LogLevel.DEBUG) {
                if (!viewManagerIsInstalledLogged) {
                    viewManagerIsInstalledLogged = log.message === "ViewManager is installed. Checking for managed containers...";
                }

                if (!scanningContainerLogged) {
                    scanningContainerLogged = log.message === "StageCrawler scanning container {0} ...";
                }
            }
        });
        context.logLevel = LogLevel.DEBUG;
        context.install(ContextViewExtension, ViewManagerExtension, MediatorMapExtension, StageCrawlerExtension);
        context.configure(new ContextView(container));
        context.configure(ContextViewListenerConfig);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(viewManagerIsInstalledLogged);
        assert.isTrue(scanningContainerLogged);
    });

    it("extension_logs_debug_message_when_initializing_and_view_manager_is_not_installed", () => {
        let viewManagerIsNotInstalledLogged: boolean = false;
        let scanningContainerLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof StageCrawlerExtension && log.level === LogLevel.DEBUG) {
                if (!viewManagerIsNotInstalledLogged) {
                    viewManagerIsNotInstalledLogged = log.message === "ViewManager is not installed. Checking the ContextView...";
                }

                if (!scanningContainerLogged) {
                    scanningContainerLogged = log.message === "StageCrawler scanning container {0} ...";
                }
            }
        });
        let handler: IViewHandler = new CallbackViewHandler();
        let registry: ContainerRegistry = new ContainerRegistry();

        registry.addContainer(container).addHandler(handler);

        context.logLevel = LogLevel.DEBUG;
        context.install(ContextViewExtension, StageCrawlerExtension);
        context.configure(new ContextView(container));
        context.injector.bind(ContainerRegistry).toConstantValue(registry);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(viewManagerIsNotInstalledLogged);
        assert.isTrue(scanningContainerLogged);
    });

    it("extension_logs_error_when_context_initialized_without_contextView", () => {
        let contextViewIsNotInstalledLogged: boolean = false;
        let logTarget: CallbackLogTarget = new CallbackLogTarget((log: LogParams) => {
            if (log.source instanceof StageCrawlerExtension && log.level === LogLevel.ERROR) {
                if (!contextViewIsNotInstalledLogged) {
                    contextViewIsNotInstalledLogged =
                        log.message === "A ContextView must be installed if you install the StageCrawlerExtension.";
                }
            }
        });
        let handler: IViewHandler = new CallbackViewHandler();
        let registry: ContainerRegistry = new ContainerRegistry();

        registry.addContainer(container).addHandler(handler);

        context.logLevel = LogLevel.DEBUG;
        context.install(ContextViewExtension, StageCrawlerExtension);
        context.injector.bind(ContainerRegistry).toConstantValue(registry);
        context.addLogTarget(logTarget);
        context.initialize();
        assert.isTrue(contextViewIsNotInstalledLogged);
    });
});
