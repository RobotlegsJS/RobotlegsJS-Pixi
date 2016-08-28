// ------------------------------------------------------------------------------
//  Copyright (c) 2016 Goodgame Studios. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { injectable, inject, IConfig, IViewManager } from "robotlegs";
import { ContextView } from "./ContextView";

/**
 * This configuration file adds the ContextView to the viewManager.
 *
 * It requires that the ViewManagerExtension, ContextViewExtension
 * and a ContextView have been installed.
 */
@injectable()
export class ContextViewListenerConfig implements IConfig {

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    @inject(ContextView)
    private _contextView: ContextView;

    @inject(IViewManager)
    private _viewManager: IViewManager;

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     * @inheritDoc
     */
    public configure(): void {
        // Adds the Context View to the View Manager at startup
        this._viewManager.addContainer(this._contextView.view);
    }
}
