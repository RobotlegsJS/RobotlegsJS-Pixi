// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

import { Event } from "@robotlegsjs/core";

import { IDisplayObject } from "../../../displayList/api/IDisplayObject";
import { IDisplayObjectObserver } from "../../../displayList/api/IDisplayObjectObserver";

import { ConfigureViewEvent } from "../../../extensions/viewManager/impl/ConfigureViewEvent";

import { Container } from "pixi.js";

/**
 *
 */
export class DisplayObjectObserver implements IDisplayObjectObserver {
    private _displayObject: Container;
    private _useCapture: boolean;

    private _addedToStageHandler: Function;
    private _removedFromStageHandler: Function;
    private _configureViewHandler: Function;

    /*============================================================================*/
    /* Constructor                                                                */
    /*============================================================================*/

    /**
     *
     * @param displayObject
     * @param useCapture
     */
    constructor(displayObject: IDisplayObject, useCapture: boolean) {
        if (displayObject !== null && displayObject !== undefined) {
            this._displayObject = <Container>displayObject;
            this._useCapture = useCapture;
        } else {
            throw new Error("DisplayObject can't be null or undefined");
        }
    }

    /*============================================================================*/
    /* Public Functions                                                           */
    /*============================================================================*/

    /**
     *
     * @param handler
     */
    public addAddedToStageHandler(handler: Function): void {
        if (handler !== null && handler !== undefined && this._displayObject.addEventListener !== undefined) {
            this._addedToStageHandler = handler;
            this._displayObject.addEventListener("addedToStage", this.onAddedToStage, this._useCapture);
        }
    }

    /**
     *
     * @param handler
     */
    public addRemovedFromStageHandler(handler: Function): void {
        if (handler !== null && handler !== undefined && this._displayObject.addEventListener !== undefined) {
            this._removedFromStageHandler = handler;
            this._displayObject.addEventListener("removedFromStage", this.onRemovedFromStage, this._useCapture);
        }
    }

    /**
     *
     * @param handler
     */
    public addConfigureViewHandler(handler: Function): void {
        if (handler !== null && handler !== undefined && this._displayObject.addEventListener !== undefined) {
            this._configureViewHandler = handler;
            this._displayObject.addEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView, this._useCapture);
        }
    }

    /**
     *
     */
    public destroy(): void {
        if (this._displayObject.removeEventListener !== undefined) {
            this._displayObject.removeEventListener("addedToStage", this.onAddedToStage, this._useCapture);
            this._displayObject.removeEventListener("removedFromStage", this.onRemovedFromStage, this._useCapture);
            this._displayObject.removeEventListener(ConfigureViewEvent.CONFIGURE_VIEW, this.onConfigureView, this._useCapture);
        }

        this._displayObject = null;

        this._addedToStageHandler = null;
        this._removedFromStageHandler = null;
        this._configureViewHandler = null;
    }

    /*============================================================================*/
    /* Private Functions                                                          */
    /*============================================================================*/

    private onAddedToStage = (event: Event): void => {
        this._addedToStageHandler(event.target);
    };

    private onRemovedFromStage = (event: Event): void => {
        this._removedFromStageHandler(event.target);
    };

    private onConfigureView = (event: ConfigureViewEvent): void => {
        // Stop that event!
        event.stopPropagation();

        this._configureViewHandler(event.currentTarget, event.target);
    };

    /*============================================================================*/
    /* Public Properties                                                          */
    /*============================================================================*/

    /**
     * The display object
     */
    public get displayObject(): IDisplayObject {
        return <IDisplayObject>this._displayObject;
    }
}
