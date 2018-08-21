// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

/// <reference types="@robotlegsjs/core" />

import { IEvent } from "@robotlegsjs/core";

/**
 * Augment PIXI module to recognize IEventDispatcher patch.
 */
declare module "pixi.js" {
    interface IEventDispatcher {
        addEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean, priority?: number): void;
        removeEventListener(type: string, listener: Function, thisObject?: any, useCapture?: boolean): void;
        hasEventListener(type: string): boolean;
        dispatchEvent(event: IEvent): boolean;
        willTrigger(type: string): boolean;
    }

    export interface DisplayObject extends IEventDispatcher {}
    export interface SystemRenderer extends IEventDispatcher {}

    export interface BaseTexture extends IEventDispatcher {}
    export interface Texture extends IEventDispatcher {}

    export interface Container extends DisplayObject {
        contains(child: DisplayObject): boolean;
    }

    export namespace loaders {
        export interface Loader extends IEventDispatcher {}
        export interface Resource extends IEventDispatcher {}
    }
}
