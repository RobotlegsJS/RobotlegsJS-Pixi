// ------------------------------------------------------------------------------
//  Copyright (c) 2017 RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Container } from "pixi.js";

import { IContextView } from "../api/IContextView";

/**
 * The Context View represents the root Container for a Context
 */
export class ContextView implements IContextView {
    private _view: Container;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     * The Context View represents the root Container for a Context
     * @param view The root Container for this Context
     */
    constructor(view: Container) {
        this._view = view;
    }

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    /**
     * The root Container for this Context
     */
    public get view(): Container {
        return this._view;
    }
}
