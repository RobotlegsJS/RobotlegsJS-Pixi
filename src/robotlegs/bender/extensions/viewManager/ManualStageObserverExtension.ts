// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { IContext, IExtension, IInjector, ILogger } from "@robotlegsjs/core";

import { ContainerRegistry } from "./impl/ContainerRegistry";
import { ManualStageObserver } from "./impl/ManualStageObserver";

let installCount: number = 0;

/**
 * This extension install a manual Stage Observer
 */
export class ManualStageObserverExtension implements IExtension {
    /*============================================================================*/
    /* Private Static Properties                                                  */
    /*============================================================================*/

    // Really? Yes, there can be only one.
    private static _manualStageObserver: ManualStageObserver;

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
        if (!ManualStageObserverExtension._manualStageObserver) {
            let containerRegistry: ContainerRegistry = this._injector.get<ContainerRegistry>(ContainerRegistry);
            this._logger.debug("Creating genuine ManualStageObserver Singleton");
            ManualStageObserverExtension._manualStageObserver = new ManualStageObserver(containerRegistry);
        }
    }

    private whenDestroying(): void {
        installCount--;
        if (installCount === 0) {
            this._logger.debug("Destroying genuine ManualStageObserver Singleton");
            ManualStageObserverExtension._manualStageObserver.destroy();
            ManualStageObserverExtension._manualStageObserver = null;
        }
    }
}
