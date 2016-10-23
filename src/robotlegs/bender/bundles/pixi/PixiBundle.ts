// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import {
    IBundle,
    IContext,
    LogLevel
} from "robotlegs";

import { ContextViewExtension } from "../../extensions/contextView/ContextViewExtension";
import { ContextViewListenerConfig } from "../../extensions/contextView/impl/ContextViewListenerConfig";
import { StageSyncExtension } from "../../extensions/contextView/StageSyncExtension";
import { MediatorMapExtension } from "../../extensions/mediatorMap/MediatorMapExtension";
import { StageCrawlerExtension } from "../../extensions/viewManager/StageCrawlerExtension";
import { StageObserverExtension } from "../../extensions/viewManager/StageObserverExtension";
import { ViewManagerExtension } from "../../extensions/viewManager/ViewManagerExtension";

/**
 * For that Classic Robotlegs flavour
 *
 * <p>This bundle installs a number of extensions commonly used
 * in typical Robotlegs applications and modules.</p>
 */
export class PixiBundle implements IBundle {

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public extend(context: IContext): void {
        context.install(
            ContextViewExtension,
            ViewManagerExtension,
            StageObserverExtension,
            MediatorMapExtension,
            StageCrawlerExtension,
            StageSyncExtension
        );

        context.configure(ContextViewListenerConfig);
    }
}
