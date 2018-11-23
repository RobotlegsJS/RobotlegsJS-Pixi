// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";

import { IDisplayObjectContainer } from "../../displayList/api/IDisplayObjectContainer";

import { IContextView } from "../contextView/api/IContextView";

import { IViewManager } from "./api/IViewManager";
import { ContainerBinding } from "./impl/ContainerBinding";
import { ContainerRegistry } from "./impl/ContainerRegistry";
import { StageCrawler } from "./impl/StageCrawler";

/**
 * View Handlers (like the MediatorMap) handle views as they land on stage.
 *
 * This extension checks for views that might already be on the stage
 * after context initialization and ensures that those views are handled.
 */
export class StageCrawlerExtension implements IExtension {
    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _logger: ILogger;

    private _injector: IInjector;

    private _containerRegistry: ContainerRegistry;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        this._injector = context.injector;
        this._logger = context.getLogger(this);
        context.afterInitializing(this.afterInitializing.bind(this));
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private afterInitializing(): void {
        this._containerRegistry = this._injector.get<ContainerRegistry>(ContainerRegistry);
        this._injector.isBound(IViewManager) ? this.scanViewManagedContainers() : this.scanContextView();
    }

    private scanViewManagedContainers(): void {
        this._logger.debug("ViewManager is installed. Checking for managed containers...");
        let viewManager: IViewManager = this._injector.get<IViewManager>(IViewManager);
        viewManager.containers.forEach((container: IDisplayObjectContainer) => {
            this.scanContainer(container);
        });
    }

    private scanContextView(): void {
        if (this._injector.isBound(IContextView)) {
            this._logger.debug("ViewManager is not installed. Checking the ContextView...");
            let contextView: IContextView = this._injector.get<IContextView>(IContextView);
            this.scanContainer(contextView.view);
        } else {
            this._logger.error("A ContextView must be installed if you install the StageCrawlerExtension.");
        }
    }

    private scanContainer(container: IDisplayObjectContainer): void {
        let binding: ContainerBinding = this._containerRegistry.getBinding(container);
        this._logger.debug("StageCrawler scanning container {0} ...", [container]);
        new StageCrawler(binding).scan(container);
        this._logger.debug("StageCrawler finished scanning {0}", [container]);
    }
}
