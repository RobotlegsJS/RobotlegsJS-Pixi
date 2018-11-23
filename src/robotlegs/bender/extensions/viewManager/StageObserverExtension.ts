// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";

import { IDisplayObjectObserverFactory } from "../../displayList/api/IDisplayObjectObserverFactory";

import { ContainerRegistry } from "./impl/ContainerRegistry";
import { StageObserver } from "./impl/StageObserver";

let installCount: number = 0;

/**
 * This extension install an automatic Stage Observer
 */
export class StageObserverExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _stageObserver: StageObserver = null;

    /*============================================================================*/
    /* Private Properties                                                         */
    /*============================================================================*/

    private _injector: IInjector;

    private _logger: ILogger;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.whenInitializing(this.whenInitializing.bind(this));
        context.whenDestroying(this.whenDestroying.bind(this));
        installCount++;
        this._injector = context.injector;
        this._logger = context.getLogger(this);
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private whenInitializing(): void {
        // Hark, an actual Singleton!
        if (!StageObserverExtension._stageObserver) {
            let containerRegistry: ContainerRegistry = this._injector.get<ContainerRegistry>(ContainerRegistry);
            let factory: IDisplayObjectObserverFactory = this._injector.get(IDisplayObjectObserverFactory);
            this._logger.debug("Creating genuine StageObserver Singleton");
            StageObserverExtension._stageObserver = new StageObserver(containerRegistry, factory);
        }
    }

    private whenDestroying(): void {
        installCount--;
        if (installCount === 0) {
            this._logger.debug("Destroying genuine StageObserver Singleton");
            StageObserverExtension._stageObserver.destroy();
            StageObserverExtension._stageObserver = null;
        }
    }
}
